import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userSlice';
import followSlice from './followSlice';
import notifySlice from './notifySlice';

import storage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';


const reducers = combineReducers({
    user: userSlice.reducer,
    follow: followSlice.reducer,
    notify: notifySlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user','follow', 'notify'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
});