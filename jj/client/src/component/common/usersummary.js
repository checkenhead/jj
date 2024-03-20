import React, { useState } from 'react'
import User from '../search/user'
import { useSelector } from 'react-redux';
import FollowButton from '../utility/FollowButton';

function UserSummary() {
    const [displyStyle, setDisplayStyle] = useState({ display: 'none' });
    const loginUserFollow = useSelector(state => state.follow);
    return (
        <>
            <div className="user_summary">
                <div className="profileimg" >
                    <img src="http://localhost:8070/images/Koala1710399524604.jpg" />
                </div>
                <div className="nickname">닉네임</div>
                <div className="btn_follow">
                    <FollowButton followState={loginUserFollow.followings.some((following) => following === '김스캇')} />
                </div>

            </div>
        </>
    )
}

export default UserSummary
