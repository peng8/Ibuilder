import Element from "./Element.js"
export default class Text extends Element {
  constructor(option) {
    super(option)
    this.width = 200
    this.height = 100
    this.backgroundSrc = ''
    this.iframeUrl = ''

    this.s = {
      boxShadow: {}
    }
  }
}
