import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { setShowHistory } from "Store/slices/calculatorSlice.js";

import { Button } from "Components/CC_ControlPanel/styled.js";

class CC_ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.dispatch = props.dispatch;
  }

  render() {
    const showHistory = this.props.showHistory;
    return (
      <Button onClick={() => this.dispatch(setShowHistory())}>
        {showHistory ? "Hide History" : "Show History"}
      </Button>
    );
  }
}

const mapStateToProps = (state) => ({
  showHistory: state.calculator.showHistory,
});

CC_ControlPanel.propTypes = {
  dispatch: PropTypes.func,
  showHistory: PropTypes.bool,
};

export default connect(mapStateToProps)(CC_ControlPanel);
