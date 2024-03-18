import React, {useState} from 'react'
import User from '../search/user'

function UserSummary() {
    const [displyStyle, setDisplayStyle] = useState({display:'none'});
    return (
        <>
        <div className="user_summary">
            <div className="profileimg" >
                <img src="http://localhost:8070/images/Koala1710399524604.jpg" />
            </div>
            <div className="nickname">닉네임</div>
            <div className="btn_follow">
                <button>Follow</button>
            </div>
            
        </div>
        </>
    )
}

export default UserSummary
