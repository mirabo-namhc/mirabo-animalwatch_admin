import { ForgotPassword, Login, ResetPassword } from "@pages/auth";
import Dasboard from "@pages/dasboard";
import React from "react";

import PATH_URL from "./pathURL";

// const AdminList = React.lazy(() => import("@pages/manager/admin/AdminList"));

const routes = [
  {
    key: 1,
    path: PATH_URL.LOGIN,
    element: <Login />,
  },
  {
    key: 9,
    path: PATH_URL.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    key: 10,
    path: PATH_URL.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    key: 2,
    path: PATH_URL.DASHBOARD,
    element: <Dasboard />,
    isLayout: true,
  },
];

export default routes;
