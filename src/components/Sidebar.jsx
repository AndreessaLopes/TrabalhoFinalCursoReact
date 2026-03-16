import { useNavigate, useLocation } from "react-router-dom";
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
import { useAuth } from "@/context/AuthContext";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, redirect: "/dashboard" },
  { name: "Eventos", icon: Calendar, redirect: "/dashboard/event" },
  { name: "Fotos", icon: ImagePlus, redirect: "/dashboard/fotos" },
  { name: "Lista de Presentes", icon: Gift, redirect: "/dashboard/presentes" },
];

const Sidebar = ({ open, mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setMobileOpen]);

  return (
    <>
      {/* Overlay mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0
        bg-gradient-to-b from-gray-900 via-gray-900 to-black
        text-gray-200
        flex flex-col z-50
        shadow-2xl
        transform transition-all duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${open ? "md:w-64" : "md:w-20"}
      `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-4 h-20 border-b border-gray-800">

          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={logo}
              alt="logo"
              className="w-10 shrink-0 rounded-lg shadow"
            />

            {open && (
              <h1 className="text-xl font-bold whitespace-nowrap text-yellow-400 tracking-wide">
                Festeja
              </h1>
            )}
          </div>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden bg-gray-800 hover:bg-gray-700 text-white p-2 rounded-lg transition"
          >
            <MdMenuOpen size={22} />
          </button>
        </div>

        {/* MENU */}
        <ul className="flex-1 px-3 py-6 space-y-2">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.redirect && location.pathname === item.redirect;

            return (
              <li
                key={item.name}
                onClick={() => item.redirect && navigate(item.redirect)}
                className={`
                group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer
                transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-800 text-yellow-400"
                    : "hover:bg-gray-800/70"
                }
                ${!open && "justify-center"}
              `}
              >

                {/* Indicador ativo */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-yellow-400 rounded-r"></div>
                )}

                <Icon
                  size={20}
                  className="shrink-0 transition group-hover:scale-110"
                />

                {open && (
                  <span className="text-sm font-medium tracking-wide">
                    {item.name}
                  </span>
                )}

              </li>
            );
          })}
        </ul>

        {/* FOOTER */}
        <div
          className={`
          flex items-center gap-3 px-4 py-4
          border-t border-gray-800
          bg-black/30
          ${!open && "justify-center"}
        `}
        >

          <FaUserCircle size={30} className="text-yellow-400" />

          {open && (
            <div className="leading-4">
              <p className="text-sm font-medium text-gray-200">
                Usuário
              </p>

              <span className="text-xs text-gray-400">
                {user?.email}
              </span>
            </div>
          )}

        </div>
      </aside>
    </>
  );
};

export default Sidebar;

