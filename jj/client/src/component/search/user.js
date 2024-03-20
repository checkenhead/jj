import React from 'react'
import FollowButton from '../utility/FollowButton'
import { useSelector } from 'react-redux'
function User({user}) {
    const loginUserFollow = useSelector(state=>state.follow);
    const loginUser = useSelector(state=>state.user);

    return (
        <div className="user" id="user">
            <div className="row">
                <div className="profileimg">
                    <img src={`http://localhost:8070/images/${user.profileimg}`} />
                </div>
                <div className="nickname">{user.nickname}</div>
                <div className="btn_follow">
                    <FollowButton followState={loginUserFollow.followings.some((following) => following === user.nickname)} follow={{following: user.nickname, follower: loginUser.nickname}}/>
                </div>
            </div>
            <div className="row">
                <div className="intro">{user.intro}</div>
            </div>
            <div className="row">
                <div className="followings">{user.followings.length} Followings</div>
                <div className="followers">{user.followers.length} Followers</div>
            </div>
        </div>
    )
}

export default User
