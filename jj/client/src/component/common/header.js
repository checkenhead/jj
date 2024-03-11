import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import ImgLogo from '../../images/logo.png';
import ImgHome from '../../images/home.png';
import ImgUser from '../../images/user.png';
import ImgSearch from '../../images/search.png';
import ImgMessage from '../../images/message.png';
import ImgPost from '../../images/post.png';
import ImgLogout from '../../images/logout.png';

function Header() {
  const navigate = useNavigate();
  return (
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
          <Link to="" className="link">
            <img src={ImgUser} className="icon" /><span className="name">My page</span>
          </Link>
        </div>
        <div className="row" >
          <Link to="" className="link">
            <img src={ImgSearch} className="icon" /><span className="name">Search</span>
          </Link>
        </div>
        <div className="row">
          <Link to="" className="link">
            <img src={ImgMessage} className="icon" /><span className="name">Message</span>
          </Link>
        </div>
        <div className="row">
          <button className="link">
            <img src={ImgPost} className="icon" /><span className="name">Post</span>
          </button>
        </div>
        <div className="row btn_logout">
          <button className="link">
            <img src={ImgLogout} className="icon" /><span className="name">Logout</span>
          </button>
        </div>
      </nav>
      <nav className="hamburger_menu">
        <div className="row">
          <button className="link">
            <img src="" className="icon" /><span className="name">햄버거메뉴</span>
          </button>
        </div>
      </nav>
    </div >
  )
}

export default Header
