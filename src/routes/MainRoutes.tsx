import { lazy } from 'react';

import { Navigate } from 'react-router-dom';
import Loadable from './Loadable';
import { APP_ROUTE_URL } from '~constants/endpoint';
import OMainLayout from '~organisms/o-main-layout';
import FacilityList from '~pages/facility/FacilityList';
import FacilityForm from '~pages/facility/FacilityForm';

const DashboardDefault = Loadable(lazy(() => import('~pages/dashboard')));
const FacilityPage = Loadable(lazy(() => import('~pages/facility')));
const CouponPage = Loadable(lazy(() => import('~pages/coupon')));
const SettingPage = Loadable(lazy(() => import('~pages/setting')));
const VideoPage = Loadable(lazy(() => import('~pages/video')));
const QuizPage = Loadable(lazy(() => import('~pages/quiz')));
const EventPage = Loadable(lazy(() => import('~pages/event')));

const urlForm = (url: string) => `${url}/:id`;

const MainRoutes = {
  path: '/',
  element: <OMainLayout />,
  children: [
    {
      key: 1,
      path: APP_ROUTE_URL.LOGIN,
      element: <Navigate to={APP_ROUTE_URL.INDEX} />,
    },
    {
      key: 2,
      path: APP_ROUTE_URL.INDEX,
      element: <DashboardDefault />,
    },
    {
      key: 3,
      path: APP_ROUTE_URL.FACILITY.INDEX,
      element: <FacilityPage />,
      children: [
        {
          key: 3.1,
          path: APP_ROUTE_URL.FACILITY.TABLE,
          element: <FacilityList />,
        },
        {
          key: 3.2,
          path: urlForm(APP_ROUTE_URL.FACILITY.DETAIL),
          element: <FacilityForm />,
        },
        {
          key: 3.3,
          path: APP_ROUTE_URL.FACILITY.CREATE,
          element: <FacilityForm />,
        },
        {
          key: 3.4,
          path: urlForm(APP_ROUTE_URL.FACILITY.EDIT),
          element: <FacilityForm />,
        },
      ],
    },
    {
      key: 4,
      path: APP_ROUTE_URL.COUPON,
      element: <CouponPage />,
    },
    {
      key: 5,
      path: APP_ROUTE_URL.SETTING,
      element: <SettingPage />,
    },
    {
      key: 6,
      path: APP_ROUTE_URL.VIDEO,
      element: <VideoPage />,
    },
    {
      key: 7,
      path: APP_ROUTE_URL.QUIZ,
      element: <QuizPage />,
    },
    {
      key: 8,
      path: APP_ROUTE_URL.EVENT,
      element: <EventPage />,
    },
  ],
};

export default MainRoutes;
