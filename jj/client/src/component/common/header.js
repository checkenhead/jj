import React from 'react'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <div>
      Logo
      <nav>
        <Link to="">메뉴1</Link>
        <Link to="">메뉴2</Link>
        <Link to="">메뉴3</Link>
      </nav>
    </div>
  )
}

export default Header
