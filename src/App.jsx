import React, { Suspense } from "react";
import { Helmet } from "react-helmet";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import routes from "@common/config/routers";
import LoadingView from "@components/LoadingView";
import LayoutComp from "@components/layout";
import FormDetail from "@components/form/FormDetail";

function App() {
  const generateRoutes = () => {
    let result = null;
    result = routes.map((route) => {
      return route.isLayout ? (
        <Route
          key={route.key}
          path={route.path}
          element={<LayoutComp>{route.element}</LayoutComp>}
        >
          {route.children &&
            route.children.map((r) => (
              <Route key={r.key} path={r.path} element={r.element} />
            ))}
        </Route>
      ) : (
        <Route key={route.key} path={route.path} element={route.element} />
      );
    });
    return result;
  };

  return (
    <>
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Helmet>
      <Suspense fallback={<LoadingView />}>
        <Router>
          <Routes>
            <Route path="/form-item" element={<FormDetail />} />
            {generateRoutes()}
            <Route path="/*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
