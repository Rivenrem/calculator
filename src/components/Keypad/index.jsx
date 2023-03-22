import { Container, ButtonStyled } from "Components/Keypad/styled.js";

import {
  numbers,
  operands,
  removers,
  buttons,
} from "Constants/keypadButtons.js";

export default function Keypad({
  operandsHandler,
  numberHandler,
  equalHandler,
  removersHandler,
}) {
  function clickHandler(element) {
    if (numbers.includes(element)) {
      numberHandler(element);
    } else if (element === "=") {
      equalHandler();
    } else if (operands.includes(element)) {
      operandsHandler(element);
    } else if (removers.includes(element)) {
      removersHandler(element);
    }
  }

  return (
    <Container>
      {buttons.map((element) => {
        let classN = "";

        if (operands.includes(element)) {
          classN = "operands";
        } else if (element === "CE") {
          classN = "red";
        } else if (element === "=") {
          classN = "equal";
        } else {
          classN = "";
        }

        return (
          <ButtonStyled
            key={element}
            value={element}
            className={classN}
            onClick={(event) => {
              clickHandler(event.target.value);
            }}
          >
            {element}
          </ButtonStyled>
        );
      })}
    </Container>
  );
}
