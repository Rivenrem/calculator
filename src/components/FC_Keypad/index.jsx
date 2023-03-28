import PropTypes from "prop-types";

import {
  numbers,
  operands,
  removers,
  buttons,
  ALL_CLEAR,
  EQUAL,
} from "Constants/keypadButtons.js";

import { Container, ButtonStyled } from "Components/FC_Keypad/styled.js";

export default function FC_Keypad({
  operandsHandler,
  numberHandler,
  removersHandler,
}) {
  function clickHandler(event) {
    const value = event.target.value;

    if (numbers.includes(value)) {
      numberHandler(value);
      return;
    }

    if (operands.includes(value)) {
      operandsHandler(value);
      return;
    }

    if (removers.includes(value)) {
      removersHandler(value);
      return;
    }
  }

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
            onClick={clickHandler}
          >
            {element}
          </ButtonStyled>
        );
      })}
    </Container>
  );
}

FC_Keypad.propTypes = {
  numberHandler: PropTypes.func,
  operandsHandler: PropTypes.func,
  removersHandler: PropTypes.func,
};
