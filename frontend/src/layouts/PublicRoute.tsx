import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { user, token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user && token) {
      setShouldRedirect(true);
    }
  }, [user, token]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
