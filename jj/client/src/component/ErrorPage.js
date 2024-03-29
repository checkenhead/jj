import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeCookie } from '../util/cookieUtil';
import { logoutAction } from '../store/userSlice';

import ImgLogo from '../images/logo.png';
import ImgHome from '../images/home.png';
import ImgUser from '../images/user.png';
import ImgBookmark from '../images/bookmark.png';
import ImgSearch from '../images/search.png';
import ImgMessage from '../images/message.png';
import ImgLogout from '../images/logout.png';

function ErrorPage() {
    const loginUser = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const onLogout = () => {
    //     jwtAxios.get('/api/members/logout')
    //         .then(() => {
    //             dispatch(logoutAction());
    //             navigate('/')
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         })
    // }

    const onLogout = () => {
        removeCookie('user');
        dispatch(logoutAction());
        navigate('/')
    }

    return (
        <div className='wrap_main'>
            <header>
                <div className="wrap_header">
                    <div className="logo">
                        <img src={ImgLogo} className="link" onClick={() => {
                            navigate('/');
                        }} />
                    </div>
                    <nav className="side_menu">
                        <div className="row">
                            <Link to="/" className="link">
                                <img src={ImgHome} className="icon" /><span className="name">Home</span>
                            </Link>
                        </div>
                        <div className="row">
                            <Link to={`/member/${loginUser.nickname}`} className="link">
                                <img src={loginUser.profileimg ? `http://localhost:8070/images/${loginUser.profileimg}` : ImgUser} className="icon" /><span className="name">My page</span>
                            </Link>
                        </div>
                        <div className="row" >
                            <Link to="/search" className="link">
                                <img src={ImgSearch} className="icon" /><span className="name">Search</span>
                            </Link>
                        </div>
                        <div className="row" >
                            <Link to="/bookmarks" className="link">
                                <img src={ImgBookmark} className="icon" /><span className="name">Bookmarks</span>
                            </Link>
                        </div>
                        <div className="row">
                            <Link to="/message" className="link">
                                <img src={ImgMessage} className="icon" /><span className="name">Message</span>
                            </Link>
                        </div>
                        <div className="row btn_logout">
                            <button className="link" onClick={() => { onLogout() }}>
                                <img src={ImgLogout} className="icon" /><span className="name">Logout</span>
                            </button>
                        </div>
                    </nav>
                </div >
            </header>
            <div className='wrap_error'>
                <div className='error_title'>
                    <h1>404 Error</h1><br />
                    <h2>Page not found</h2>
                </div>
                <div className='error_content'>
                    <p>
                        - 정확한 주소 입력했는지 확인하세요<br />
                        - 주소에 특수문자를 입력하지 마세요
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
