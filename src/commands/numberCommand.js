export default class NumberCommand {
  constructor(value) {
    this.value = value;
  }

  execute() {
    return this.value;
  }
}
