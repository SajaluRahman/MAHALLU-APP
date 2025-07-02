import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppNavbar } from "../../Layout/user/AppNavbar";
import Button from "../../components/ui/button/Button";
import { useUserAuth } from "../../context/user/userAuthContext";

const Settings: FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {logout} = useUserAuth();
  const navigate = useNavigate();
  const handleThemeToggle = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

 const handleLogout = async () => {
    try {
      await logout();
      navigate("/login", { replace: true }); // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" bg-gray-100 dark:bg-gray-900 pb-16">
      {/* Header */}
        <h2 className="text-slate-900 text-xl font-bold flex-1 text-center py-4">Settings</h2>

      <main className="px-4 pt-6 max-w-sm mx-auto">
        {/* Theme toggle */}
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg px-4 py-3 mb-5 shadow">
          <span className="font-medium text-gray-800 dark:text-gray-200">Dark Theme</span>
          <button
            onClick={handleThemeToggle}
            className={`w-12 h-6 flex items-center rounded-full px-1 transition-colors duration-200 ${
              darkMode ? "bg-teal-600" : "bg-gray-300"
            }`}
            aria-pressed={darkMode}
            aria-label="Toggle theme"
          >
            <span
              className={`h-4 w-4 bg-white rounded-full shadow transform transition-transform duration-200 ${
                darkMode ? "translate-x-6" : ""
              }`}
            />
          </button>
        </div>
        {/* Logout */}
        <Button
          onClick={handleLogout}
          variant="bg_lener"
          className="w-full  text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-150"
        >
          Logout
        </Button>
      </main>
      <AppNavbar />
    </div>
  );
};

export default Settings;