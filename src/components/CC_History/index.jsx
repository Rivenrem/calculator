import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import bracketsToString from "Utils/bracketsToString.js";

import { Container, HistoryItem } from "Components/CC_History/styled.js";

class CC_History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const showHistory = this.props.showHistory;
    return (
      <Container id="history" className={showHistory ? "open" : null}>
        {this.props.history.map((historyItem, index) => (
          <HistoryItem id="historyItem" key={index}>
            {bracketsToString(historyItem, historyItem)}
          </HistoryItem>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  showHistory: state.calculator.showHistory,
});

CC_History.propTypes = {
  history: PropTypes.array,
  showHistory: PropTypes.bool,
};

export default connect(mapStateToProps)(CC_History);
