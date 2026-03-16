import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Fotos from "../pages/Fotos";
import GaleriaEvento from "../pages/GaleriaEvento";
import DashboardLayout from "../layout/DashboardLayout";
import Eventos from "@/pages/Eventos";
import PrivateRoute from "../components/PrivateRoute";
import GerenciaEvento from "@/pages/GerenciaEvento";
import Presentes from "@/pages/Presentes";
import PresentesEventos from "@/pages/PresentesEventos";

export const routes = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      {
        path: "fotos",
        children: [
          { index: true, element: <Fotos /> },
          { path: ":eventId", element: <GaleriaEvento /> },
        ],
      },
      {
        path: "event",
        children: [
          { index: true, element: <Eventos /> },
          { path: ":eventId", element: <GerenciaEvento /> }, // ← novo
        ],
      },
      {
        path: "presentes",
        children: [
          { index: true, element: <Presentes /> },
          { path: ":eventId", element: <PresentesEventos /> },
        ]
      }
    ],
  },
]);
