import React, {useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
function UpdateProfile() {
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwdChk, setPwdChk ] = useState('');
    const [nickname, setNickname] = useState('');
    const [intro, setIntro] = useState('');
    const navigate = useNavigate();
    const loginUser = useSelector( state=>state.user );
    const dispatch = useDispatch();
   
    useEffect(()=>{
        if(!loginUser){
            alert('로그인이 필요합니다');
            navigate('/');
        }
    },[])

    const onSubmit = ( ) => {
        if(email===''){ return alert('이메일을 입력하세요');}
        if(pwd===''){ return alert('비밀번호를 입력하세요');}
        if(pwd!==pwdChk){ return alert('비밀번호 확인이 일치하지 않습니다');}
        if(nickname===''){ return alert('닉네임을 입력하세요');}

        axios.post('api/members/updateProfile', {email,pwd,nickname,intro})
        .then((result)=>{
            if(result.data.message==='nickname'){
                return alert('닉네임이 중복됩니다.')
            }
            if(result.data.message==='OK'){
                alert('회원정보수정이 완료되었습니다.')
                navigate('/');
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }


    
    return (
        <div className='loginform'>
            <div className="logo" style={{fontSize:"2.0rem"}}>Member Update</div>
            <div className='field'>
                <label>E-mail</label>
                <input type="text" value={email}/>
            </div>
            <div className='field'>
                <label>Password</label>
                <input type="password" value={pwd} onChange={
                    (e)=>{ setPwd( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Retype pw</label>
                <input type="password" value={pwdChk} onChange={
                    (e)=>{ setPwd( e.currentTarget.value) }
                }/>
            </div>
            <div className='field'>
                <label>Nickname</label>
                <input type="text" value={nickname} onChange={
                    (e)=>{ setNickname( e.currentTarget.value) }
                }/>
            </div>

            <div className='field'>
                <label>Intro</label>
                <input type="text" value={intro} onChange={
                    (e)=>{ setIntro( e.currentTarget.value) }
                }/>
            </div>

            <div className='btns'>
                <button onClick={
                    ()=>{   onSubmit();   }
                }>UPDATE</button>
                <button onClick={
                    ()=>{ navigate('/myPage')}
                }>BACK</button>
            </div>
        </div>
        
    )
}

export default UpdateProfile
