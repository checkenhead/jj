import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div><h3>Loadging...</h3></div>
const Index = lazy(() => import('../component/index'));
const Login = lazy(() => import('../component/members/login'));
const Main = lazy(() => import('../component/main'));

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
        path: 'main',
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
]);

export default root;