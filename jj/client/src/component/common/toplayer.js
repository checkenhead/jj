import ImgHam from '../../images/menu.png';
import React, { useState, useEffect } from 'react'

import Sub from './sub';
import SideMenu from './sidemenu';
import Notify from './notify';

function TopLayer({ setNewFeed, stateBtn = true }) {
    const [menuState, setMenuState] = useState(false);

    const handleResize = () => {
        setMenuState(false);
        document.body.style.overflow = 'auto';
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return (() => {
            document.body.style.overflow = 'auto';
            window.removeEventListener("resize", handleResize);
        })
    }, []);

    return (
        <div className="wrap_top">
            <div className="hamburger_menu" id="hamburger_menu">
                {
                    !menuState && stateBtn ? (<button onClick={() => {
                        setMenuState(true);
                        // document.getElementById('aside').style.display = '';
                        document.body.style.overflow = 'hidden';
                    }}>
                        <img src={ImgHam} className="icon" /><span className="name"></span>
                    </button>) : null
                }
            </div>
            {
                menuState ? (
                    <div className='wrap_mobile'>
                        <SideMenu setNewFeed={setNewFeed} returnAction={() => {
                            setMenuState(false);
                            document.body.style.overflow = 'auto';
                        }} />
                        <div className='wrap_mobile'>
                            <Sub wrapStyle={{border:'0'}}/>
                        </div>
                    </div>
                ) : null
            }

            <Notify />

        </div>
    )
}

export default TopLayer
