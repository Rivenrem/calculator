export default class NumberCommand {
  constructor(value = 0) {
    this.value = value;
  }

  execute() {
    return this.value;
  }
}
