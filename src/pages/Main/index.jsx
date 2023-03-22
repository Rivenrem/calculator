import { Outlet } from "react-router-dom";

import Header from "../../components/Header/index.jsx";

import { Container } from "./styled.js";

export default function Main() {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  );
}
