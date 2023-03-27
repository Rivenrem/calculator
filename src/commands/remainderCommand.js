export default class RemainderCommand {
  constructor(value) {
    this.value = value;
  }

  execute(value) {
    return value % this.value;
  }
}
