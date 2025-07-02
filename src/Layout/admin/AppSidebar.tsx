import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";
import {

  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
 
  TableIcon,
  UserCircleIcon,
} from "../../assets/icons";
import { useSidebar } from "../../context/admin/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "User Management",
    subItems: [
       { name: "All Users", path: "/admin/all-users" },
      { name: "Head of Families", path: "/admin/users" },
 
    ],
  },
  {
    icon: <ListIcon />,
    name: "Request Management",
    path: "/admin/requests",
  },
  {
    icon: <ListIcon />,
    name: "Family creation ",
    path: "/admin/family-creation",
  },
  {
    icon: <CalenderIcon />,
    name: "Notification Management",
    path: "/admin/notifications",
  },
  {
    icon: <TableIcon />,
    name: "Payment Management",
    path: "/admin/payments",
  },
  {
    icon: <PageIcon />,
    name: "Complaints Management",
    path: "/admin/complaints",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `main-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index ? null : { type: menuType, index }
    );
  };

  // Inside renderMenuItems function:
const renderMenuItems = (items: NavItem[]) => (
  <ul className="flex flex-col gap-2">
    {items.map((nav, index) => {
      const activeSubmenu = openSubmenu?.index === index;
      const isNavActive =
        nav.path && isActive(nav.path) ? true : activeSubmenu;

      return (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, "main")}
              className={`menu-item group flex items-center gap-2 px-3 py-2 rounded-lg transition duration-300 w-full ${
                activeSubmenu
                  ? "bg-white text-[#26A489]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="menu-item-icon-size">{nav.icon}</span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text">{nav.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      activeSubmenu ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group flex items-center gap-2 px-3 py-2 rounded-lg transition duration-300 ${
                  isNavActive
                    ? "bg-white text-[#26A489]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <span className="menu-item-icon-size">{nav.icon}</span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {/* Submenu */}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`main-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height: activeSubmenu
                  ? `${subMenuHeight[`main-${index}`]}px`
                  : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item flex items-center gap-2 px-2 py-1 rounded transition ${
                        isActive(subItem.path)
                          ? "bg-white text-[#26A489]"
                          : activeSubmenu
                          ? "text-[#26A489] hover:bg-white/80"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition ${
                          isActive(subItem.path)
                            ? "bg-[#26A489]"
                            : activeSubmenu
                            ? "bg-[#26A489]/50"
                            : "bg-white/50"
                        }`}
                      ></span>
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      );
    })}
  </ul>
);



  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-[#0F766E] dark:bg-gray-900 dark:border-gray-800 text-white h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <img
              src="/images/logo/logo.svg"
              alt="Logo"
              width={150}
              height={40}
            />
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                } text-gray-300`}
              >
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
