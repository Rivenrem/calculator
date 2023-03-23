import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/Header/styled.js";

export default function Header() {
  return (
    <Container>
      <Title>Calculator</Title>
      <Navigation>
        <Link to="/functional">Home</Link>
        <Link to="/functionalSettings">Settings</Link>
      </Navigation>
    </Container>
  );
}
