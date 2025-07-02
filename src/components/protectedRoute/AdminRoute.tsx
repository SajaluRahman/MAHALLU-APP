import type { FC } from "react";
import { useUserAuth } from "../../context/user/userAuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../common/Loading";

const AdminRoute: FC = () => {
  const { user, role, loading } = useUserAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default AdminRoute;
