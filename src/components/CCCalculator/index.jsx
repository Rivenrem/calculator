import { Component } from "react";
import { connect } from "react-redux";

import { setHistory } from "Store/slices/calculatorSlice.js";

import Display from "Components/CCDisplay/index.jsx";
import Keypad from "Components/CCKeypad/index.jsx";
import History from "Components/CCHistory/index.jsx";

import NumberCommand from "Commands/numberCommand.js";
import CloseParenthesisCommand from "Commands/closeParenthesisCommand.js";
import AddCommand from "Commands/addCommand.js";
import SubtractCommand from "Commands/subtractCommand.js";
import MultiplyCommand from "Commands/multiplyCommand.js";
import DivideCommand from "Commands/divideCommand";
import RemainderCommand from "Commands/remainderCommand";
import CalculateCommand from "Commands/calculateCommand";
import EqualCommand from "Commands/equalCommand.js";

import Brackets from "Utils/brackets.js";
import expressionToString from "Utils/expressionToString.js";

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

import { Container, CalcContainer } from "Components/CCCalculator/styled.js";

class ClassCalculator extends Component {
  constructor(props) {
    super(props);
    const baseBrackets = new Brackets();
    this.state = {
      baseBrackets,
      currentBrackets: baseBrackets,
      isCommandHasNumber: true,
      selectedCommand: new NumberCommand(0),
      input: "0",
      sign: "",
    };
  }

  dispatchHistory = (value) => {
    const { dispatch } = this.props;
    dispatch(setHistory(value));
  };

  setBaseBrackets = (value) => {
    this.setState({ baseBrackets: value });
  };

  setCurrentBrackets = (value) => {
    this.setState({ currentBrackets: value });
  };

  setIsCommandHasNumber = (value) => {
    this.setState({ isCommandHasNumber: value });
  };

  setSelectedCommand = (value) => {
    this.setState({ selectedCommand: value }, this.selectComandCallback);
  };

  setInput = (value) => {
    this.setState({ input: value });
  };

  setSign = (value) => {
    this.setState({ sigh: value });
  };

  setAllToDefaultValues = (number = 0) => {
    const newBrackets = new Brackets();

    this.setBaseBrackets(newBrackets);
    this.setCurrentBrackets(newBrackets);

    this.setIsCommandHasNumber(true);
    this.setSelectedCommand(new NumberCommand(number));

    this.setInput(`${number}`);
    this.setSign("");
  };

  changeSelectedCommand = (newCommand) => {
    if (this.state.isCommandHasNumber) {
      this.state.currentBrackets.addOperation(
        new this.state.selectedCommand.constructor(
          parseFloat(this.getSignWithNumber())
        )
      );
      this.setIsCommandHasNumber(false);
      this.setInput("");
      this.setSign("");
    }

    this.setSelectedCommand(newCommand);
  };

  selectComandCallback = () => {
    if (this.state.selectedCommand instanceof EqualCommand) {
      const command = new CalculateCommand();
      const result =
        Math.round(
          command.execute(this.state.baseBrackets.expression) *
            10 ** NUMBERS_AFTER_COMMA
        ) /
        10 ** NUMBERS_AFTER_COMMA;

      this.dispatchHistory([
        ...this.props.history,
        [...this.state.baseBrackets.expression, new EqualCommand(result)],
      ]);

      this.setAllToDefaultValues(result);
      return;
    }
  };

  signToggle = () => {
    if (this.state.sign === MINUS) {
      this.setSign("");
      return;
    }

    this.setSign(MINUS);
  };

  getSignWithNumber = () => {
    return this.state.sign + this.state.input;
  };

