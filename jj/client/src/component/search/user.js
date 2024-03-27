import React, { useEffect, useState } from 'react'
import FollowButton from '../utility/FollowButton'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';

function User({ nickname }) {
    const [currUser, setCurrUser] = useState({});
    const [feedCount, setFeedCount] = useState(0);
    const [follow, setFollow] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const loginUserFollow = useSelector(state => state.follow);
    const loginUser = useSelector(state => state.user);
    const [followState, setFollowState] = useState(loginUserFollow.followings.some((following) => following === nickname));
    const navigate = useNavigate();

    const getUserInfo = () => {
        jwtAxios.post('/api/members/getUserInfo', null, { params: { nickname } })
            .then(result => {
                setCurrUser(result.data.user);
                setFeedCount(result.data.count);
                setFollowers(result.data.followers || []);
                setFollowings(result.data.followings || []);
                console.log(result.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUserInfo();
        setFollowState(loginUserFollow.followings.some((following) => following === nickname));
    }, [loginUserFollow])

    return (
        <div className="user" id="user">
            <div className="row">
                <div className="profileimg" onClick={() => {
                    navigate(`/member/${currUser.nickname}`);
                }}>
                    <img src={`http://localhost:8070/images/${currUser.profileimg}`} />
                </div>
                <div className="nickname" onClick={() => {
                    navigate(`/member/${currUser.nickname}`);
                }}>
                    {currUser.nickname}
                </div>
                <div className="btn_follow">
                    {
                        currUser.nickname !== loginUser.nickname
                            ? <FollowButton followState={followState} follow={{ following: nickname, follower: loginUser.nickname }} />
                            : null
                    }
                </div>
            </div>
            <div className="row">
                <div className="intro">{currUser.intro}</div>
            </div>
            <div className="row">
                <div className="followings">{followings.length} Followings</div>
                <div className="followers">{followers.length} Followers</div>
            </div>
        </div>
    )
}

export default User
