import expressionToString from "Utils/expressionToString.js";
import { Component } from "react";

import { Container, HistoryItem } from "Components/CCHistory/styled.js";

class ClassHistory extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }

  toggleClass = () => {
    const currentState = this.state.isOpen;
    this.setState({ isOpen: !currentState });
  };

  render() {
    return (
      <Container
        onClick={this.toggleClass}
        className={this.state.isOpen ? "open" : null}
      >
        <p>{this.state.isOpen ? "History:" : "Open History ↓"}</p>
        {this.props.history.map((historyItem, index) => (
          <HistoryItem key={index}>
            {expressionToString(historyItem)}
          </HistoryItem>
        ))}
      </Container>
    );
  }
}

export default ClassHistory;
