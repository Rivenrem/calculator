import { Component } from "react";

import {
  Title,
  Container,
  Navigation,
  Link,
} from "Components/CC_Header/styled.js";

class CC_Header extends Component {
  render() {
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
}

export default CC_Header;
