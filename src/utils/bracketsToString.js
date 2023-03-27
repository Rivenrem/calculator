import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand";
import RemainderCommand from "Commands/remainderCommand";
import EqualCommand from "Commands/equalCommand";

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

export default function bracketsToString(
  currentBrackets,
  lastBrackets,
  lastCommand
) {
  const newExpression = [...currentBrackets.expression];

  if (lastCommand && currentBrackets === lastBrackets) {
    newExpression.push(lastCommand);
  }

  return newExpression.reduce((currentValue, operation, index) => {
    let str = "";

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
      let lastBracketAncestors = lastBrackets;
      let isCurrentBracketLastBracketsAnscestor = true;

      while (
        lastBracketAncestors.parent !== lastBracketAncestors &&
        isCurrentBracketLastBracketsAnscestor
      ) {
        if (currentBrackets === lastBracketAncestors.parent) {
          isCurrentBracketLastBracketsAnscestor = false;
        }

        lastBracketAncestors = lastBracketAncestors.parent;
      }

      const isCloseParenthesisNeeded =
        newExpression.length - 1 > index ||
        isCurrentBracketLastBracketsAnscestor;

      return `${currentValue + str}${OPEN_PARENTHESIS} ${bracketsToString(
        operation.value,
        lastBrackets,
        lastCommand
      )}${isCloseParenthesisNeeded ? ` ${CLOSE_PARENTHESIS}` : ""}`;
    }

    return currentValue + str + operation.value;
  }, "");
}
