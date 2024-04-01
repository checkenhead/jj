import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwtAxios from '../../util/jwtUtil';
import { useDispatch } from 'react-redux';
import { setFollowAction } from '../../store/followSlice';


function FollowButton({ followState, follow }) {
    const dispatch = useDispatch();
    const [state, setState] = useState(followState);
    const [btnContext, setBtnContext] = useState(followState ? 'Following' : 'Follow');
    const [btnStyle, setBtnStyle] = useState(followState ? { border: '3px solid skyblue', color: 'skyblue' } : { border: '3px solid black', color: 'black' })

    useEffect( () => {
        setBtnContext(state ? 'Following' : 'Follow');
        setBtnStyle(state ? { border: '3px solid skyblue', color: 'skyblue' } : { border: '3px solid black', color: 'black' });
    },[state])

    const toggleFollow = () => {
        jwtAxios.post('/api/members/togglefollow', follow)
            .then(result => {
                // console.log(result.data, followState);
                dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }));
                setState(!state);
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <button style={btnStyle} onMouseEnter={() => {
            setBtnContext(state ? 'Unfollow' : 'Following')
            setBtnStyle(state ? { border: '3px solid red', color: 'red' } : { border: '3px solid skyblue', color: 'skyblue' })
        }} onMouseLeave={() => {
            setBtnContext(state ? 'Following' : 'Follow')
            setBtnStyle(state ? { border: '3px solid skyblue', color: 'skyblue' } : { border: '3px solid black', color: 'black' })
        }} onClick={() => {
            toggleFollow()
        }}>{btnContext}</button>
    )
}

export default FollowButton
