import { type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeSvg from "../../assets/icons/home-2-svgrepo-com.svg";
import HomeActiveSvg from "../../assets/icons/home-Icon_active.svg";
import PaySvg from "../../assets/icons/paypal-140-svgrepo-com.svg";
import UserSvg from "../../assets/icons/user-svgrepo-com.svg";
import SettingSvg from "../../assets/icons/settings-svgrepo-com.svg";
import { NavIcon } from "../../components/common/NavIcon";

export const AppNavbar: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    {
      icon: location.pathname === "/home" ? HomeActiveSvg : HomeSvg,
      alt: "Home",
      size: "w-10 h-10",
      path: "/",
    },
    {
      icon: PaySvg,
      alt: "Payment",
      size: "w-7 h-7",
      path: "/payment",
    },
    {
      icon: UserSvg,
      alt: "User",
      size: "w-8 h-8",
      path: "/family-information",
    },
    {
      icon: SettingSvg,
      alt: "Settings",
      size: "w-9 h-9",
      path: "/settings",
    },
  ];

  return (
    <div className="fixed bottom-0  w-full  bg-gray-100 border-t border-gray-300">
      <div className="flex justify-around items-center py-3">
        {navItems.map((item) => (
          <button
            key={item.alt}
            type="button"
            className="focus:outline-none"
            onClick={() => navigate(item.path)}
            aria-current={location.pathname === item.path ? "page" : undefined}
          >
            <NavIcon icon={item.icon} alt={item.alt} size={item.size} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppNavbar