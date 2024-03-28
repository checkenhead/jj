import ImgHam from '../../images/menu.png';
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'

import { logoutAction } from '../../store/userSlice';

import UserSummary from './usersummary';
import Aside from './aside';
import Sub from './sub';

import ImgHome from '../../images/home.png';
import ImgUser from '../../images/user.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgSearch from '../../images/search.png';
import ImgMessage from '../../images/message.png';
import ImgPost from '../../images/post.png';
import ImgLogout from '../../images/logout.png';
import ImgReturn from '../../images/return.png';

function TopLayer() {

    

    const [menuState, setMenuState] = useState(false);

    const loginUser = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        axios.get('/api/members/logout')
            .then(() => {
                dispatch(logoutAction());
                navigate('/')
            })
            .catch(err => {
                console.error(err);
            })
    }

    // useEffect(() => {
    //     getRecommendPeopleBynickname();
    //     getAllMembersNickname();

    // }, [loginUserFollow]);

    const handleResize = () => {
        setMenuState(false);
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return (() => {
            window.removeEventListener("resize", handleResize);
        })
    }, []);

    return (
        <div className="wrap_top">
            <div className="hamburger_menu">
                {
                    !menuState ? (<button onClick={() => {
                        setMenuState(true);
                        document.getElementById('aside').style.display='';
                    }}>
                        <img src={ImgHam} className="icon" /><span className="name"></span>
                    </button>) : null
                }


            </div>
            {
                menuState ? (
                    <div className='wrap_mobile'>

                        <nav className="side_menu">

                            <button className="link" onClick={() => { setMenuState(false) }}>
                                <img src={ImgReturn} className="icon" />
                            </button>

                            <Link to="/" className="link">
                                <img src={ImgHome} className="icon" />
                                {/* <span className="name">Home</span> */}
                            </Link>

                            <Link to={`/member/${loginUser.nickname}`} className="link">
                                <img src={loginUser.profileimg ? `http://localhost:8070/images/${loginUser.profileimg}` : ImgUser} className="icon" />
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

                            }}>
                                <img src={ImgPost} className="icon" />
                                {/* <span className="name">Post</span> */}
                            </button>

                            <button className="link logout" onClick={() => { onLogout() }}>
                                <img src={ImgLogout} className="icon" />
                                {/* <span className="name">Logout</span> */}
                            </button>

                        </nav>
                        {/* <div className='sub_content'>
                            <div className="mobile_search">
                                <input type="text" list="recent_list" placeholder="Search here" />
                                <datalist id="recent_list">
                                    <option value="가나다라" />
                                    <option value="마바사" />
                                    <option value="아자차카" />
                                    <option value="타파하" />
                                    <option value="abcd" />
                                </datalist>
                            </div>
                            <div className="mobile_relevant_people">
                                <div className="mobile_title">Relevant people</div>
                                <div className="row_relevant_people">people
                                </div>
                                

                            </div>
                            <div className="mobile_recommend_people">
                                <div className="mobile_title">You might like</div>
                                <div className="row_recommend_people">people
                                </div>
                            </div>
                            <div className="mobile_recommend_feed">
                                <div className="row_recommend_feed">

                                    <div className="mobile_title">Trends for you</div>
                                    <UserSummary member={"홍승희"} />
                                    <UserSummary member={"김스캇"} />
                                </div>
                            </div>
                            <div className="mobile_recommend_follow">
                                <div className="mobile_title">Who to follow</div>
                                <div className="row_recommend_follow">follow
                                </div>
                            </div>
                        </div> */}
                        <div className='sub_content'>
                            <Sub />
                        
                        
                        </div>
                    </div>



                ) : null
            }



        </div>
    )
}

export default TopLayer
