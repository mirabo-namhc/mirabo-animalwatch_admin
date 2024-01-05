import { lazy } from 'react';

import { Navigate } from 'react-router-dom';
import Loadable from './Loadable';
import { APP_ROUTE_URL } from '~constants/endpoint';

const AuthLogin = Loadable(lazy(() => import('~pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('~pages/authentication/Register')));

const AuthRoutes = {
    path: '/',
    children: [
        {
            path: APP_ROUTE_URL.LOGIN,
            element: <AuthLogin />,
        },
        {
            path: APP_ROUTE_URL.REGISTER,
            element: <AuthRegister />,
        },
        {
            path: '/',
            element: <Navigate to={APP_ROUTE_URL.LOGIN} />,
        },
    ],
};

export default AuthRoutes;
