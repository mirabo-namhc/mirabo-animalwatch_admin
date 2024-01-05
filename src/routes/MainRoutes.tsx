import { lazy } from 'react';

import { Navigate } from 'react-router-dom';
import Loadable from './Loadable';
import { APP_ROUTE_URL } from '~constants/endpoint';
import OMainLayout from '~organisms/o-main-layout';

const DashboardDefault = Loadable(lazy(() => import('~pages/dashboard')));

const MainRoutes = {
    path: '/',
    element: <OMainLayout />,
    children: [
        {
            path: APP_ROUTE_URL.LOGIN,
            element: <Navigate to={APP_ROUTE_URL.DASHBOARD} />,
        },
        {
            path: APP_ROUTE_URL.DASHBOARD,
            element: <DashboardDefault />,
        },
    ],
};

export default MainRoutes;
