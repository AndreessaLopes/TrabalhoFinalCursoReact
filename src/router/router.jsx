import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
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
    //   {
    //     path: "events",
    //     element: <Events />
    //   },
    //   {
    //     path: "gifts",
    //     element: <Gifts />
    //   }
    ]
  }
]);
