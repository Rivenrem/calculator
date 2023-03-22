import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Display from "Components/Display/index.jsx";
import Keypad from "Components/Keypad/index.jsx";
import History from "Components/HIstory/index.jsx";

import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand.js";
import ResultCalculator from "Utils/calculator.js";

import {
  setInputValue,
  cleanInputValue,
  setHistory,
} from "Store/slices/calculatorSlica.js";

import { Container } from "Components/Calculator/styled.js";

export default function Calculator() {
  const dispatch = useDispatch();

  const history = useSelector((state) => {
    state.calculator.history;
  });
  if (history) {
    console.log(history);
  }
  const [operand, setOperand] = useState();
  const [initialValue, setInitialValue] = useState();
  const [valueToDo, setValueToDo] = useState();

  function operandsHandler(element) {
    if (!initialValue) {
      switch (element) {
        case "+":
        case "÷":
        case "X":
        case "%":
          return;
        case "-":
          setInitialValue(element);
          dispatch(setInputValue(element));
          break;
      }
    } else if (["+", "-", "÷", "X", "%"].includes(element)) {
      setOperand(element);
      dispatch(setInputValue(element));
    }
  }

  function numberHandler(element) {
    if (!operand) {
      initialValue
        ? setInitialValue(initialValue + element)
        : setInitialValue(element);
      dispatch(setInputValue(element));
    } else if (operand && initialValue) {
      valueToDo ? setValueToDo(valueToDo + element) : setValueToDo(element);
      dispatch(setInputValue(element));
    }
  }

  function removersHandler(element) {
    switch (element) {
      case "C":
        break;
      case "CE":
        dispatch(cleanInputValue());
        setOperand();
        setInitialValue();
        setValueToDo();
        break;
    }
  }

  function equalHandler() {
    const calculator = new ResultCalculator(initialValue);
    switch (operand) {
      case "+":
        calculator.executeCommand(new AddCommand(valueToDo));
        break;
      case "-":
        calculator.executeCommand(new SubtractCommand(valueToDo));
        break;
      case "X":
        calculator.executeCommand(new MultiplyCommand(valueToDo));
        break;
      case "÷":
        calculator.executeCommand(new DivideCommand(valueToDo));
        break;
    }
    dispatch(setHistory());
    dispatch(cleanInputValue());
    dispatch(setInputValue(calculator.result));
    setInitialValue(calculator.result);
    setOperand();
    setValueToDo();
  }

  return (
    <Container>
      <Display />
      <Keypad
        operandsHandler={operandsHandler}
        numberHandler={numberHandler}
        equalHandler={equalHandler}
        removersHandler={removersHandler}
      />
      <History />
    </Container>
  );
}
