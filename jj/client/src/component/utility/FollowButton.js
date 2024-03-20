import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';

function FollowButton({ followState , follow, userinfo, setUserinfo}) {
    const [btnContext, setBtnContext] = useState(followState ? 'Following' : 'Follow');
    const [btnStyle, setBtnStyle] = useState(followState ? { border: '3px solid skyblue', color: 'skyblue' } : { border: '3px solid black', color: 'black' })
    const dispatch = useDispatch();

    // const getFollow = () => {
    //     axios.post('/api/members/getfollow', null, { params: { nickname: follow.follower } })
    //         .then(result => {
    //             dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }))
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }

    const toggleFollow = () => {
        axios.post('/api/members/togglefollow', follow)
        .then(result=>{
            // getFollow();
            // setUsers(user.followers.length)
            console.log(result.data, userinfo);
            setUserinfo({...userinfo, followers: result.data.follower});
            
        })
        .catch(err=>{
            console.error(err);
        })
    }

    return (
        <button style={btnStyle} onMouseEnter={() => {
            setBtnContext(followState ? 'Unfollow' : 'Following')
            setBtnStyle(followState ? { border: '3px solid red', color: 'red' } : { border: '3px solid skyblue', color: 'skyblue' })
        }} onMouseLeave={() => {
            setBtnContext(followState ? 'Following' : 'Follow')
            setBtnStyle(followState ? { border: '3px solid skyblue', color: 'skyblue' } : { border: '3px solid black', color: 'black' })
        }} onClick={()=>{
            toggleFollow()
        }}>{btnContext}</button>
    )
}

export default FollowButton
