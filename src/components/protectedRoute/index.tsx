// import { getAuth } from "firebase/auth";
// import * as React from "react";
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import {useAuthState} from "react-firebase-hooks/auth"

// interface IProtectedRouteProps {}

// const ProtectedRoute: React.FC<IProtectedRouteProps> = (props) => {
//   // const auth = getAuth()
//   // const [user, loading]= useAuthState(auth)

//   // if (loading) {
//   //   return <div>loding...</div>
//   // }

//   const user: boolean = true
//   const location = useLocation();
//   return user ? (
//     <Outlet />
//   ) : (
//     <Navigate to={"/login"} state={{ from: location }} />
//   );
// };

// export default ProtectedRoute;

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
