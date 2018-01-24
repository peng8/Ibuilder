import Element from "./Element.js"
export default class Button extends Element {
  constructor(option) {
    super(option)
    this.width = 100
    this.height = 40

    this.s = {
      boxShadow: {}
    }
  }
}
