import {createSlice} from '@reduxjs/toolkit';
import { getCookie } from '../util/cookieUtil';

const initialState = {
    email: '',
    nickname: '',
    pwd: '',
    profileimg: '',
    intro: '',
    snsid: '',
    provider: '',
    createdat: '',
    zipnum: '',
    address1: '',
    address2: '',
    address3: '',
    roleNames: [],
    accessToken: '',
    refreshToken: '',
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('user');
    // console.log('cookie:', memberInfo);

    if(memberInfo && memberInfo.nickname){
        memberInfo.email = decodeURIComponent(memberInfo.email);
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
        memberInfo.provider = decodeURIComponent(memberInfo.provider);
        memberInfo.snsid = decodeURIComponent(memberInfo.snsid);
        memberInfo.profileimg = decodeURIComponent(memberInfo.profileimg);
        memberInfo.intro = decodeURIComponent(memberInfo.intro);
        memberInfo.roleNames = decodeURIComponent(memberInfo.roleNames);
        memberInfo.accessToken = decodeURIComponent(memberInfo.accessToken);
        memberInfo.refreshToken = decodeURIComponent(memberInfo.refreshToken);
    }
    return memberInfo;
}

const userSlice = createSlice({
    name: 'user',
    initialState: loadMemberCookie() || initialState,
    reducers: {
        loginAction: (state, action) => {
            state.email = action.payload.email;
            state.nickname = action.payload.nickname;
            state.pwd = action.payload.pwd;
            state.profileimg = action.payload.profileimg;
            state.intro = action.payload.intro;
            state.snsid = action.payload.snsid;
            state.provider = action.payload.provider;
            state.zipnum = action.payload.zipnum;
            state.address1 = action.payload.address1;
            state.address2 = action.payload.address2;
            state.address3 = action.payload.address3;
            state.roleNames = action.payload.roleNames;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logoutAction: (state) => {
            state.email = '';
            state.nickname = '';
            state.pwd = '';
            state.profileimg = '';
            state.intro = '';
            state.snsid = '';
            state.provider = '';
            state.zipnum = '';
            state.address1 = '';
            state.address2 = '';
            state.address3 = '';
            state.roleNames = [];
            state.accessToken='';
            state.refreshToken='';
        }
    }
});

export const {loginAction, logoutAction} = userSlice.actions;
export default userSlice;