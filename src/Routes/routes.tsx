import { createBrowserRouter } from "react-router-dom";
import UserHome from "../Pages/user/UserHome";
import Error from "../Pages/error";
import Login from "../Pages/Login";
import PaymentHome from "../Pages/user/Payment/PaymentHome";
import MonthlyPayment from "../Pages/user/Payment/MonthlyPayment";
import QrCodePayment from "../Pages/user/Payment/QrCodePayment";
import UpiPayment from "../Pages/user/Payment/UpiPayment";
import MyCertificates from "../Pages/user/Certificates/MyCertificates";
import FamilyInformation from "../Pages/user/Profile/FamilyInformation";
import FamilyMemberDetails from "../Pages/user/Profile/FamilyMemberDetails";
import Settings from "../Pages/user/Settings";
import ProtectedRoute from "../components/protectedRoute";
import Dashboard from "../Pages/AdminPages/AdminHome";
import UsersPage from "../Pages/AdminPages/HeadofFamilies";
import AllUsersPage from "../Pages/AdminPages/AllUsers";
import RequestsPages from "../Pages/AdminPages/RequestPage";
import NotificationPage from "../Pages/AdminPages/NotificationPages";
import PaymentDashboard from "../Pages/AdminPages/PaymentDashboard";
import Paymenttable from "../Pages/AdminPages/Paymenttable";
import ComplaintsManagement from "../Pages/AdminPages/ComplaintsManagement";
import AppLayout from "../../src/Layout/admin/AppLayout";
import UserMainLayout from "../../src/Layout/user/UserMainLayout";
import UserRoute from "../components/protectedRoute/UserRoute";
import AdminRoute from "../components/protectedRoute/AdminRoute";
import CreateFamily from "../Pages/AdminPages/CreateFamily";
import AppProviders  from "../context/AppProviders"
import ComplaintBox from "../Pages/user/ComplaintBox";
import RequestHitory from "../Pages/user/Certificates/RequestHistory";
import CertificateDetails from "../Pages/user/Certificates/CertificateDetails";
// router.tsx
const router = createBrowserRouter([
   {
    element: <AppProviders />, // all routes are wrapped with providers
    children: [
      
  {
    element: <ProtectedRoute />,
    errorElement: <Error />,
    children: [
      {
        element: <UserRoute />,
        children: [
          {
            // Layout for routes that need Header + AppNavbar
            element: <UserMainLayout />,
            children: [
              { path: "/", element: <UserHome /> },
              { path: "payment", element: <PaymentHome /> },
              { path: "family-information", element: <FamilyInformation /> },
              { path: "settings", element: <Settings /> },
            ],
          },

          {
            // Routes that use HeaderBar inside the component itself
            path: "monthly-payment",
            element: <MonthlyPayment />,
          },
          {
            path: "qr-code-payment",
            element: <QrCodePayment />,
          },
          {
            path: "upi-payment",
            element: <UpiPayment />,
          },
          {
            path: "my-certificates",
            element: <MyCertificates />,
          },
          {
            path: "family-member/:id",
            element: <FamilyMemberDetails />,
          },
          {
            path: "complaints-box",
            element: <ComplaintBox />,
          },
          {
            path: "request-history",
            element: <RequestHitory />,
          },
          {
            path: "certificate/:id",
            element: <CertificateDetails />,
          },
        ],
      },

      // Admin routes

      {
        path: "/admin",
        element: <AdminRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "dashboard", element: <Dashboard /> },
              { path: "users", element: <UsersPage /> },
              { path: "all-users", element: <AllUsersPage /> },
              { path: "requests", element: <RequestsPages /> },
              { path: "family-creation", element: <CreateFamily /> },
              { path: "notifications", element: <NotificationPage /> },
              { path: "payments", element: <PaymentDashboard /> },
              { path: "payment-table", element: <Paymenttable /> },
              { path: "complaints", element: <ComplaintsManagement /> },
            ],
          },
        ],
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
    ]
   },

]);

export default router;
