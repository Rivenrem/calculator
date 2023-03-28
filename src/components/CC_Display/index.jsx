import { Component } from "react";
import PropTypes from "prop-types";

import { Input } from "Components/CC_Display/styled.js";

class CC_Display extends Component {
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

CC_Display.propTypes = {
  value: PropTypes.string,
};

export default CC_Display;
