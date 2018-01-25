import Element from "./Element.js"
export default class Button extends Element {
  constructor(option) {
    super(option)
    this.width = 100
    this.height = 40

    this.s = {
      'background-color': null,
      'opacity': null,
      'padding': null,
      'justify-content': null,
      'border-style': null,
      'border-width': null,
      'border-color': null,
      'border-radius': null,
      'font-family': null,
      'font-size': null,
      'font-weight': null,
      'color': null,
      'boxShadow': {
        'color': null,
        'radius': null,
        'position': null,
        'blur': null
      }
    }
  }
}
