import React, { useEffect, useState } from 'react'
import ImgUser from '../../images/user.png';
import { useSelector } from 'react-redux';
import FollowButton from '../utility/FollowButton';
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import { useNavigate } from 'react-router-dom';

function UserSummary({ member }) {
    const [currUser, setCurrUser] = useState(member);
    const navigate = useNavigate();
    const loginUserFollow = useSelector(state => state.follow);
    const loginUser = useSelector(state => state.user);
    const [followState, setFollowState] = useState(loginUserFollow.followings.some((following) => following === member));

    const getMemberInfo = () => {
        jwtAxios.post('/api/members/getmemberbynickname', null, { params: { nickname: member } })
            .then(result => {
                setCurrUser(result.data.user);
                // console.log(result.data.user);
            })
            .catch(err => {
                console.error(err);
            });
    }


    useEffect(() => {
        getMemberInfo();
        setFollowState(loginUserFollow.followings.some((following) => following === currUser.nickname));
    }, [member])

    return (
        <div className="user_summary">
            <div className="profileimg" onClick={() => {
                navigate(`/member/${currUser.nickname}`);
            }}>
                <img src={currUser.profileimg
                    ? currUser.provider === "Kakao"
                        ? currUser.profileimg
                        : `http://localhost:8070/images/${currUser.profileimg}`
                    : ImgUser} />
            </div>
            <div className="nickname" onClick={() => {
                navigate(`/member/${currUser.nickname}`);
            }}>
                {currUser.nickname}
            </div>
            <div className="btn_follow">
                {
                    currUser.nickname !== loginUser.nickname
                        ? <FollowButton followState={followState} follow={{ following: currUser.nickname, follower: loginUser.nickname }} />
                        : null
                }
            </div>

        </div>
    )

}

export default UserSummary
