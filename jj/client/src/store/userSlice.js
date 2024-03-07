import {createSlice} from '@reduxjs/toolkit';

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
}

const userSlice = createSlice({
    name: 'user',
    initialState,
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
        }
    }
});

export const {loginAction, logoutAction} = userSlice.actions;
export default userSlice;