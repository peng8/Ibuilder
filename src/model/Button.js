import Element from "./Element.js"
export default class Button extends Element {
  constructor(option) {
    super(option)
    this.width = 'auto'
    this.height = 'auto'

    this.s = {}
  }
}
