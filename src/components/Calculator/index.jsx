import { useState } from "react";
import { useDispatch } from "react-redux";

import Display from "Components/Display/index.jsx";
import Keypad from "Components/Keypad/index.jsx";
import History from "Components/HIstory/index.jsx";

import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand.js";
import ResultCalculator from "Utils/calculator.js";
import BracketsCalculator from "Utils/bracketsCalculator";
import { operands } from "Constants/keypadButtons";

import {
  setInputValue,
  cleanInputValue,
  setHistory,
} from "Store/slices/calculatorSlice.js";

import { Container } from "Components/Calculator/styled.js";
import NumberCommand from "Commands/numberCommand";

function commandsDistribution(value) {
  if (!value) return;

  let number = 0;

  if (value.length === 1 && operands.includes(value)) {
    number = 0;
  } else if (value.length === 1) {
    number = value;
  } else {
    number = value.slice(1);
  }

  if (value.includes("+")) {
    return new AddCommand(number);
  } else if (value.includes("-")) {
    return new SubtractCommand(number);
  } else if (value.includes("*")) {
    return new MultiplyCommand(number);
  } else if (value.includes("÷")) {
    return new DivideCommand(number);
  } else {
    return new AddCommand(number);
  }
}

export default function Calculator() {
  const dispatch = useDispatch();

  const [baseBrackets] = useState(new BracketsCalculator());
  const [currentBrackets, setCurrentBrackets] = useState(baseBrackets);

  const [currentNumber, setCurrentNumber] = useState();
  const [initialValue, setInitialValue] = useState(0);
  const [expression, setExpression] = useState([]);

  function numberHandler(number) {
    if (!currentNumber && expression.length === 0) {
      initialValue
        ? setInitialValue(initialValue + number)
        : setInitialValue(number);
      dispatch(setInputValue(number));
    } else {
      currentNumber
        ? setCurrentNumber(currentNumber + number)
        : setCurrentNumber(number);
      dispatch(setInputValue(number));
    }
  }

  function operandsHandler(operand) {
    if (
      expression.length === 0 &&
      !initialValue &&
      operand !== "-" &&
      operand !== "("
    ) {
      return;
    } else if (expression.length === 0 && !initialValue && operand === "-") {
      setInitialValue(operand);
      dispatch(setInputValue(operand));
      return;
    } else if (operand === currentNumber || operand === initialValue) return;

    if (operand === "(") {
      const newBracketsCalculator = new BracketsCalculator(currentBrackets);

      if (currentNumber || initialValue) {
        const newExpression = [
          ...expression,
          commandsDistribution(currentNumber),
        ];

        currentBrackets.addOperation(commandsDistribution(currentNumber));
        setExpression(newExpression);
        newExpression[newExpression.length - 1].value = newBracketsCalculator;
      }

      setCurrentBrackets(newBracketsCalculator);
      setCurrentNumber(new NumberCommand());
    } else if (operand === ")") {
      setCurrentBrackets(currentBrackets.parent);
    }

    if (currentNumber) {
      setExpression([...expression, commandsDistribution(currentNumber)]);
    }

    setCurrentNumber(operand);
    dispatch(setInputValue(operand));
  }

  function equalHandler() {
    if (expression.length === 0 && !currentNumber) return;

    let calculator = new ResultCalculator([
      new NumberCommand(initialValue),
      ...expression,
      commandsDistribution(currentNumber),
    ]);

    calculator.execute();

    setExpression([]);
    setCurrentNumber();
    setInitialValue(calculator.result);

    dispatch(cleanInputValue());
    dispatch(setInputValue(calculator.result));
  }

  return (
    <Container>
      <Display />
      <Keypad
        operandsHandler={operandsHandler}
        numberHandler={numberHandler}
        equalHandler={equalHandler}
        // removersHandler={removersHandler}
      />
      <History />
    </Container>
  );
}
