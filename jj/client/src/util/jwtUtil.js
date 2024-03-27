import axios from "axios";
import { setCookie, getCookie } from "./cookieUtil";

const jwtAxios = axios.create();

const refreshJwt = async (accessToken, refreshToken) => {
    const Header = { headers: { 'Authorization': `Bearer ${accessToken}` } };
    // console.log("before refresh");
    const res = await axios.get(`/api/members/refreshtoken/${refreshToken}`, Header);
    return res.data;
}

const beforeReq = async (config) => {
    const memberCookieValue = getCookie('user');
    const result = await refreshJwt(memberCookieValue.accessToken, memberCookieValue.refreshToken);
    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;
    setCookie('user', JSON.stringify(memberCookieValue), 1);

    // axios로 요청하기 전 헤더 추가
    const memberInfo = getCookie('user');
    const { accessToken } = memberInfo;

    if (!memberInfo) {
        console.log('Member Info Not Found');
        return Promise.reject({
            response: {
                data: {
                    error: '로그인이 필요합니다.'
                }
            }
        });
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
}

const requestFail = (err) => { }

const beforeRes = (res) => {
    return res;
    // if (data && data.error === 'ERROR_ACCESS_TOKEN') {
    //     const memberCookieValue = getCookie('user');
    //     const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken);
    //     console.log('refreshJWT RESULT', result);
    //     memberCookieValue.accessToken = result.accessToken;
    //     memberCookieValue.refreshToken = result.refreshToken;
    //     setCookie('user', JSON.stringify(memberCookieValue), 1);
    // }
}

const responseFail = (err) => { }

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;