import { useRoutes, Navigate } from "react-router-dom";

import Main from "Pages/Main/index.jsx";
import FC_Page from "Pages/FunctionalComponents/index.jsx";
import FC_Settings from "Pages/FC_Settings/index.jsx";
import CC_Page from "Pages/ClassComponents/index.jsx";
import CC_Settings from "Pages/CC_Settings/index.jsx";

import "./main.css";

export default function App() {
  const routes = useRoutes([
    {
      element: <Main />,
      children: [
        { path: "/calculator", element: <Navigate to="/calculator/FC" /> },
        { path: "/calculator/FC", element: <FC_Page /> },
        { path: "/calculator/FCSettings", element: <FC_Settings /> },
        { path: "/calculator/CC", element: <CC_Page /> },
        { path: "/calculator/CCSettings", element: <CC_Settings /> },
      ],
    },
  ]);

  return routes;
}
