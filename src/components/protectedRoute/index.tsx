

import type { FC } from "react";
import { useUserAuth } from "../../context/user/userAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";

const ProtectedRoute: FC = () => {
  const { user,loading } = useUserAuth();
  const location = useLocation();
    if (loading) {
          return <Loading/>;
     }
  if (user === null) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
