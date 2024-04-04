import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';


import './style/members/login.css';
import './style/members/join.css';
import './style/main.css';
import './style/header.css';
import './style/feeds.css';
import './style/dropdown.css';
import './style/feed/search.css';
import './style/members/member.css';
import './style/message/message.css';
import './style/sub.css';
import './style/top.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './style/error.css';


import store from './store/index';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
export let persistor = persistStore(store);



const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </QueryClientProvider>
);

reportWebVitals();