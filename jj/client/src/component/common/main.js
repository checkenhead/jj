import React, { useRef } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import { setCookie, getCookie } from "../../util/cookieUtil";




function Main({ component }) {
    const memberCookieValue = getCookie('user');

    useQuery(['refreshToken'], () => {
        console.log('memberCookieValue : ', memberCookieValue);
        if (memberCookieValue) {
            const Header = { headers: { 'Authorization': `Bearer ${memberCookieValue.accessToken}` } };

            return axios.get(`/api/members/refreshtoken/${memberCookieValue.refreshToken}`, Header)
                .then(result => {
                    console.log('refreshToken query called', result);
                    
                    memberCookieValue.accessToken = result.data.accessToken;
                    memberCookieValue.refreshToken = result.data.refreshToken;
                    setCookie('user', JSON.stringify(memberCookieValue), 1);
                    return result;
                })
        }
    },
        {
            enabled: !!memberCookieValue,
            refetchInterval: 4 * 60 * 1000,
            refetchIntervalInBackground: true,
            refetchOnMount: false,
            refetchOnWindowFocus: 'always'

        }
    );

    const currComponent = useRef();

    return (
        <main ref={currComponent}>
            {component}
        </main>
    )
}

export default Main
