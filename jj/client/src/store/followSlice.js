import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    followings: [],
    followers: [],
}

const followSlice = createSlice({
    name: 'follow',
    initialState,
    reducers: {
        setFollowAction: (state,action) => {
            state.followers = action.payload.followers;
            state.followings = action.payload.followings;
        }
    }
});

export const {setFollowAction} = followSlice.actions;
export default followSlice;