import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../style/members/login.css';
import ImgLogo from '../../images/logo.png';
import testImg from '../../images/Koala.jpg'
import woman from '../../images/woman.jpg'

/** 로그인 */
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

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
          alert("로그인 되었습니다.")
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
    var item = document.getElementsByClassName('item')
    console.log(item.length);
    for (let i = 0; i < item.length; i++) {
      item[i].addEventListener('mousemove', onmouse([i]))
      item[i].addEventListener('mouseout', outmouse([i]))
    }
    function onmouse([i]) {
      var x = item[i].offsetX
      var y = item[i].offsetY
      var rotateY = -1 / 5 * x + 20
      var rotateX = 4 / 30 * y - 20


      item[i].style = `transform : perspective(350px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    function outmouse([i]) {
      item[i].style = 'transform : perspective(350px) rotateY(0deg) rotateX(0deg)'

    }
    return () => {
      for (let i = 0; i < item.length; i++) {
        item[i].removeEventListener('mousemove', onmouse[i])
        item[i].removeEventListener('mouseout', outmouse[i])
      }
    }
  }, [])

  return (
    <div className='login'>
      <div className='loginheader'>

      </div>
      <div className='loginform'>
        <div className='wrap_login'>
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
            <div className='login_logo'><img src={ImgLogo} /><h2>JackJack</h2></div>
            <div className='input_container'>
              <div className='login_input'>
                <div className='field'>
                  <input type='text' value={email} onChange={
                    (e) => {
                      setEmail(e.currentTarget.value)
                    }
                  } required></input>
                  <label>E-mail</label>
                </div>
                <div className='login_input'>
                  <div className='field'>
                    <input type='password' value={pwd} onChange={
                      (e) => {
                        setPwd(e.currentTarget.value)
                      }
                    } required></input>
                    <label>Password</label>
                  </div>
                  <div className='field'>
                    <div className='btns'>
                      <button className='button-28' onClick={() => { onLogin() }}>Login</button>
                      <button className='button-28' onClick={() => { navigate('/join') }}>Join</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
