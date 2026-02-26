import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Fotos from "../pages/Fotos";
import DashboardLayout from "../layout/DashboardLayout";
// import Events from "../pages/Events";
// import Gifts from "../pages/Gifts";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "fotos",
        element: <Fotos />
      },
    //   {
    //     path: "gifts",
    //     element: <Gifts />
    //   }
    ]
  }
]);
