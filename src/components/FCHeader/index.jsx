import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/FCHeader/styled.js";

export default function Header() {
  return (
    <Container>
      <Title>Calculator</Title>

      <Link to="/CC">Switch To CC</Link>
      <Navigation>
        <Link to="/FC">Home</Link>
        <Link to="/FCSettings">Settings</Link>
      </Navigation>
    </Container>
  );
}
