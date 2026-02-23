import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar open={open} setOpen={setOpen} />

      {/* CONTEÚDO */}
      <div
        className={`
          transition-all duration-300
          ${open ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <header className="h-20 bg-white shadow px-6 flex items-center">
          <h1 className="text-xl font-semibold">Painel do Organizador</h1>
        </header>

        <main className="p-6">
          {/* OUTLET */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
