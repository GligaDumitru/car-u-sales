import {
  Outlet,
  BrowserRouter,
  useRoutes,
  RouteObject,
} from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Loading from "../components/shared/Loading";
import DashboardLayout from "../components/Layouts/DashboardLayout";

const MainPage = lazy(() => import("../components/MainPage"));

const NotFoundPage = lazy(() => import("../components/NotFoundPage"));

const SalesPeoplePage = lazy(() => import("./SalesPeople"));

const CarsPage = lazy(() => import("./Cars"));

const SalesPage = lazy(() => import("./Sales"));

const Layout = () => (
  <div>
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  </div>
);

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <SalesPeoplePage />,
        },
        {
          path: "/people",
          element: <SalesPeoplePage />,
        },
        {
          path: "/cars",
          element: <CarsPage />,
        },
        {
          path: "/sales",
          element: <SalesPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ];

  const element = useRoutes(routes);
  return (
    <>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </>
  );
};

export const RouterController = () => (
  <BrowserRouter>
    <InnerRouter />
  </BrowserRouter>
);
