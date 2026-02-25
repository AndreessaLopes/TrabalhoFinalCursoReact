import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/presentes",
    element: <h1>Presentes</h1>,
  }
]);
