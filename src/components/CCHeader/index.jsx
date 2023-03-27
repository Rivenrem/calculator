import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/CCHeader/styled.js";

export default function CCHeader() {
  return (
    <Container>
      <Title>Calculator</Title>

      <Link to="/FC">Switch To FC</Link>
      <Navigation>
        <Link to="/CC">Home</Link>
        <Link to="/CCSettings">Settings</Link>
      </Navigation>
    </Container>
  );
}
