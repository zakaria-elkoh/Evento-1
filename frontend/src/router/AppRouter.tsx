import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import LogIn from "@/components/auth/LogIn";
import SignUp from "@/components/auth/SignUp";
import ForgetPassword from "@/components/auth/ForgetPassword";
import PrivateRoute from "@/layouts/PrivateRoute";
import Profile from "@/pages/Profile";
import PublicRoute from "@/layouts/PublicRoute";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/home",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/",
            element: <Events />,
          },
          {
            path: "/events",
            element: <Events />,
          },
          {
            path: "/events/:eventId",
            element: <EventDetails />,
          },
        ],
      },
      {
        element: <PublicRoute />,
        children: [
          {
            path: "/login",
            element: <LogIn />,
          },
          {
            path: "/signup",
            element: <SignUp />,
          },
          {
            path: "/forgetpassword",
            element: <ForgetPassword />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default AppRouter;
