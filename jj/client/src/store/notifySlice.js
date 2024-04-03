import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    message: null
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        setMessageAction: (state,action) => {
            state.message = action.payload.message;
        }
    }
});

export const {setMessageAction} = notifySlice.actions;
export default notifySlice;