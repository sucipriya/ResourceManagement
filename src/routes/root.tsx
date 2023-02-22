import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideNav from "src/pages/sideNav";

const HomePage = React.lazy(() =>
  import("../pages/home").then(({ Home }) => ({ default: Home }))
);

const LoginPage = React.lazy(() =>
  import("../pages/login").then(({ Login }) => ({ default: Login }))
);

const NoPermissionPage = React.lazy(() =>
  import("src/pages/nopermission").then(({ NoPermission }) => ({
    default: NoPermission,
  }))
);

const ChartPage = React.lazy(() =>
  import("src/pages/chart").then(({ Chart }) => ({ default: Chart }))
);

function RootRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<>Loading...</>}>
            <LoginPage />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<>Loading...</>}>
            <NoPermissionPage
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          </Suspense>
        }
      />
      <Route
        path="home"
        element={
          <PrivateOutlet>
            <SideNav />
          </PrivateOutlet>
        }
      >
        <Route
          path="chart"
          element={
            <Suspense fallback={<>Loading...</>}>
              <HasAccessOutlet>
                <ChartPage />
              </HasAccessOutlet>
            </Suspense>
          }
        />
        <Route
          path=""
          element={
            <Suspense fallback={<>Loading...</>}>
              <HomePage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

const PrivateOutlet = ({ children }: any) => {
  const isAuthenticated =
    sessionStorage.getItem("profileName") !== "" ? true : false;
  return isAuthenticated ? children : <Navigate to="/" />;
};

const HasAccessOutlet = ({ children }: any) => {
  const hasPermission =
    sessionStorage.getItem("role") === "Admin" ? true : false;
  return hasPermission ? (
    children
  ) : (
    <NoPermissionPage
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      navigation="/home"
    />
  );
};

export default RootRoute;
