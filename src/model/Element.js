export default class Element {
  constructor(option = {}) {
    this.name = option.name || 'ui-button'
    this.ctime = option.ctime || Date.now()
    this.uuid = this.genUUID(this.name, this.ctime)
    this.left = option.left || 0
    this.top = option.top || 0
    this.zindex = option.zindex || 1
    this.height = option.height || 100
    this.width = option.width || 200
    this.backgroundColor = option.backgroundColor || 'transparents'
    // this.isSelected = option.isSelected || false
    this.text = option.text || '单击此处添加文字'

    this.s = {
      'background-color': null,
      'opacity': 1,
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

  genUUID(name, id) {
    return name + '_' + id
  }
}
