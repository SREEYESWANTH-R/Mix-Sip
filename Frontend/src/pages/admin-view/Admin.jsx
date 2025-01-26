import {
  House,
  SquarePlus,
  X,
  LogOutIcon,
  Settings,
  Menu,
} from "lucide-react";
import { useMemo, useState } from "react";
import AdminHome from "./AdminHome";
import AdminAddProduct from "./AdminAddProduct";

const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: House,
        component: AdminHome,
      },
      {
        id: "addProduct",
        label: "Add Product",
        icon: SquarePlus,
        component: AdminAddProduct,
      },
      {
        id: "setting",
        label: "Setting",
        icon: Settings,
        component: "",
      },
    ],
    []
  );

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
    setIsSidebarOpen(false); // Close the sidebar on tablets/mobiles after menu click
  };

  const CurrentComponent = useMemo(() => {
    const menuItem = menuItems.find((item) => item.id === activeMenu);
    return menuItem?.component || AdminHome;
  }, [activeMenu, menuItems]);

  return (
    <div className="flex h-screen">
      {/* Hamburger button for tablets and mobiles */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-100 shadow-xl transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-3/4 md:w-1/3 lg:static lg:translate-x-0 lg:w-1/6 px-6 py-6 flex flex-col space-y-6`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between">
          <p className="text-base md:text-lg font-bold">Profile</p>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex gap-3 items-center px-4 py-2 rounded-lg ${
                    activeMenu === item.id
                      ? "bg-gray-200 border-black border"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-6 h-6 md:w-7 md:h-7" />
                  <span className="text-sm md:text-base lg:text-lg">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="flex items-center space-x-3 px-4">
          <LogOutIcon size={24} className="md:w-6 md:h-6" strokeWidth={2} />
          <p className="text-sm md:text-base font-semibold">Logout</p>
        </div>
      </aside>

      {/* Backdrop for tablets and mobiles */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 lg:shadow-lg">
        <CurrentComponent />
      </div>
    </div>
  );
};

export default Admin;
