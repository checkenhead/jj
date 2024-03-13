import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div><h3>Loadging...</h3></div>
const Index = lazy(() => import('../component/index'));
const Login = lazy(() => import('../component/members/login'));
const Join = lazy(() => import('../component/members/join'));
const UpdateProfile = lazy(() => import('../component/members/updateProfile'));
const Message = lazy(() => import('../component/members/message'));
const Main = lazy(() => import('../component/main'));

const Test = lazy(() => import('../component/test'));
const Member = lazy(() => import('../component/members/member'));


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

]);

export default root;