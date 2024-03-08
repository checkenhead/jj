import React from 'react'
import {Link} from 'react-router-dom'

import ImgLogo from '../../images/logo.png';
import ImgHome from '../../images/home.png';

function Header() {
  return (
    <div className="wrap_header">
      <div className="logo">
        <img src={ImgLogo}/>
      </div>
      <nav>
        <Link to="">Home</Link>
        <Link to="">My page</Link>
        <Link to="">Search</Link>
        <Link to="">Message</Link>
        <button><img src=""/>Post</button>
        <button>Logout</button>
      </nav>
    </div>
  )
}

export default Header
