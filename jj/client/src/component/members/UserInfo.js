import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import ImgSetting from '../../images/setting.png';

function UserInfo({nickname}) {
    const [currUser,setCurrUser] = useState({});
    const [summarys, setSummarys] = useState([]);
    const navigate = useNavigate();

    const getUserInfo = () => {
        axios.post('/api/members/getUserInfo', null, { params: { nickname } })
        .then(result =>{

            setCurrUser(result.data.user);
            console.log(result.data);
        })
        .catch(err => {
            console.error(err);
        })
    }

    useEffect(() => {
        getUserInfo();

    }, []);

    return (
        <div className="wrap_member">
            <div className="nickname">{currUser.nickname}</div>
            <div className="info">
                <div className="profileimg" onClick={() => {
                    navigate('/updateprofile');
                }}>
                    <img src={`http://localhost:8070/images/${currUser.profileimg}`} className="img" />
                    <img src={ImgSetting} className="icon" />
                </div>
                <div className="status">
                    <div>{summarys.length} 게시물</div>
                    <div>0 팔로잉</div>
                    <div>0 팔로워</div>
                </div>
            </div>
        </div>
    )
}

export default UserInfo
