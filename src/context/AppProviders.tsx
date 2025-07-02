// src/context/AppProviders.tsx
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./user/userAuthContext";
import { ThemeProvider } from "./admin/ThemeContext";

const AppProviders = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default AppProviders;
