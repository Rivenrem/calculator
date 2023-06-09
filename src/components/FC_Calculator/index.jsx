import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { setHistory } from "Store/slices/calculatorSlice.js";

import Display from "Components/FC_Display/index.jsx";
import Keypad from "Components/FC_Keypad/index.jsx";
import History from "Components/FC_HIstory/index.jsx";
import ControlPanel from "Components/FC_ControlPanel/index.jsx";

import NumberCommand from "Commands/numberCommand.js";
import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand";
import RemainderCommand from "Commands/remainderCommand";
import CalculateCommand from "Commands/calculateCommand";
import EqualCommand from "Commands/equalCommand.js";

import Brackets from "Utils/brackets.js";
import bracketsToString from "Utils/bracketsToString.js";

import {
  ADD,
  SUBTRACT,
  DIVIDE,
  MULTIPLY,
  EQUAL,
  REMAINDER,
  OPEN_PARENTHESIS,
  CLOSE_PARENTHESIS,
  SIGN_CHANGER,
  MINUS,
  FLOAT,
  NUMBERS_AFTER_COMMA,
  CLEAR,
  ALL_CLEAR,
} from "Constants/keypadButtons";

import { Container, CalcContainer } from "Components/FC_Calculator/styled.js";

export default function FC_Calculator() {
  const dispatch = useDispatch();

  const history = useSelector((state) => state.calculator.history);

  const [baseBrackets, setBaseBrackets] = useState(new Brackets());
  const [currentBrackets, setCurrentBrackets] = useState(baseBrackets);

  const [isCommandHasNumber, setIsCommandHasNumber] = useState(true);
  const [selectedCommand, setSelectedCommand] = useState(new NumberCommand(0));

  const [input, setInput] = useState("0");
  const [sign, setSign] = useState("");

  function setAllToDefaultValues(number = 0) {
    const newBrackets = new Brackets();

    setBaseBrackets(newBrackets);
    setCurrentBrackets(newBrackets);

    setIsCommandHasNumber(true);
    setSelectedCommand(new NumberCommand(number));

    setInput(`${number}`);
    setSign("");
  }

  function chagneSelectedCommand(newCommand) {
    if (isCommandHasNumber) {
      currentBrackets.addOperation(
        new selectedCommand.constructor(parseFloat(getSignWithNumber()))
      );

      setIsCommandHasNumber(false);
      setInput("");
      setSign("");
    }

    setSelectedCommand(newCommand);
  }

  function signToggle() {
    if (sign === MINUS) {
      setSign("");
      return;
    }

    setSign(MINUS);
  }

  const getSignWithNumber = () => sign + input;

  function operandsHandler(value) {
    if (value === SIGN_CHANGER) {
      signToggle();
      return;
    }

    if (value === ADD) {
      chagneSelectedCommand(new AddCommand(0));
      return;
    }

    if (value === SUBTRACT) {
      chagneSelectedCommand(new SubtractCommand(0));
      return;
    }

    if (value === MULTIPLY) {
      chagneSelectedCommand(new MultiplyCommand(0));
      return;
    }

    if (value === DIVIDE) {
      chagneSelectedCommand(new DivideCommand(0));
      return;
    }

    if (value === REMAINDER) {
      chagneSelectedCommand(new RemainderCommand(0));
      return;
    }

    if (value === EQUAL) {
      chagneSelectedCommand(new EqualCommand());

      const command = new CalculateCommand();
      const result =
        Math.round(
          command.execute(baseBrackets.expression) * 10 ** NUMBERS_AFTER_COMMA
        ) /
        10 ** NUMBERS_AFTER_COMMA;

      baseBrackets.addOperation(new EqualCommand(result));

      dispatch(
        setHistory([...history, new Brackets(null, baseBrackets.expression)])
      );

      setAllToDefaultValues(result);
      return;
    }

    if (value === OPEN_PARENTHESIS) {
      const newBrackets = new Brackets(currentBrackets);

      currentBrackets.addOperation(
        new selectedCommand.constructor(newBrackets)
      );

      setCurrentBrackets(newBrackets);
      setSelectedCommand(new NumberCommand());

      return;
    }

    if (value === CLOSE_PARENTHESIS) {
      chagneSelectedCommand(new NumberCommand());
      setCurrentBrackets(currentBrackets.parent);

      return;
    }
  }

  function numberHandler(number) {
    if (!isCommandHasNumber) {
      setIsCommandHasNumber(true);
    }

    if (input === "0" && number !== FLOAT) {
      setInput(number);
      return;
    }

    const floatRegExp = new RegExp(
      `\\d*\\.?\\d{0,${NUMBERS_AFTER_COMMA}}`,
      "g"
    );
    setInput(`${input + number}`.match(floatRegExp)[0]);
  }

  function clear() {
    if (
      !currentBrackets.expression.length &&
      currentBrackets.parent !== currentBrackets &&
      !input
    ) {
      setCurrentBrackets(currentBrackets.parent);

      const removedOperation = currentBrackets.parent.removeOperation();
      setInput("");
      setIsCommandHasNumber(false);
      setSelectedCommand(new removedOperation.constructor());

      return;
    }

    if (!input) {
      let newCurrentBrackets = currentBrackets;
      const previousCommandValue =
        currentBrackets.expression[currentBrackets.expression.length - 1]
          ?.value;

      if (
        previousCommandValue instanceof Brackets &&
        !(selectedCommand instanceof NumberCommand)
      ) {
        setSelectedCommand(new NumberCommand());
        return;
      }

      if (previousCommandValue instanceof Brackets) {
        newCurrentBrackets = previousCommandValue;
        setCurrentBrackets(newCurrentBrackets);
      }

      if (
        newCurrentBrackets.expression[newCurrentBrackets.expression.length - 1]
          ?.value instanceof Brackets
      ) {
        setSelectedCommand(new NumberCommand(""));
        return;
      }

      const removedOperation = newCurrentBrackets.removeOperation();
      const isRemovedValuePositive = removedOperation.value >= 0;

      setInput(
        `${
          isRemovedValuePositive
            ? removedOperation.value
            : -1 * removedOperation.value
        }`
      );
      setSign(isRemovedValuePositive ? "" : MINUS);
      setIsCommandHasNumber(true);
      setSelectedCommand(new removedOperation.constructor());

      return;
    }

    const newInput = input.slice(0, -1);

    if (!newInput) {
      setIsCommandHasNumber(false);

      if (!baseBrackets.expression.length) {
        setInput("0");
        return;
      }
    }

    setInput(newInput);
  }

  function removersHandler(command) {
    if (command === ALL_CLEAR) {
      setAllToDefaultValues();
      return;
    }

    if (command === CLEAR) {
      clear();

      return;
    }
  }
  return (
    <Container>
      <CalcContainer>
        <Display
          value={bracketsToString(
            baseBrackets,
            currentBrackets,
            new selectedCommand.constructor(getSignWithNumber())
          )}
        />
        <Keypad
          operandsHandler={operandsHandler}
          numberHandler={numberHandler}
          removersHandler={removersHandler}
        />
      </CalcContainer>
      <ControlPanel />
      <History history={history} />
    </Container>
  );
}
