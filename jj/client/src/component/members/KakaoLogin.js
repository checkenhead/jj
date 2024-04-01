import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtAxios from '../../util/jwtUtil';
import { setCookie } from '../../util/cookieUtil';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../store/userSlice';
import { setMessageAction } from '../../store/notifySlice';
import { setFollowAction } from '../../store/followSlice';
/** 로그인 페이지로 이동 */
function KakaoLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY; //REST API KEY
    const Redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI; //Redirect URI
    const code = new URL(window.location.href).searchParams.get("code");
    
    const KakaoStart = () => {
        axios.post('/api/members/kakaoLogin', null, { params: { code, apikey: Rest_api_key, redirectUri: Redirect_uri } })
            .then(result => {
                console.log(2, result.data);
                dispatch(setMessageAction('로그인/회원가입 성공'));
                setCookie("user", JSON.stringify(result.data), 1);
                dispatch(loginAction(result.data));
                getFollow(result.data.nickname);
                navigate('/main');
            })
            .catch(err => {
                console.error(err);
            })
        // console.log(1, "code : ", code, "apikey : ", Rest_api_key, "redirectUri : ", Redirect_uri);
    }

    const getFollow = (nickname) => {
        jwtAxios.post('/api/members/getfollow', null, { params: { nickname } })
          .then(result => {
            console.log('getFollow:', result);
            dispatch(setFollowAction({ followings: result.data.followings, followers: result.data.followers }))
          })
          .catch(err => {
            console.error(err);
          });
      }

    useEffect(() => {
        KakaoStart();
    }, []);

    return (
        <div>
            <h1>로그인 중</h1>
        </div>
    )
}

export default KakaoLogin