  operandsHandler = (value) => {
    if (value === SIGN_CHANGER) {
      this.signToggle();
      return;
    }

    if (value === ADD) {
      this.changeSelectedCommand(new AddCommand(0));
      return;
    }

    if (value === SUBTRACT) {
      this.changeSelectedCommand(new SubtractCommand(0));
      return;
    }

    if (value === MULTIPLY) {
      this.changeSelectedCommand(new MultiplyCommand(0));
      return;
    }

    if (value === DIVIDE) {
      this.changeSelectedCommand(new DivideCommand(0));
      return;
    }

    if (value === REMAINDER) {
      this.changeSelectedCommand(new RemainderCommand(0));
      return;
    }

    if (value === EQUAL) {
      this.changeSelectedCommand(new EqualCommand());
      return;
    }

    if (value === OPEN_PARENTHESIS) {
      const newBrackets = new Brackets(this.state.currentBrackets);

      this.state.currentBrackets.addOperation(
        new this.state.selectedCommand.constructor(newBrackets)
      );

      this.setCurrentBrackets(newBrackets);
      this.setSelectedCommand(new NumberCommand(0));

      return;
    }

    if (value === CLOSE_PARENTHESIS) {
      const openParenthesisAmount =
        this.state.currentBrackets.parent.expression.reduce(
          (initialValue, command) =>
            command.value instanceof Brackets ? initialValue + 1 : initialValue,
          0
        );
      const closeParenthesisAmount =
        this.state.currentBrackets.parent.expression.reduce(
          (initialValue, command) =>
            command instanceof CloseParenthesisCommand
              ? initialValue + 1
              : initialValue,
          0
        );

      if (openParenthesisAmount === closeParenthesisAmount) return;

      this.state.currentBrackets.parent.addOperation(
        new CloseParenthesisCommand()
      );

      this.changeSelectedCommand(new NumberCommand());
      this.setCurrentBrackets(this.state.currentBrackets.parent);

      return;
    }
  };

  numberHandler = (number) => {
    if (!this.state.isCommandHasNumber) {
      this.setIsCommandHasNumber(true);
    }

    if (this.state.input === "0" && number !== FLOAT) {
      this.setInput(number);
      return;
    }

    const floatRegExp = new RegExp(
      `\\d*\\.?\\d{0,${NUMBERS_AFTER_COMMA}}`,
      "g"
    );
    this.setInput(`${this.state.input + number}`.match(floatRegExp)[0]);
  };

  clear = () => {
    if (!this.state.baseBrackets.expression.length && !this.state.input) {
      return;
    }

    if (
      !this.state.currentBrackets.expression.length &&
      this.state.currentBrackets.parent !== this.state.currentBrackets &&
      !this.state.input
    ) {
      this.setCurrentBrackets(this.state.currentBrackets.parent);

      const removedOperation =
        this.state.currentBrackets.parent.removeOperation();
      this.setInput("");
      this.setIsCommandHasNumber(false);
      this.setSelectedCommand(new removedOperation.constructor());

      return;
    }

    let newCurrentBrackets = this.state.currentBrackets;

    const previousCommandValue =
      this.state.currentBrackets.expression[
        this.state.currentBrackets.expression.length - 1
      ]?.value;

    if (!this.state.input && previousCommandValue instanceof Brackets) {
      newCurrentBrackets = previousCommandValue;
      this.setCurrentBrackets(newCurrentBrackets);
    }

    if (!this.state.input) {
      const removedOperation = newCurrentBrackets.removeOperation();
      const isRemovedValuePositive = removedOperation.value >= 0;

      this.setInput(
        `${
          isRemovedValuePositive
            ? removedOperation.value
            : -1 * removedOperation.value
        }`
      );
      this.setSign(isRemovedValuePositive ? "" : MINUS);
      this.setIsCommandHasNumber(true);
      this.setSelectedCommand(new removedOperation.constructor());

      return;
    }

    const newInput = this.state.input.slice(0, -1);

    if (!newInput) {
      this.setIsCommandHasNumber(false);
    }
    if (!this.state.baseBrackets.expression.length && !newInput) {
      this.setInput("0");
      return;
    }

    this.setInput(newInput);
  };

  removersHandler = (command) => {
    if (command === ALL_CLEAR) {
      this.setAllToDefaultValues();
      return;
    }

    if (command === CLEAR) {
      this.clear();

      return;
    }
  };

  render() {
    const displayValue = expressionToString(
      this.state.baseBrackets.expression,
      this.state.currentBrackets.expression,
      new this.state.selectedCommand.constructor(
        this.getSignWithNumber(this.getSignWithNumber())
      )
    );

    return (
      <Container>
        <CalcContainer>
          <Display value={displayValue} />
          <Keypad
            numberHandler={this.numberHandler}
            operandsHandler={this.operandsHandler}
            removersHandler={this.removersHandler}
          />
        </CalcContainer>
        <History history={this.props.history} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({ history: state.calculator.history });

export default connect(mapStateToProps)(ClassCalculator);
