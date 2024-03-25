import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './style/main.css';
import './style/header.css';
import './style/feeds.css';
import './style/dropdown.css';
import './style/feed/search.css';
import './style/members/member.css';
import './style/members/message.css';
import './style/sub.css';
import './style/members/join.css';
import './style/members/login.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



import store from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
export let persistor = persistStore(store);



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
);

reportWebVitals();