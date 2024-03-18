import React from 'react'

function User() {
    return (
        <div className="user" id="user">
            <div className="row">
                <div className="profileimg">
                    <img src="http://localhost:8070/images/Koala1710399524604.jpg" />
                </div>
                <div className="nickname">닉네임</div>
                <div className="btn_follow">
                    <button>Follow</button>
                </div>
            </div>
            <div className="row">
                <div className="intro">안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. 안녕하세요. 김스캇입니다. </div>
            </div>
            <div className="row">
                <div className="followings">0 Followings</div>
                <div className="followers">0 Followers</div>
            </div>
        </div>
    )
}

export default User
