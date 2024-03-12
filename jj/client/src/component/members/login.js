import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../style/members/login.css';
import ImgLogo from '../../images/logo.png';

/** 로그인 */
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const onLogin = () => {
    if( !email ){ return alert('아이디를 입력하세요') }
    if( !pwd ){ return alert('패스워드를 입력하세요') }
    axios.post ('/api/members/loginlocal', { email, pwd } )
    .then( ( result ) => {
      console.log(result.data)
      // 로그인 실패 했을 경우
      if( result.data.message !== 'OK' ){
        setPwd("");
        return alert(result.data.message);
      // 로그인에 성공 했을 경우
      }else{
        alert("로그인 되었습니다.")
        navigate('/main');
        console.log(result.data);
      }
    })
    .catch(( error ) => {
      console.error(error)
      navigate('/');
    })
  

  }

  return (
    <div className='loginform'>
      <div className='wrap_login'>

      </div>
      <div className='wrap_login'>
        <div className='login_field'>
          <div className='login_logo'><img src={ImgLogo}/><h2>JackJack</h2></div>
          <div className='login_input'>
            <div className='field'>
              <input type='text' placeholder='E-mail' value={email} onChange={
                (e) => {
                  setEmail ( e.currentTarget.value )
                }
              }></input>
            </div>
              <input type='password' placeholder='Password' value={pwd} onChange={
                (e) => {
                  setPwd ( e.currentTarget.value )
                }
              }></input>
              <div className='btn1'>
                <button onClick={ () => { onLogin() } }>로그인</button>
                <button onClick={ () => { navigate('/join') } }>회원가입</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
