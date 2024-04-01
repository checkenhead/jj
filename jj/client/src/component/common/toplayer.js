import ImgHam from '../../images/menu.png';
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { removeCookie } from '../../util/cookieUtil';

import { logoutAction } from '../../store/userSlice';

import UserSummary from './usersummary';
import Aside from './aside';
import Sub from './sub';

import Post from '../feed/post';
import Modal from "react-modal";
import Notify from './notify';

import ImgHome from '../../images/home.png';
import ImgUser from '../../images/user.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgSearch from '../../images/search.png';
import ImgMessage from '../../images/message.png';
import ImgPost from '../../images/post.png';
import ImgLogout from '../../images/logout.png';
import ImgReturn from '../../images/return.png';
import ImgCancel from '../../images/cancel.png';

function TopLayer({ setNewFeed }) {
    const loginUser = useSelector(state => state.user);

    const [menuState, setMenuState] = useState(false);
    const [isOpen, setIsOpen] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const onLogout = () => {
    //     axios.get('/api/members/logout')
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

    // useEffect(() => {
    //     getRecommendPeopleBynickname();
    //     getAllMembersNickname();

    // }, [loginUserFollow]);

    const toggleModal = () => {
        // document.body.style.overflow = isOpen ? "auto" : "hidden";
        setIsOpen(!isOpen);
    }

    const handleResize = () => {
        setMenuState(false);
        setIsOpen(false);
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
            <div className="hamburger_menu">
                {
                    !menuState ? (<button onClick={() => {
                        setMenuState(true);
                        document.getElementById('aside').style.display = '';
                        document.body.style.overflow = 'hidden';
                    }}>
                        <img src={ImgHam} className="icon" /><span className="name"></span>
                    </button>) : null
                }
            </div>
            {
                menuState ? (
                    <div className='wrap_mobile'>

                        <nav className="side_menu">

                            <button className="link" onClick={() => {
                                setMenuState(false);
                                document.body.style.overflow = 'auto';
                            }}>
                                <img src={ImgReturn} className="icon" />
                            </button>

                            <Link to="/" className="link">
                                <img src={ImgHome} className="icon" />
                                {/* <span className="name">Home</span> */}
                            </Link>

                            <Link to={`/member/${loginUser.nickname}`} className="link">
                                <img src={loginUser.profileimg
                                    ? loginUser.provider === "Kakao"
                                        ? loginUser.profileimg
                                        : `http://localhost:8070/images/${loginUser.profileimg}`
                                    : ImgUser} className="icon" />
                                {/* <span className="name">My page</span> */}
                            </Link>

                            <Link to="/search" className="link">
                                <img src={ImgSearch} className="icon" />
                                {/* <span className="name">Search</span> */}
                            </Link>

                            <Link to="/bookmarks" className="link">
                                <img src={ImgBookmark} className="icon" />
                                {/* <span className="name">Bookmarks</span> */}
                            </Link>

                            <Link to="/message" className="link">
                                <img src={ImgMessage} className="icon" />
                                {/* <span className="name">Message</span> */}
                            </Link>

                            <button className="link" onClick={() => {
                                toggleModal();
                            }}>
                                <img src={ImgPost} className="icon" />
                                {/* <span className="name">Post</span> */}
                            </button>

                            <button className="link logout" onClick={() => { onLogout() }}>
                                <img src={ImgLogout} className="icon" />
                                {/* <span className="name">Logout</span> */}
                            </button>
                        </nav>

                        <Modal className="modal" overlayClassName="orverlay_modal" isOpen={isOpen} ariaHideApp={false} >
                            <img src={ImgCancel} className="icon close link" onClick={() => {
                                toggleModal();
                            }} />
                            <Post setIsOpen={setIsOpen} setNewFeed={setNewFeed} />
                        </Modal>

                        <div className='sub_content'>
                            <Sub />
                        </div>
                    </div>
                ) : null
            }

            <Notify />

        </div>
    )
}

export default TopLayer
