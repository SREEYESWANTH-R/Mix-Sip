import { House, SquarePlus, X, LogOutIcon, Settings } from "lucide-react";
import { useMemo, useState } from "react";
import AdminHome from "./AdminHome";
import AdminAddProduct from "./AdminAddProduct";


const Admin = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = useMemo(() => [
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
  ]);

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const CurrentComponent = useMemo(()=>{
    const menuItem = menuItems.find((item)=>item.id === activeMenu);
    return menuItem?.component || AdminHome;
  },[activeMenu,menuItems]) 

  return (
    <div className="flex space-x-2">
      <aside className="px-8 py-8 flex flex-col space-y-6 shadow-xl min-h-screen hidden w-1/6 bg-gray-100 sm:block">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Profile</p>
          <X size={32} strokeWidth={2.5} />
        </div>
        {/* <nav className=" space-y-7">
          <div className="flex space-x-3">
            <House size={32} strokeWidth={2.5} />
            <p className="font-semibold">Dashboard</p>
          </div>
          <div className="flex space-x-3">
            <SquarePlus size={32} strokeWidth={2.5} />
            <p className="font-semibold">Add Product</p>
          </div>
          <div className="flex space-x-3">
            <Settings size={32} strokeWidth={2.5} />
            <p className="font-semibold">Settings</p>
          </div>
        </nav> */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-5">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={()=>handleMenuClick(item.id)}
                  className={`w-full flex gap-4 items-center px-4 py-3 rounded-lg ${activeMenu === item.id  ? 'bg-gray-100 border-black border-2' : 'hover:bg-gray-50' }`}
                >
                  <item.icon className="w-7 h-7" />
                  <span className="text-lg">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex space-x-3 px-5">
          <LogOutIcon size={32} strokeWidth={2.5} />
          <p className="font-semibold">Logout</p>
        </div>
      </aside>

      {/* Current component section */}
      <div className="flex-1 sm:shadow-lg">
            <CurrentComponent/>
      </div>
    </div>
  );
};

export default Admin;
