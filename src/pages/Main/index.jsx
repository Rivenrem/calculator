import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import FC_Header from "Components/FC_Header/index.jsx";
import CC_Header from "Components/CC_Header/index.jsx";

import { Container } from "Pages/Main/styled.js";

export default function Main() {
  const isLightTheme = useSelector((state) => state.theme.lightTheme);

  const location = useLocation();

  return (
    <div color-scheme={isLightTheme ? "light" : "dark"}>
      <Container>
        {location.pathname.includes("FC") ? <FC_Header /> : <CC_Header />}
        <Outlet />
      </Container>
    </div>
  );
}
