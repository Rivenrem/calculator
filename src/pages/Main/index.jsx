import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import FCHeader from "Components/FCHeader/index.jsx";
import CCHeader from "Components/CCHeader/index.jsx";

import { Container } from "Pages/Main/styled.js";

export default function Main() {
  const isLightTheme = useSelector((state) => state.theme.lightTheme);

  const location = useLocation();

  return (
    <div color-scheme={isLightTheme ? "light" : "dark"}>
      <Container>
        {location.pathname.includes("FC") ? <FCHeader /> : <CCHeader />}
        <Outlet />
      </Container>
    </div>
  );
}
