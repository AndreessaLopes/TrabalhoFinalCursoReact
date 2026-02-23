import {
  LayoutDashboard,
  Calendar,
  ImagePlus,
  Gift,
  Settings,
} from "lucide-react";
import { useState } from "react";
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

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* BOTÃO MOBILE */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg shadow-lg"
      >
        <MdMenuOpen size={22} />
      </button>

      {/* OVERLAY MOBILE */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <nav
        className={`
          fixed md:relative
          z-50
          h-screen
          bg-gray-900 text-white
          shadow-xl
          flex flex-col
          transition-all duration-300
          ${open ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="logo"
              className="w-10 rounded-md"
            />
            {open && (
              <h1 className="text-xl font-bold">
                Event<span className="text-green-400">Manager</span>
              </h1>
            )}
          </div>

          {/* Toggle Desktop */}
          <button
            onClick={() => setOpen(!open)}
            className="hidden md:block"
          >
            <MdMenuOpen size={26} />
          </button>
        </div>

        {/* MENU */}
        <ul className="flex-1 px-3 py-4 space-y-2">
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
                <Icon size={20} />
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
              <span className="text-xs text-gray-400">
                email@email.com
              </span>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;