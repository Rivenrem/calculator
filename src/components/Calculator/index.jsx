// import { useState } from "react";
// import { useDispatch } from "react-redux";

// import Display from "Components/Display/index.jsx";
// import Keypad from "Components/Keypad/index.jsx";
// import History from "Components/HIstory/index.jsx";

// import AddCommand from "Commands/addCommand.js";
// import SubtractCommand from "Commands/subtractCommand.js";
// import MultiplyCommand from "Commands/multiplyCommand.js";
// import DivideCommand from "Commands/divideCommand.js";
// import ResultCalculator from "Utils/calculator.js";

// import {
//   setInputValue,
//   cleanInputValue,
//   setHistory,
// } from "Store/slices/calculatorSlica.js";

// import { Container } from "Components/Calculator/styled.js";

// export default function Calculator() {
//   const dispatch = useDispatch();

//   const [operand, setOperand] = useState();
//   const [initialValue, setInitialValue] = useState();
//   const [valueToDo, setValueToDo] = useState();

//   function operandsHandler(element) {
//     if (!initialValue) {
//       switch (element) {
//         case "+":
//         case "÷":
//         case "X":
//         case "%":
//           return;
//         case "-":
//           setInitialValue(element);
//           dispatch(setInputValue(element));
//           break;
//       }
//     } else if (operand && valueToDo) {
//       // const calculator = new ResultCalculator(initialValue);
//       console.log("here");
//     } else {
//       setOperand(element);
//       dispatch(setInputValue(element));
//     }
//   }

//   function numberHandler(element) {
//     if (!operand) {
//       initialValue
//         ? setInitialValue(initialValue + element)
//         : setInitialValue(element);
//       dispatch(setInputValue(element));
//     } else if (operand && initialValue) {
//       valueToDo ? setValueToDo(valueToDo + element) : setValueToDo(element);
//       dispatch(setInputValue(element));
//     }
//   }

//   function removersHandler(element) {
//     switch (element) {
//       case "C":
//         break;
//       case "CE":
//         dispatch(cleanInputValue());
//         setOperand();
//         setInitialValue();
//         setValueToDo();
//         break;
//     }
//   }

//   function equalHandler() {
//     const calculator = new ResultCalculator(initialValue);
//     switch (operand) {
//       case "+":
//         calculator.executeCommand(new AddCommand(valueToDo));
//         break;
//       case "-":
//         calculator.executeCommand(new SubtractCommand(valueToDo));
//         break;
//       case "X":
//         calculator.executeCommand(new MultiplyCommand(valueToDo));
//         break;
//       case "÷":
//         calculator.executeCommand(new DivideCommand(valueToDo));
//         break;
//     }
//     dispatch(setHistory());
//     dispatch(cleanInputValue());
//     dispatch(setInputValue(calculator.result));
//     setInitialValue(calculator.result);
//     setOperand();
//     setValueToDo();
//   }

//   return (
//     <Container>
//       <Display />
//       <Keypad
//         operandsHandler={operandsHandler}
//         numberHandler={numberHandler}
//         equalHandler={equalHandler}
//         removersHandler={removersHandler}
//       />
//       <History />
//     </Container>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
import NumberCommand from "../../commands/numberCommand";

export default function Calculator() {
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const [initialValue, setInitialValue] = useState(0);
  const [expression, setExpression] = useState([]);

  function commandsDistribution(value) {
    const number = value.slice(1);

    if (value.includes("+")) {
      return new AddCommand(number);
    } else if (value.includes("-")) {
      return new SubtractCommand(number);
    } else if (value.includes("*")) {
      return new MultiplyCommand(number);
    } else if (value.includes("÷")) {
      return new DivideCommand(number);
    }
  }

  function numberHandler(number) {
    if (!value && expression.length === 0) {
      initialValue
        ? setInitialValue(initialValue + number)
        : setInitialValue(number);
      dispatch(setInputValue(number));
    } else {
      value ? setValue(value + number) : setValue(number);
      dispatch(setInputValue(number));
    }
  }

  function operandsHandler(operand) {
    !value
      ? setValue(operand)
      : setExpression([...expression, commandsDistribution(value)]);
    setValue(operand);
    dispatch(setInputValue(operand));
  }

  function equalHandler() {
    let calculator = new ResultCalculator([
      new NumberCommand(initialValue),
      ...expression,
      commandsDistribution(value),
    ]);

    calculator.execute();

    setExpression([]);
    setValue();
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
