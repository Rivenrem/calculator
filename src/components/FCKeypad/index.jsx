import { Container, ButtonStyled } from "Components/FCKeypad/styled.js";

import {
  numbers,
  operands,
  removers,
  buttons,
  ALL_CLEAR,
  EQUAL,
} from "Constants/keypadButtons.js";

export default function Keypad({
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
