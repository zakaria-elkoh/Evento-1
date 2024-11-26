import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "@/layouts/DefaultLayout";
import LogIn from "@/components/auth/LogIn";
import SignUp from "@/components/auth/SignUp";
import ForgetPassword from "@/components/auth/ForgetPassword";
import OTP from "@/components/auth/OTP";
import PrivateRoute from "@/layouts/PrivateRoute";
import Profile from "@/pages/Profile";
import PublicRoute from "@/layouts/PublicRoute";
import Home from "@/pages/Home";

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/profile",
            element: <Profile />,
          },
          // Zid hna ay route khora li bgiti tprotectiha
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
          {
            path: "/otp",
            element: <OTP />,
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
