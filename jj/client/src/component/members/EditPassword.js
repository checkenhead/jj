import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from '../common/header';
import Sub from '../common/sub';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../../store/userSlice';




function EditPassword() {
    const navigate = useNavigate();
    const loginUser = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [newpwd, setNewpwd] = useState('');
    const [newpwdChk, setNewpwdChk] = useState('');

    useEffect(() => {
        if (!loginUser) {
            alert('로그인이 필요합니다');
            navigate('/');
        }
    }, [])

    const onSubmit = () => {
        if (newpwd === '') { return alert('변경하실 비밀번호를 입력해주세요'); }
        if (newpwdChk === '') { return alert('비밀번호 확인을 입력해주세요'); }
        if (newpwd !== newpwdChk) { return alert('비밀번호 확인이 다릅니다'); }

        axios.post('api/members/passwordUpdate', null, { params: { newpwd, nickname: loginUser.nickname } })
            .then((result) => {
                if (result.data.message === 'ok') {
                    alert('비밀번호 변경이 완료되었습니다 다시 로그인 해주세요');
                    dispatch(logoutAction());
                    navigate('/');
                }

            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className="wrap_main">
            <header><Header /></header>
            <main>
                <div className='updateform'>
                    <div className='wrap_update'>
                        <div className='editprofile'>
                            <div className="logo">EDIT PROFILE</div>
                            <div className='field'>
                                <input type="password" value={newpwd} onChange={
                                    (e) => { setNewpwd(e.currentTarget.value) }
                                } placeholder='New Password' />
                            </div>
                            <div className='field'>
                                <input type="password" value={newpwdChk} onChange={
                                    (e) => { setNewpwdChk(e.currentTarget.value) }
                                } placeholder='New Password Check' />
                            </div>
                            <div className='btns'>
                                <div className='updatebutton'>
                                    <button onClick={
                                        () => {
                                            onSubmit();
                                        }
                                    }>SAVE</button>
                                    <button onClick={
                                        () => { navigate(`/member/${loginUser.nickname}`) }
                                    }>BACK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <aside id="aside"><Sub /></aside>
        </div>
    )
}

export default EditPassword

