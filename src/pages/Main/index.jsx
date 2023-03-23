import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Header from "Components/Header/index.jsx";

import { Container } from "./styled.js";

export default function Main() {
  const theme = useSelector((state) => state.theme.lightTheme);

  const [lightTheme, setLightTheme] = useState(theme);

  useEffect(() => {
    setLightTheme(theme);
  }, [theme]);

  return (
    <div color-scheme={lightTheme ? "light" : "dark"}>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  );
}
