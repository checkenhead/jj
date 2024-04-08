import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtAxios from '../../util/jwtUtil';
import { setCookie } from '../../util/cookieUtil';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { setMessageAction } from '../../store/notifySlice';
import { setFollowAction } from '../../store/followSlice';

import ImgKakao from '../../images/loginImg/kakaosimbol.png';
import ImgLogo from '../../images/logo.png';
import woman from '../../images/loginImg/woman.jpg'
import books from '../../images/loginImg/books.jpg';
import camera1 from '../../images/loginImg/camera-1.jpg';
import camera from '../../images/loginImg/camera.jpg';
import car from '../../images/loginImg/car.jpg';
import concert from '../../images/loginImg/concert.jpg';
import girl from '../../images/loginImg/girl.jpg';
import journey from '../../images/loginImg/journey-.jpg';
import people from '../../images/loginImg/people.jpg';
import santorini from '../../images/loginImg/santorini.jpg';
import selfie from '../../images/loginImg/selfie.jpg';
import smartphone from '../../images/loginImg/smartphone.jpg';

import Notify from '../common/notify';




/** 로그인 */
function Login() {
  const loginUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const loginBtn = useRef();
  const dispatch = useDispatch();

  const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
  const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI; //Redirect URI
  // oauth 요청 URL
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  const onLogin = () => {
    if (!email) {
      dispatch(setMessageAction({message:'아이디를 입력하세요'}));
      return;
    }
    if (!pwd) {
      dispatch(setMessageAction({message:'패스워드를 입력하세요'}));
      return;
    }
    axios.post('/api/members/loginlocal', null, { params: { username: email, password: pwd } })
      .then((result) => {
        console.log(result);
        // 로그인 실패 했을 경우
        if (result.data.error === 'ERROR_LOGIN') {
          setPwd("");
          dispatch(setMessageAction({message:'아이디 또는 비밀번호가 틀립니다.'}));
          return;
          // 로그인에 성공 했을 경우
        } else {
          // console.log(result);
          dispatch(setMessageAction({message:'로그인 되었습니다.'}));
          setCookie("user", JSON.stringify(result.data), 1);
          dispatch(loginAction(result.data));
          getFollow(result.data.nickname);
          navigate('/main');
          // console.log('login result.data:', result.data);
        }
      })
      .catch((error) => {
        console.error(error)
        navigate('/');
      })
  }

  const getFollow = (nickname) => {
    jwtAxios.post('/api/members/getfollow', null, { params: { nickname } })
      .then(result => {
        // console.log('getFollow:', result);
        dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }))
      })
      .catch(err => {
        console.error(err);
      });
  }

  function mousemove(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var rotateY = -1 / 5 * x + 20;
    var rotateX = 4 / 30 * y - 20;
    e.target.style.transform = `perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function mouseout(e) {
    e.target.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
  }

  const handleScroll = () => {

    const scrollY = window.scrollY;
    const rotationAngle = scrollY; // 스크롤 위치에 따라 회전 각도 조절
    // console.log(rotationAngle, rotationAngle * 0.005)
    const items = document.querySelectorAll('.item');

    items.forEach(item => {
      item.style.transform = `perspective(350px) rotateX(${rotationAngle * 0.03}deg) rotateY(${rotationAngle * 0.03}deg)`;
    });

    let timeoutId = setTimeout(() => {
      items.forEach(item => {
        item.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
      })
      clearTimeout(timeoutId);
    }, 350);
  };

  useEffect(() => {
    // console.log('redux loginUser', loginUser);
    if (loginUser.email !== '') {
      navigate('/main');
    } else {
      var item = document.getElementsByClassName('item')
      // console.log(item.length);
      for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('mousemove', mousemove);
        item[i].addEventListener('mouseout', mouseout);
      }

      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (loginUser.email === '') {
        window.removeEventListener('scroll', handleScroll);

        for (let i = 0; i < item.length; i++) {
          item[i].removeEventListener('mousemove', mousemove);
          item[i].removeEventListener('mouseout', mouseout);
        }
      }
    }

  }, []);

  return (
    <>
    <div className='login'>
      <div className='loginform'>
        <div className='wrap_login'>
          <div className='grid_title'><label>Our Story</label></div>
          <div className='login_grid'>
            <div className='item'>
              <img src={books} className='testImg' />
            </div>
            <div className='item'>
              <img src={smartphone} className='testImg' />
            </div>
            <div className='item'>
              <img src={camera1} className='testImg' />
            </div>
            <div className='item'>
              <img src={camera} className='testImg' />
            </div>
            <div className='item'>
              <img src={car} className='testImg' />
            </div>
            <div className='item'>
              <img src={concert} className='testImg' />
            </div>
            <div className='item'>
              <img src={girl} className='testImg' />
            </div>
            <div className='item'>
              <img src={journey} className='testImg' />
            </div>
            <div className='item'>
              <img src={people} className='testImg' />
            </div>
            <div className='item'>
              <img src={santorini} className='testImg' />
            </div>
            <div className='item'>
              <img src={selfie} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />
            </div>
          </div>
        </div>
        <div className='wrap_login'>
          <div className='login_field'>
            <div className='login_logo'><img src={ImgLogo} /><label>Jackjack</label></div>
            <div className='input_container'>
              <div className='login_input'>
                <div className='login_title'>
                  <label>Login</label>
                </div>
                <div className='field'>
                  <input type="text" value={email} onChange={
                    (e) => { setEmail(e.currentTarget.value) }
                  } required />
                  <label>E-mail</label>
                </div>
                <div className='field'>
                  <input type="password" value={pwd} onKeyDown={(e) => {
                    if(e.nativeEvent.key === "Enter"){
                      loginBtn.current.click();
                    }
                  }} onChange={
                    (e) => { setPwd(e.currentTarget.value) }
                  } required />
                  <label>Password</label>
                </div>
                {/* <div className='forgotPwd'><label onClick={() => {
                  navigate('/EmailCheck')
                }}>Forgot Password</label></div> */}
                <div className='btns'>
                  <button className='button' ref={loginBtn}
                    onClick={() => { onLogin() }}>Login</button>
                  <button className='button'
                    onClick={() => { navigate('/join') }}>Join</button>
                  <button className='kakao button' onClick={() => { handleLogin() }}>
                    <img src={ImgKakao}></img><label>Login with Kakao</label>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='loginfooter'>
          <label>© 2024 Jackjack from Project</label>
        </div>
      </div>
    </div>
    <Notify />
    </>
  )

}

export default Login
