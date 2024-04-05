import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { removeCookie } from '../../util/cookieUtil';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../store/userSlice';
import { setMessageAction } from '../../store/notifySlice';

function Logout() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(location.state?.message){
            dispatch(setMessageAction({message:location.state.message}));
            location.state = null;
        }else{
            dispatch(setMessageAction({message:'로그인이 필요합니다.'}));
        }
        removeCookie('user');
        dispatch(logoutAction());
        navigate('/login');
    }, [])


    return (
        <div>

        </div>
    )
}

export default Logout
