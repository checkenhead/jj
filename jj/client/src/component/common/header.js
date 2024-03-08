import React from 'react'
import { Link } from 'react-router-dom'

import ImgLogo from '../../images/logo.png';
import ImgHome from '../../images/home.png';
import ImgUser from '../../images/user.png';
import ImgSearch from '../../images/search.png';
import ImgMessage from '../../images/message.png';
import ImgPost from '../../images/post.png';
import ImgLogout from '../../images/logout.png';

function Header() {
  return (
    <div className="wrap_header">
      <div className="logo">
        <img src={ImgLogo} />
      </div>
      <nav>
        <div className="row">
          <Link to="">
            <img src={ImgHome} className="icon" /><span className="name">Home</span>
          </Link>
        </div>
        <div className="row">
          <Link to="">
            <img src={ImgUser} className="icon" /><span className="name">My page</span>
          </Link>
        </div>
        <div className="row">
          <Link to="">
            <img src={ImgSearch} className="icon" /><span className="name">Search</span>
          </Link>
        </div>
        <div className="row">
          <Link to="">
            <img src={ImgMessage} className="icon" /><span className="name">Message</span>
          </Link>
        </div>
        <div className="row">
          <button>
            <img src={ImgPost} className="icon" /><span className="name">Post</span>
          </button>
        </div>
        <div className="row btn_logout">
          <button>
            <img src={ImgLogout} className="icon" /><span className="name">Logout</span>
          </button>
        </div>
      </nav>
    </div >
  )
}

export default Header
