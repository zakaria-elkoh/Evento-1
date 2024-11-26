import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";

const PrivateRoute: React.FC = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user || !token) {
      setShouldRedirect(true);
    }
  }, [user, token]);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
