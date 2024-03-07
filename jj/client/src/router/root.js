import { Suspense, lazy } from 'react';
const { createBrowserRouter } = require('react-router-dom');

const Loading = <div><h3>Loadging...</h3></div>
const Index = lazy(() => import('../component/index'));
// const Login = lazy(() => import('../component/members/login'));
// const Join = lazy(() => import('../component/members/join'));
// const KakaoSaveInfo = lazy(() => import('../component/members/kakaosaveinfo'));
// const EditMember = lazy(() => import('../component/members/editmember'));
// const Withdrawal = lazy(() => import('../component/members/withdrawal'));
// const KindList = lazy(() => import('../component/products/kindlist'));
// const ProductView = lazy(() => import('../component/products/productview'));
// const CartList = lazy(() => import('../component/mypage/cartlist'));
// const OrderDetail = lazy(() => import('../component/mypage/orderdetail'));
// const CurrentOrder = lazy(() => import('../component/mypage/currentorder'));
// const OrderHistory = lazy(() => import('../component/mypage/orderhistory'));
// const Customers = lazy(() => import('../component/customers/customers'));
// const WriteQna = lazy(() => import('../component/customers/writeqna'));
// const QnaView = lazy(() => import('../component/customers/qnaview'));
// const Map = lazy(() => import('../component/customers/map'));
// const ProductList = lazy(() => import('../component/admin/productlist'));
// const WriteProduct = lazy(() => import('../component/admin/writeproduct'));
// const AdminProductView = lazy(() => import('../component/admin/adminproductview'));

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Index /></Suspense>
    },
]);

export default root;