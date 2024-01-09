import { lazy } from 'react';

import { Navigate } from 'react-router-dom';
import Loadable from './Loadable';
import { APP_ROUTE_URL } from '~constants/endpoint';
import OMainLayout from '~organisms/o-main-layout';

const DashboardDefault = Loadable(lazy(() => import('~pages/dashboard')));
const FacilityPage = Loadable(lazy(() => import('~pages/facility')));
const CouponPage = Loadable(lazy(() => import('~pages/coupon')));
const SettingPage = Loadable(lazy(() => import('~pages/setting')));
const VideoPage = Loadable(lazy(() => import('~pages/video')));
const QuizPage = Loadable(lazy(() => import('~pages/quiz')));
const EventPage = Loadable(lazy(() => import('~pages/event')));

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
    {
      path: APP_ROUTE_URL.FACILITY,
      element: <FacilityPage />,
    },
    {
      path: APP_ROUTE_URL.COUPON,
      element: <CouponPage />,
    },
    {
      path: APP_ROUTE_URL.SETTING,
      element: <SettingPage />,
    },
    {
      path: APP_ROUTE_URL.VIDEO,
      element: <VideoPage />,
    },
    {
      path: APP_ROUTE_URL.QUIZ,
      element: <QuizPage />,
    },
    {
      path: APP_ROUTE_URL.EVENT,
      element: <EventPage />,
    },
  ],
};

export default MainRoutes;
