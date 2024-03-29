import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Header from '../common/header';
import Main from '../common/main';
import Aside from '../common/aside';
import Sub from '../common/sub';
import { useSelector, useDispatch } from 'react-redux';
import { setMessageAction } from '../../store/notifySlice';

import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';


function CurPwdCheck() {
    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const [curpwd, setCurPwd] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loginUser) {
            dispatch(setMessageAction({message: '로그인이 필요합니다.'}));
            navigate('/');
        }

    }, [])


    const onSubmit = () => {
        if (curpwd === '') {
            dispatch(setMessageAction({message: '비밀번호를 입력해주세요.'}));
            return;
        } else {
            jwtAxios.post('/api/members/passwordCheck', null, { params: { curpwd, nickname: loginUser.nickname } })
                .then((result) => {
                    console.log(result.data);
                    if (result.data.message !== 'OK') {
                        setCurPwd("");
                        dispatch(setMessageAction({message: '비밀번호가 틀립니다.'}));
                        return;
                    } else {
                        navigate('/EditPassword')
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }
    return (
        <div className="wrap_main">
            <header><Header /></header>
            <Main component={
                <div className='updateform'>
                <div className='wrap_update'>
                    <div className='editprofile'>
                        <div className="logo">EDIT PROFILE</div>
                        <div className='field'>
                            <input type="password" value={curpwd} onChange={
                                (e) => { setCurPwd(e.currentTarget.value) }
                            } placeholder='Current Password' />
                        </div>
                        <div className='forgotPwd'><label onClick={() => {
                            navigate('/EmailCheck')
                        }}>Forgot Password?</label></div>
                        <div className='btns'>
                            <div className='updatebutton'>
                                <button onClick={
                                    () => {
                                        onSubmit();
                                    }
                                }>Submit</button>
                                <button onClick={
                                    () => { navigate(`/member/${loginUser.nickname}`) }
                                }>BACK</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }/>
            <Aside component={<Sub />}/>
        </div>
    )
}

export default CurPwdCheck
