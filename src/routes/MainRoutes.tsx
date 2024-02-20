import { lazy } from 'react';

import { Navigate } from 'react-router-dom';
import { APP_ROUTE_URL } from '~constants/endpoint';
import OMainLayout from '~organisms/o-main-layout';
import BannerForm from '~pages/banner/BannerForm';
import BannerList from '~pages/banner/BannerList';
import CouponForm from '~pages/coupon/CouponFrom';
import CouponList from '~pages/coupon/CouponList';
import EventForm from '~pages/event/EventForm';
import EventList from '~pages/event/EventList';
import FacilityForm from '~pages/facility/FacilityForm';
import FacilityList from '~pages/facility/FacilityList';
import Loadable from './Loadable';
import QuizList from '~pages/quiz/QuizList';
import QuizForm from '~pages/quiz/QuizFrom';

const DashboardDefault = Loadable(lazy(() => import('~pages/dashboard')));
const FacilityPage = Loadable(lazy(() => import('~pages/facility')));
const CouponPage = Loadable(lazy(() => import('~pages/coupon')));
const SettingPage = Loadable(lazy(() => import('~pages/setting')));
const VideoPage = Loadable(lazy(() => import('~pages/video')));
const QuizPage = Loadable(lazy(() => import('~pages/quiz')));
const EventPage = Loadable(lazy(() => import('~pages/event')));
const RankPage = Loadable(lazy(() => import('~pages/rank')));
const BannerPage = Loadable(lazy(() => import('~pages/banner')));
const ResetPasswordPage = Loadable(lazy(() => import('~pages/reset-password')));

const MainRoutes = {
  path: '/',
  element: <OMainLayout />,
  children: [
    {
      key: 1,
      path: APP_ROUTE_URL.LOGIN,
      element: <Navigate to={APP_ROUTE_URL.FACILITY.INDEX} />,
    },
    {
      key: 1,
      path: APP_ROUTE_URL.RESET_PASSWORD,
      element: <ResetPasswordPage />,
    },
    {
      key: 2,
      path: APP_ROUTE_URL.INDEX,
      element: <Navigate to={APP_ROUTE_URL.FACILITY.INDEX} />,
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
          key: 3.3,
          path: APP_ROUTE_URL.FACILITY.CREATE,
          element: <FacilityForm />,
        },
        {
          key: 3.4,
          path: APP_ROUTE_URL.FACILITY.EDIT,
          element: <FacilityForm />,
        },
      ],
    },
    {
      key: 4,
      path: APP_ROUTE_URL.COUPON.INDEX,
      element: <CouponPage />,
      children: [
        {
          key: 4.1,
          path: APP_ROUTE_URL.COUPON.TABLE,
          element: <CouponList />,
        },
        {
          key: 4.3,
          path: APP_ROUTE_URL.COUPON.EDIT,
          element: <CouponForm />,
        },
        {
          key: 4.4,
          path: APP_ROUTE_URL.COUPON.CREATE,
          element: <CouponForm />,
        },
      ],
    },
    {
      key: 5,
      path: APP_ROUTE_URL.SETTING.INDEX,
      children: [
        {
          key: 5.1,
          path: `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.RANK}`,
          element: <RankPage />,
        },
        {
          key: 5.2,
          path: `${APP_ROUTE_URL.SETTING.INDEX}/${APP_ROUTE_URL.SETTING.BANNER.INDEX}`,
          element: <BannerPage />,
          children: [
            {
              key: 5.1,
              path: APP_ROUTE_URL.SETTING.BANNER.TABLE,
              element: <BannerList />,
            },
            {
              key: 5.3,
              path: APP_ROUTE_URL.SETTING.BANNER.CREATE,
              element: <BannerForm />,
            },
            {
              key: 5.4,
              path: APP_ROUTE_URL.SETTING.BANNER.EDIT,
              element: <BannerForm />,
            },
          ],
        },
      ],
    },
    {
      key: 6,
      path: APP_ROUTE_URL.VIDEO,
      element: <VideoPage />,
    },
    {
      key: 7,
      path: APP_ROUTE_URL.QUIZ.INDEX,
      element: <QuizPage />,
      children: [
        {
          key: 7.1,
          path: APP_ROUTE_URL.QUIZ.TABLE,
          element: <QuizList />,
        },
        {
          key: 7.2,
          path: APP_ROUTE_URL.QUIZ.DETAIL,
          element: <QuizForm />,
        },
        {
          key: 7.3,
          path: APP_ROUTE_URL.QUIZ.EDIT,
          element: <QuizForm />,
        },
        {
          key: 7.4,
          path: APP_ROUTE_URL.QUIZ.CREATE,
          element: <QuizForm />,
        },
      ],
    },
    {
      key: 8,
      path: APP_ROUTE_URL.EVENT.INDEX,
      children: [
        {
          key: 8.1,
          path: `${APP_ROUTE_URL.EVENT.INDEX}/${APP_ROUTE_URL.EVENT.INFOR.INDEX}`,
          element: <EventPage />,
          children: [
            {
              key: 8.1,
              path: APP_ROUTE_URL.EVENT.INFOR.TABLE,
              element: <EventList />,
            },
            {
              key: 8.1,
              path: APP_ROUTE_URL.EVENT.INFOR.CREATE,
              element: <EventForm />,
            },
            {
              key: 8.1,
              path: APP_ROUTE_URL.EVENT.INFOR.EDIT,
              element: <EventForm />,
            },
          ],
        },
      ],
    },
  ],
};

export default MainRoutes;
