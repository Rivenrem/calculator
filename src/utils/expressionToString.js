import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand";
import RemainderCommand from "Commands/remainderCommand";
import EqualCommand from "Commands/equalCommand";
import CloseParenthesisCommand from "Commands/closeParenthesisCommand.js";

import Brackets from "./brackets";

import {
  OPEN_PARENTHESIS,
  CLOSE_PARENTHESIS,
  ADD,
  SUBTRACT,
  MULTIPLY,
  DIVIDE,
  REMAINDER,
  EQUAL,
} from "Constants/keypadButtons.js";

export default function expressionToString(
  expression = [],
  currentExpression,
  lastCommand
) {
  const newExpression = [...expression];

  if (expression === currentExpression) {
    newExpression.push(lastCommand);
  }

  return newExpression.reduce((currentValue, operation) => {
    let str = "";

    if (operation instanceof CloseParenthesisCommand) {
      str += ` ${CLOSE_PARENTHESIS}`;
    }

    if (operation instanceof EqualCommand) {
      str += ` ${EQUAL} `;
    }

    if (operation instanceof AddCommand) {
      str += ` ${ADD} `;
    }

    if (operation instanceof SubtractCommand) {
      str += ` ${SUBTRACT} `;
    }

    if (operation instanceof MultiplyCommand) {
      str += ` ${MULTIPLY} `;
    }

    if (operation instanceof DivideCommand) {
      str += ` ${DIVIDE} `;
    }

    if (operation instanceof RemainderCommand) {
      str += ` ${REMAINDER} `;
    }

    if (operation.value instanceof Brackets) {
      return `${currentValue + str}${OPEN_PARENTHESIS} ${expressionToString(
        operation.value.expression,
        currentExpression,
        lastCommand
      )}`;
    }

    return currentValue + str + operation.value;
  }, "");
}
