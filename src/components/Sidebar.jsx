import {
  LayoutDashboard,
  Calendar,
  ImagePlus,
  Gift,
  Settings,
} from "lucide-react";
import { useEffect } from "react";
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Eventos", icon: Calendar },
  { name: "Fotos", icon: ImagePlus },
  { name: "Lista de Presentes", icon: Gift },
  { name: "Configurações", icon: Settings },
];

const Sidebar = ({ open, mobileOpen, setMobileOpen }) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  return (
    <>
      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0
          bg-gray-900 text-white
          shadow-xl
          flex flex-col
          z-50

          w-64
          transform transition-transform duration-300 ease-in-out

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          ${open ? "md:w-64" : "md:w-20"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src={logo} alt="logo" className="w-10 shrink-0 rounded-md" />

            {open && (
              <h1 className="text-xl font-bold whitespace-nowrap">
                Event<span className="text-green-400">Manager</span>
              </h1>
            )}
          </div>

          {/* Toggle Desktop */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden bg-gray-900 text-white p-2 rounded-lg shadow"
          >
            <MdMenuOpen size={22} />
          </button>
        </div>

        {/* MENU */}
        <ul className="flex-1 px-3 py-6 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <li
                key={index}
                className={`
                  flex items-center gap-3
                  px-3 py-3
                  rounded-lg
                  cursor-pointer
                  transition-all duration-200
                  hover:bg-gray-800
                  ${!open && "justify-center"}
                `}
              >
                <Icon size={20} className="shrink-0" />
                {open && <span>{item.name}</span>}
              </li>
            );
          })}
        </ul>

        {/* FOOTER */}
        <div
          className={`
            flex items-center gap-3
            px-4 py-4
            border-t border-gray-800
            ${!open && "justify-center"}
          `}
        >
          <FaUserCircle size={28} />
          {open && (
            <div className="leading-4">
              <p className="text-sm font-medium">Usuário</p>
              <span className="text-xs text-gray-400">email@email.com</span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
