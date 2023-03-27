import { Component } from "react";

import { Input } from "Components/CCDisplay/styled.js";
import PropTypes from "prop-types";

class ClassDisplay extends Component {
  render() {
    return (
      <Input
        type="text"
        value={this.props.value}
        onChange={() => {
          false;
        }}
      />
    );
  }
}

ClassDisplay.propTypes = {
  value: PropTypes.string,
};

export default ClassDisplay;
