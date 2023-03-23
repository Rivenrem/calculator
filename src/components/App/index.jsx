import { useRoutes, Navigate } from "react-router-dom";

import Main from "Pages/Main/index.jsx";
import Functional from "Pages/Functional/index.jsx";
import Settings from "Pages/Settings/index.jsx";

import "./main.css";

export default function App() {
  const routes = useRoutes([
    {
      element: <Main />,
      children: [
        { path: "/", element: <Navigate to="/functional" /> },
        { path: "/functional", element: <Functional /> },
        { path: "/functionalSettings", element: <Settings /> },
        // { path: "/settings", element: <Settings /> },
        // { path: "/Class", element: <Class /> },
      ],
    },
  ]);

  return routes;
}
