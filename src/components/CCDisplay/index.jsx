import { Component } from "react";

import { Input } from "Components/CCDisplay/styled.js";

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

export default ClassDisplay;
