import Element from './Element.js'
export default class Img extends Element {
  constructor (option) {
    super(option)
    this.height = '100'
    this.width = '100'
    this.src = 'https://www.baidu.com/img/bd_logo1.png'
    this.s = {
      opacity: 1,
      rotate: '',
      'border-style': '',
      'border-width': '',
      'border-color': '',
      'border-radius': '',
      'boxShadow': {
        'color': null,
        'radius': null,
        'position': null,
        'blur': null
      }
    }
  }
}
