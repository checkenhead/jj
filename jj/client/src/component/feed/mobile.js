import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Footer from '../common/footer';
import UserSummary from '../common/usersummary';

import Sub from '../common/sub';


import { logoutAction } from '../../store/userSlice';
import Post from '../feed/post';

import ImgLogo from '../../images/logo.png';
import ImgHome from '../../images/home.png';
import ImgUser from '../../images/user.png';
import ImgBookmark from '../../images/bookmark.png';
import ImgSearch from '../../images/search.png';
import ImgMessage from '../../images/message.png';
import ImgPost from '../../images/post.png';
import ImgLogout from '../../images/logout.png';
import ImgCancel from '../../images/cancel.png';

function Mobile() {

    const loginUserFollow = useSelector(state => state.follow);
    const loginUser = useSelector(state => state.user);
    const [recommendMember, setRecommendMember] = useState([]);
    const [members, setMembers] = useState([]);

    const [isOpen, setIsOpen] = useState(false);
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

    const getAllMembersNickname = () => {
        axios.post('/api/members/getallmembersnickname')
            .then(result => {
                setMembers(result.data.members);
            })
            .catch(err => {
                console.error(err);
            })
    }

    const getRecommendPeopleBynickname = () => {
        axios.post('/api/members/getrecommendpeoplebynickname', null, { params: { nickname: loginUser.nickname } })
            .then(result => {
                setRecommendMember(result.data.recommendmembers);
                console.log(result.data.recommendmembers, '추천 유저');
            })
            .catch(err => {
                console.error(err);
            })
    }
    useEffect(() => {
        getRecommendPeopleBynickname();
        getAllMembersNickname();

    }, [loginUserFollow]);

    return (
        <>
            <div className='mobile'>
                <div className="wrap_mobile">
                    {/* <div className="logo">
                    <img src={ImgLogo} className="link" onClick={() => {
                        navigate('/');
                    }} />
                </div> */}
                    <nav className="side_menu">
                        <div className="row">
                            <Link to="/" className="link">
                                <img src={ImgHome} className="icon" />
                                {/* <span className="name">Home</span> */}
                            </Link>
                        </div>
                        <div className="row">
                            <Link to={`/member/${loginUser.nickname}`} className="link">
                                <img src={loginUser.profileimg
                                    ? loginUser.provider === "Kakao"
                                        ? loginUser.profileimg
                                        : `http://localhost:8070/images/${loginUser.profileimg}`
                                    : ImgUser} className="icon" />
                                {/* <span className="name">My page</span> */}
                            </Link>
                        </div>
                        <div className="row" >
                            <Link to="/search" className="link">
                                <img src={ImgSearch} className="icon" />
                                {/* <span className="name">Search</span> */}
                            </Link>
                        </div>
                        <div className="row" >
                            <Link to="/bookmarks" className="link">
                                <img src={ImgBookmark} className="icon" />
                                {/* <span className="name">Bookmarks</span> */}
                            </Link>
                        </div>
                        <div className="row">
                            <Link to="/message" className="link">
                                <img src={ImgMessage} className="icon" />
                                {/* <span className="name">Message</span> */}
                            </Link>
                        </div>
                        <div className="row">
                            <button className="link" onClick={() => {

                            }}>
                                <img src={ImgPost} className="icon" />
                                {/* <span className="name">Post</span> */}
                            </button>
                        </div>
                        <div className="row">
                            <button className="link" onClick={() => { onLogout() }}>
                                <img src={ImgLogout} className="icon" />
                                {/* <span className="name">Logout</span> */}
                            </button>
                        </div>
                    </nav>

                </div>
                <div className="mobile_sub" id="wrap_sub">
                    <div className="search">
                        <input type="text" list="recent_list" placeholder="Search" />
                        {/* <button>Search</button> */}
                        <datalist id="recent_list">
                            <option value="가나다라" />
                            <option value="마바사" />
                            <option value="아자차카" />
                            <option value="타파하" />
                            <option value="abcd" />
                        </datalist>
                    </div>
                    <div className="wrap_relevant_people">
                        <div className="title">Relevant people</div>
                        <div className="relevant_people">
                        </div>
                    </div>
                    <div className="wrap_recommend_people">
                        <div className="title">You might like</div>
                        <div className="recommend_people">
                        </div>
                    </div>
                    <div className="wrap_recommend_feed">
                        <div className="recommend_feed">
                            <div className="title">Trends for you</div>
                            <div className="sub_content feeds">Sub Content #1</div>
                        </div>
                    </div>
                    <div className="wrap_recommend_follow">
                        <div className="title">Who to follow
                        </div>
                        <div className="recommend_follow">

                            {
                                recommendMember.map((member, memberIndex) => {
                                    return (
                                        loginUserFollow.followings.some((following) => following === member)
                                            ? null
                                            : <UserSummary member={member} key={memberIndex} />
                                    );
                                })
                            }

                        </div>
                    </div>
                    {/* <footer><Footer /></footer> */}
                </div>
            </div>

        </>
    )
}

export default Mobile
