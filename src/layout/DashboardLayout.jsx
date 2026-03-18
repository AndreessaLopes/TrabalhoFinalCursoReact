import { useState } from "react";
import { Outlet } from "react-router-dom";
import { MdMenuOpen } from "react-icons/md";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        open={open}
        setOpen={setOpen}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          min-h-screen
          transition-all duration-300
          ${open ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <header className="h-20 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Painel do Organizador</h1>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden bg-gray-900 text-white p-2 rounded-lg shadow"
          >
            <MdMenuOpen size={22} />
          </button>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
