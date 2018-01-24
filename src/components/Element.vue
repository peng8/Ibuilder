<template>
  <div class="baseEle"
       :style="eleStyle"
        @click.stop="selectEl"
        :class="{selected: comData ? comData.isSelected: ''}">
    <slot></slot>
    <div class="operate" v-if="comData && comData.isSelected" @mousedown="mousedown">
      <div class="tl circleArea"></div>
      <div class="bl circleArea"></div>
      <div class="tr circleArea"></div>
      <div class="br circleArea"></div>
      <div class="t rectangleArea" :style="tBtnStyle"></div>
      <div class="l rectangleArea" :style="lBtnStyle"></div>
      <div class="r rectangleArea" :style="rBtnStyle"></div>
      <div class="b rectangleArea" :style="bBtnStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comData:{
      type: Object,
      default () {
        return {
          'top': 0,
          'left': 0,
          'z-index': 0,
          'width': 0,
          'height': 0, 
        }
      }
    },
  },
  data(){
    return {
      startPos: { // 记录鼠标开始移动的位置
        x: 0,
        y: 0
      },
      currentItem: 'operate', // 当前鼠标操作的对象的class
      styleData: {} // 样式信息
    }
  },
  methods: {
    selectEl(){
      this.$store.commit('setSelectedEl', this.comData.uuid)
    },
    mousedown (event) {
      if (event.target.getAttribute('class') === 'operate') {
        this.currentItem = 'operate'
      } else {
        this.currentItem = event.target.getAttribute('class').split(' ')[0]
      }
      this.onMouseDown(event)
    },
    onMouseDown (event) {
      this.startPos.x = event.clientX
      this.startPos.y = event.clientY
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove (targetClass) {
      let newPos = {
        x: event.clientX,
        y: event.clientY
      }
      let width = newPos.x - this.startPos.x
      let height = newPos.y - this.startPos.y
      this.resetPosition(width, height)
      this.startPos.x = newPos.x
      this.startPos.y = newPos.y
    },
    onMouseUp () {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
      // todo 提交style信息
      this.$store.commit('setElementStyle', {
        'top': this.styleData.top,
        'left': this.styleData.left,
        'width': this.styleData.width,
        'height': this.styleData.height,
        'z-index': this.styleData['z-index'],
        'uuid': this.comData.uuid
      })
    },
    /** @description 缩放时重置属性 */
    resetPosition (width, height) {
      switch (this.currentItem) {
        case 'operate':
          this.styleData.top = +this.styleData.top + height
          this.styleData.left = +this.styleData.left + width
          break;
        case 'tl':
          this.styleData.width = +this.styleData.width - width
          this.styleData.height = +this.styleData.height - height
          this.styleData.top = +this.styleData.top + height
          this.styleData.left = +this.styleData.left + width
          break;
        case 'tr':
          this.styleData.width = +this.styleData.width + width
          this.styleData.height = +this.styleData.height - height
          this.styleData.top = +this.styleData.top + height
          break;
        case 'bl':
          this.styleData.width = +this.styleData.width - width
          this.styleData.height = +this.styleData.height + height
          this.styleData.left = +this.styleData.left + width
          break;
        case 'br':
          this.styleData.width = +this.styleData.width + width
          this.styleData.height = +this.styleData.height + height
          break;
        case 't':
          this.styleData.height = +this.styleData.height - height
          this.styleData.top = +this.styleData.top + height
          break;
        case 'b':
          this.styleData.height = +this.styleData.height + height
          break;
        case 'l':
          this.styleData.width = +this.styleData.width - width
          this.styleData.left = +this.styleData.left + width
          break;
        case 'r':
          this.styleData.width = +this.styleData.width + width
          break;
        default:
          break;
      }
    }
  },
  created () {
    this.styleData = this.comData
    // this.styleData = JSON.parse(JSON.stringify(this.comData))
  },
  computed: {
    eleStyle () {
      return {
        'top': this.styleData.top + 'px',
        'left': this.styleData.left + 'px',
        'z-index': this.styleData['z-index'],
        'width': this.styleData.width + 'px',
        'height': this.styleData.height + 'px', 
      }
    },
    tBtnStyle () {
      return {
        'left': this.styleData['width'] / 2 - 5 + 'px'
      }
    },
    bBtnStyle () {
      return {
        'left': this.styleData['width'] / 2 - 5 + 'px'
      }
    },
    lBtnStyle () {
      return {
        'top': this.styleData['height'] / 2 - 5 + 'px'
      }
    },
    rBtnStyle () {
      return {
        'top': this.styleData['height'] / 2 - 5 + 'px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
@borderColor: #ddd;
@width: 10px;
@defaultDivWidth: 100px;
.baseEle {
  position: absolute;
  user-select: none;
  &:hover {
    border: 1px solid #8799A6;
    cursor: move; 
  }
  .operate {
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    outline: 1px dashed @borderColor;
    .circleArea {
      width: @width;
      height: @width;
      border-radius: 50%;
      border: 1px solid @borderColor;
      position: absolute;
      background: #fff;
      box-sizing: border-box;
      z-index: 1;
      &.tl {
        top: -@width/2;
        left: -@width/2;
        &:hover {
          cursor: nw-resize;
        }
      }
      &.tr {
        top: -@width/2;
        right: -@width/2;
        &:hover {
          cursor: ne-resize	;
        }
      }
      &.bl {
        bottom: -@width/2;
        left: -@width/2;
        &:hover {
          cursor: ne-resize	;
        }
      }
      &.br {
        bottom: -@width/2;
        right: -@width/2;
        &:hover {
          cursor: nw-resize;
        }
      }
    }
    .rectangleArea {
      width: @width;
      height: @width;
      box-sizing: border-box;
      border: 1px solid @borderColor;
      position: absolute;
      z-index: 1;
      &.t {
        background: #fff;
        top: -@width/2;
        left: @defaultDivWidth/2 - @width/2;
        &:hover {
          cursor: n-resize;
        }
      }
      &.b {
        background: #fff;
        bottom: -@width/2;
        left: @defaultDivWidth/2 - @width/2;
        &:hover {
          cursor: n-resize;
        }
      }
      &.l {
        background: #fff;
        left: -@width/2;
        top: @defaultDivWidth/2 - @width/2;
        &:hover {
          cursor: e-resize;
        }
      }
      &.r {
        background: #fff;
        right: -@width/2;
        top: @defaultDivWidth/2 - @width/2;
        &:hover {
          cursor: e-resize;
        }
      }
    }
  }
}
.selected{
  border: 1px dashed aqua;
}
</style>
