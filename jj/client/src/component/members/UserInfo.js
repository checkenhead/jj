import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';

import ImgSetting from '../../images/setting.png';
import ImgUser from '../../images/user.png';
import ImgMessage from '../../images/message.png';
import FollowButton from '../utility/FollowButton';


function UserInfo({ nickname }) {
    const [currUser, setCurrUser] = useState({});
    const [feedCount, setFeedCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const loginUser = useSelector(state => state.user);
    const loginUserFollow = useSelector(state => state.follow);
    const [followState, setFollowState] = useState(loginUserFollow.followings.some((following) => following === nickname));
    const navigate = useNavigate();

    const getUserInfo = () => {
        console.log("nickname : ", nickname);
        jwtAxios.post('/api/members/getUserInfo', null, { params: { nickname } })
            .then(result => {
                setCurrUser(result.data.user);
                setFeedCount(result.data.count);
                setFollowers(result.data.followers || []);
                setFollowings(result.data.followings || []);
                setFollowState(loginUserFollow.followings.some((following) => following === currUser.nickname));
                console.log(result.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUserInfo();
        setFollowState(loginUserFollow.followings.some((following) => following === currUser.nickname));
    }, [loginUser, loginUserFollow, nickname]);

    return (
        <div className="wrap_member">
            <div className="nickname">{currUser.nickname}</div>
            <div className="info">
                <div className="profileimg" onClick={() => {
                    if (currUser.nickname === loginUser.nickname) {
                        navigate('/updateprofile');
                    } else {
                        // toggleModal();
                    }
                }}>
                    <img src={currUser.profileimg
                        ? currUser.provider === "Kakao"
                            ? currUser.profileimg
                            : `http://localhost:8070/images/${currUser.profileimg}`
                        : ImgUser} className="img" />
                    {
                        currUser.nickname === loginUser.nickname
                            ? <img src={ImgSetting} className="icon" />
                            : null
                    }
                </div>
                <div className="status">
                    <div>{feedCount} 게시물</div>
                    <div>{followings.length} 팔로잉</div>
                    <div>{followers.length} 팔로워</div>
                </div>
            </div>
            {
                currUser.nickname !== loginUser.nickname
                    ? (
                        <div className='action_wrap'>
                            <div className='DirectMessage' onClick={() => {
                                navigate('/message', { state: { writer: currUser.nickname } });
                            }}>
                                <img src={ImgMessage} />Message</div>
                            <div className='btn_follow'>
                                <FollowButton followState={followState} follow={{ following: currUser.nickname, follower: loginUser.nickname }} />
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
}

export default UserInfo
