import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/FC_Header/styled.js";

export default function FC_Header() {
  return (
    <Container>
      <Title>Calculator</Title>

      <Link to="/calculator/CC">Switch To CC</Link>

      <Navigation>
        <Link to="/calculator/FC">Home</Link>
        <Link to="/calculator/FCSettings">Settings</Link>
      </Navigation>
    </Container>
  );
}
