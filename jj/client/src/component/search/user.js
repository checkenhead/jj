import React, { useState } from 'react'
import FollowButton from '../utility/FollowButton'
import { useSelector } from 'react-redux'
function User({user}) {
    const loginUserFollow = useSelector(state=>state.follow);
    const [userinfo, setUserinfo] = useState(user);
    const loginUser = useSelector(state=>state.user);
    const [reload, setReload] = useState(false);

    return (
        <div className="user" id="user">
            <div className="row">
                <div className="profileimg">
                    <img src={`http://localhost:8070/images/${userinfo.profileimg}`} />
                </div>
                <div className="nickname">{userinfo.nickname}</div>
                <div className="btn_follow">
                    <FollowButton userinfo={userinfo} setUserinfo={setUserinfo} setReload={setReload} followState={loginUserFollow.followings.some((following) => following === user.nickname)} follow={{following: user.nickname, follower: loginUser.nickname}}/>
                </div>
            </div>
            <div className="row">
                <div className="intro">{userinfo.intro}</div>
            </div>
            <div className="row">
                <div className="followings">{userinfo.followings.length} Followings</div>
                <div className="followers">{userinfo.followers.length} Followers</div>
            </div>
        </div>
    )
}

export default User
