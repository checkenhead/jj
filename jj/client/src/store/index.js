import userSlice from './userSlice';
import {configureStore} from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage/session';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';


const reducers = combineReducers({
    user: userSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
      }),
});