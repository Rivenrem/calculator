import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/Header/styled.js";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <Container>
      <Title>Calculator</Title>
      <Navigation>
        <Link to="/functional">Home</Link>
        <Link to="/settings">Settings</Link>
      </Navigation>
    </Container>
  );
}
