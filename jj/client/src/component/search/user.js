import React from 'react'

function User({user}) {
    return (
        <div className="user" id="user">
            <div className="row">
                <div className="profileimg">
                    <img src={`http://localhost:8070/images/${user.profileimg}`} />
                </div>
                <div className="nickname">{user.nickname}</div>
                <div className="btn_follow">
                    <button>Follow</button>
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
