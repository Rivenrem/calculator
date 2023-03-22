export default class ResultCalculator {
  constructor(initialValue) {
    this.initialValue = initialValue;
    this.result = 0;
  }

  executeCommand(command) {
    this.result = command.execute(this.initialValue);
  }
}
