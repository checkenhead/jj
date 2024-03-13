import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';

import '../../style/members/login.css';
import ImgLogo from '../../images/logo.png';
import testImg from '../../images/Koala.jpg'
import woman from '../../images/woman.jpg'

/** 로그인 */
function Login() {
  const loginUser = useSelector(state => state.user);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const dispatch = useDispatch();

  const onLogin = () => {
    if (!email) { return alert('아이디를 입력하세요') }
    if (!pwd) { return alert('패스워드를 입력하세요') }
    axios.post('/api/members/loginlocal', { email, pwd })
      .then((result) => {
        console.log(result.data)
        // 로그인 실패 했을 경우
        if (result.data.message !== 'OK') {
          setPwd("");
          return alert(result.data.message);
          // 로그인에 성공 했을 경우
        } else {
          alert("로그인 되었습니다.");
          dispatch(loginAction(result.data.loginUser));
          navigate('/main');
          console.log(result.data);
        }
      })
      .catch((error) => {
        console.error(error)
        navigate('/');
      })
  }

  useEffect(() => {
    if (loginUser.email !== '') {
      navigate('/main');
    }
  }, []);


  // 스크롤 시 사진 움직이는 이벤트

  useEffect(() => {
    var item = document.getElementsByClassName('item')
    console.log(item.length);
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('mousemove', mousemove);
      item[i].addEventListener('mouseout', mouseout);
    }

    return () => {
      for (let i = 0; i < item.length; i++) {
        item[i].removeEventListener('mousemove', mousemove);
        item[i].removeEventListener('mouseout', mouseout);
      }
    }

  }, [])

  useEffect(() => {
    let timeoutId; // setTimeout 함수의 반환 값 저장

    const handleScroll = () => {
      clearTimeout(timeoutId); // 이전의 timeoutId를 제거하여 중복 호출 방지

      const scrollY = window.scrollY;
      const rotationAngle = scrollY; // 스크롤 위치에 따라 회전 각도 조절
      console.log(rotationAngle, rotationAngle * 0.005)
      const items = document.querySelectorAll('.item');

      items.forEach(item => {
        item.style.transform = `perspective(350px) rotateX(${rotationAngle * 0.03}deg) rotateY(${rotationAngle * 0.03}deg)`;
      });

      timeoutId = setTimeout(() => {
        items.forEach(item => {
          item.style.transform = 'perspective(350px) rotateY(0deg) rotateX(0deg)';
        })
      }, 350);

    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId); // 컴포넌트가 언마운트될 때 timeoutId 제거
    };
  }, []);


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

  return (
    <div className='login'>
      <div className='loginform'>
        <div className='wrap_login'>
          <div className='grid_title'><label>Our Story</label></div>
          <div className='login_grid'>
            <div className='item'>
              <img src={testImg} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />
            </div>
            <div className='item'>
              <img src={testImg} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />
            </div>
            <div className='item'>
              <img src={testImg} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />

            </div>
            <div className='item'>
              <img src={testImg} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />
            </div>
            <div className='item'>
              <img src={testImg} className='testImg' />
            </div>
            <div className='item'>
              <img src={woman} className='testImg' />
            </div>
            <div className='item'>
              <img src={testImg} className='testImg' />
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
                  <input type="password" value={pwd} onChange={
                    (e) => { setPwd(e.currentTarget.value) }
                  } required />
                  <label>Password</label>
                </div>
                <div className='btns'>
                  <button className='button'>SNS Login</button>
                  <button className='button'
                    onClick={() => { onLogin() }}>Login</button>
                  <button className='button'
                    onClick={() => { navigate('/join') }}>Join</button>
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
  )
}

export default Login
