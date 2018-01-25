import Element from "./Element.js"
export default class Input extends Element {
  constructor(option) {
    super(option)
    this.width = 200
    this.height = 40
    this.backgroundSrc = ''

    this.s = {
      boxShadow: {},
      input: {}
    }
  }
}
