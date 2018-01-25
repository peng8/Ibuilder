export default class Page {
  constructor(option){
    this.name = "ui-page"
    this.width = "100%"
    this.height = "100%"
    this.scale = 1
    this.elements = option.elements || []
    this.ctime = option.ctime || Date.now()
    this.uuid = this.name + this.ctime
    this.isSelected = option.isSelected || false
    this.backgroundColor = option.backgroundColor || "none"
    this.backgroundImage = option.backgroundImage || "none"
  }
}