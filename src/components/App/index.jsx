import { useRoutes, Navigate } from "react-router-dom";

import Main from "Pages/Main/index.jsx";
import FCPage from "Pages/FC/index.jsx";
import FCSettings from "Pages/FCSettings/index.jsx";
import CCPage from "Pages/CC/index.jsx";
import CCSettings from "Pages/CCSettings/index.jsx";

import "./main.css";

export default function App() {
  const routes = useRoutes([
    {
      element: <Main />,
      children: [
        { path: "/", element: <Navigate to="/functional" /> },
        { path: "/FC", element: <FCPage /> },
        { path: "/FCSettings", element: <FCSettings /> },
        { path: "/CC", element: <CCPage /> },
        { path: "/CCSettings", element: <CCSettings /> },
      ],
    },
  ]);

  return routes;
}
