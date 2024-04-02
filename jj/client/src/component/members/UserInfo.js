import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

import jwtAxios from '../../util/jwtUtil';

import ImgSetting from '../../images/setting.png';
import ImgMessage from '../../images/message.png';
import FollowButton from '../utility/FollowButton';
import FollowList from './FollowList';
import Modal from "react-modal";
import { getUserimgSrc } from '../../util/ImgSrcUtil';


function UserInfo({ nickname }) {
    const [currUser, setCurrUser] = useState({});
    const [feedCount, setFeedCount] = useState(0);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [followList, setFollowList] = useState(null);
    const loginUser = useSelector(state => state.user);
    const loginUserFollow = useSelector(state => state.follow);
    const [followState, setFollowState] = useState(loginUserFollow.followings.some((following) => following === nickname));
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);


    const getUserInfo = () => {
        // console.log("nickname : ", nickname);
        jwtAxios.post('/api/members/getUserInfo', null, { params: { nickname } })
            .then(result => {
                setCurrUser(result.data.user);
                setFeedCount(result.data.count);
                setFollowers(result.data.followers || []);
                setFollowings(result.data.followings || []);
                setFollowState(loginUserFollow.followings.some((following) => following === currUser.nickname));
                // console.log(result.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUserInfo();
        setFollowState(loginUserFollow.followings.some((following) => following === currUser.nickname));
    }, [loginUser, loginUserFollow, nickname]);

    useEffect(() => {
        if (!isOpen) {
            setFollowList(null)
            document.body.style.overflow = "auto";
        }
    }, [isOpen])

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
                    <img src={getUserimgSrc(currUser)} className="img" />
                    {
                        currUser.nickname === loginUser.nickname
                            ? <img src={ImgSetting} className="icon" />
                            : null
                    }
                </div>
                <div className="status">
                    <div>{feedCount} 게시물</div>
                    <div className="followings" onClick={() => {
                        if (isOpen) {
                            setFollowList(null);
                            setIsOpen(false);
                        } else {
                            setFollowList(followings);
                            setIsOpen(true);
                        }
                        document.body.style.overflow = isOpen ? "auto" : "hidden";
                    }}>

                        {followings.length} 팔로잉
                    </div>
                    <div className="followers" onClick={() => {
                        if (isOpen) {
                            setFollowList(null);
                            setIsOpen(false);
                        } else {
                            setFollowList(followers);
                            setIsOpen(true);
                        }
                        document.body.style.overflow = isOpen ? "auto" : "hidden";
                    }}>

                        {followers.length} 팔로워
                    </div>
                </div>
                <Modal className="modal" overlayClassName="orverlay_modal" isOpen={isOpen} ariaHideApp={false} >
                    <FollowList followList={followList} setIsOpen={setIsOpen} />
                </Modal>
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
