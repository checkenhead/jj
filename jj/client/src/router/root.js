import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div><h3>Loadging...</h3></div>
const Index = lazy(() => import('../component/index'));
const Main = lazy(() => import('../component/main'));

// member
const Login = lazy(() => import('../component/members/login'));
const Join = lazy(() => import('../component/members/join'));
const Member = lazy(() => import('../component/members/member'));
const UpdateProfile = lazy(() => import('../component/members/updateProfile'));
const EditPassword = lazy(() => import('../component/members/EditPassword'));
const CurPwdCheck = lazy(() => import('../component/members/CurPwdCheck'));
const EmailCheck = lazy(() => import('../component/members/EmailCheck'));
const Message = lazy(() => import('../component/members/message'));

//feed
const View = lazy(()=> import('../component/feed/View'));

//search
const Search = lazy(() => import('../component/search/search'));

const Test = lazy(() => import('../component/test'));


const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Index /></Suspense>
    },
    {
        path: 'login',
        element: <Suspense fallback={Loading}><Login /></Suspense>
    },
    {
        path: 'join',
        element: <Suspense fallback={Loading}><Join /></Suspense>
    },
    {
        path: 'updateProfile',
        element: <Suspense fallback={Loading}><UpdateProfile /></Suspense>
    },
    {
        path: 'EditPassword',
        element: <Suspense fallback={Loading}><EditPassword /></Suspense>
    },
    {
        path: 'CurPwdCheck',
        element: <Suspense fallback={Loading}><CurPwdCheck /></Suspense>
    },
    {
        path: 'EmailCheck',
        element: <Suspense fallback={Loading}><EmailCheck /></Suspense>
    },
    {
        path: 'message',
        element: <Suspense fallback={Loading}><Message /></Suspense>
    },
    {
        path: 'main',
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: 'test',
        element: <Suspense fallback={Loading}><Test /></Suspense>
    },
    {
        path: 'member/:nickname',
        element: <Suspense fallback={Loading}><Member /></Suspense>
    },
    {
        path: 'view/:nickname/:feedid',
        element: <Suspense fallback={Loading}><View /></Suspense>
    },
    {
        path: 'search',
        element: <Suspense fallback={Loading}><Search /></Suspense>
    },

]);

export default root;