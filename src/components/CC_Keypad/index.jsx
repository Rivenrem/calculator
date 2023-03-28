import { Component } from "react";
import PropTypes from "prop-types";

import { Container, ButtonStyled } from "Components/CC_Keypad/styled.js";

import {
  numbers,
  operands,
  removers,
  buttons,
  ALL_CLEAR,
  EQUAL,
} from "Constants/keypadButtons.js";

class CC_Keypad extends Component {
  constructor(props) {
    super(props);
    this.numberHandler = props.numberHandler;
    this.operandsHandler = props.operandsHandler;
    this.removersHandler = props.removersHandler;
  }

  clickHandler = (event) => {
    const value = event.target.value;

    if (numbers.includes(value)) {
      this.numberHandler(value);
      return;
    }

    if (operands.includes(value)) {
      this.operandsHandler(value);
      return;
    }

    if (removers.includes(value)) {
      this.removersHandler(value);
      return;
    }
  };

  render() {
    return (
      <Container>
        {buttons.map((element) => {
          let className = "";

          if (element === EQUAL) {
            className = "equal";
          } else if (operands.includes(element)) {
            className = "operands";
          } else if (element === ALL_CLEAR) {
            className = "red";
          }

          return (
            <ButtonStyled
              key={element}
              value={element}
              className={className}
              onClick={this.clickHandler}
            >
              {element}
            </ButtonStyled>
          );
        })}
      </Container>
    );
  }
}

CC_Keypad.propTypes = {
  numberHandler: PropTypes.func,
  operandsHandler: PropTypes.func,
  removersHandler: PropTypes.func,
};

export default CC_Keypad;
