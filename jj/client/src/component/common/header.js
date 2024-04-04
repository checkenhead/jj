import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SideMenu from './sidemenu';

import ImgLogo from '../../images/logo.png';






function Header({ setNewFeed }) {
    const navigate = useNavigate();

    return (
        <div className="wrap_header">
            <div className="logo" >
                <img src={ImgLogo} className="link" onClick={() => {
                    navigate('/');
                }} />
            </div>
            <SideMenu setNewFeed={setNewFeed} />
        </div >
    )
}

export default Header
