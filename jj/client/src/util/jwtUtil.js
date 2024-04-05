import axios from "axios";
import { getCookie } from "./cookieUtil";

const jwtAxios = axios.create();

// const refreshJwt = async (accessToken, refreshToken) => {
//     const Header = { headers: { 'Authorization': `Bearer ${accessToken}` } };
//     const res = await axios.get(`/api/members/refreshtoken/${refreshToken}`, Header);
//     return res.data;
// }

const beforeReq = async (config) => {

    // axios로 요청하기 전 헤더 추가
    const memberInfo = getCookie('user');
    const { accessToken } = memberInfo;

    if (!memberInfo) {
        // console.log('Member Info Not Found');
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

const requestFail = (err) => {
    
}

const beforeRes = (res) => {
    return res;
}

const responseFail = async (err) => {
    // status 401 시
    if (err.response.status === 401) {
        window.location.href = '/logout';
        // const memberCookieValue = getCookie('user');
        // const result = await refreshJwt(memberCookieValue.accessToken, memberCookieValue.refreshToken);
        // memberCookieValue.accessToken = result.accessToken;
        // memberCookieValue.refreshToken = result.refreshToken;
        // setCookie('user', JSON.stringify(memberCookieValue), 1);

        // // 재시도
        // console.log('err.config:', err.config);
        // const response = await axios.request(err.config);

        // // console.log('responseFail.response:', response);

        // return response.data.data;
    }
}

jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;