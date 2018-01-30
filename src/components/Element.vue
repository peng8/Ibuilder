<template>
  <div>
    <div class="baseEle design"
      v-if="!isPreview"
      :style="eleStyle"
      @mousedown.prevent="dragEvent"
      @contextmenu.prevent="operateElements"
      :class="{selected: comData.uuid === $store.state.editorData.uuid}">
      <slot></slot>
      <div class="operate" v-if="comData.uuid === $store.state.editorData.uuid" @mousedown="mousedown">
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
    <div class="baseEle"
      v-else
      :style="eleStyle"
      @click="goto(comData.goto)">
      <slot></slot>
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
          'zindex': 0,
          'width': 0,
          'height': 0, 
        }
      }
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      startPos: { // 记录鼠标开始移动的位置
        x: 0,
        y: 0
      },
      currentItem: 'operate', // 当前鼠标操作的对象的class
      styleData: {}, // 样式信息
      scale: 1
    }
  },
  methods: {
    dragEvent (event) {
      this.currentItem = 'operate'
      this.onMouseDown(event)
      this.$store.commit('setEditorData', this.comData)
    },
    operateElements (event) {
      this.$store.commit('setEditorData', this.comData)
    },
    mousedown (event) {
      event.stopPropagation()
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
      let eleData = JSON.parse(JSON.stringify(this.styleData))
      eleData.width = this.formatData(eleData.width)
      eleData.height = this.formatData(eleData.height)
      eleData.top = this.formatData(eleData.top)
      eleData.left = this.formatData(eleData.left)
      this.$store.commit('setElementStyle', eleData)
    },
    /** @description 缩放时重置属性 */
    resetPosition (width, height) {
      width = width / this.scale
      height = height / this.scale
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
    },
    formatData (data) {
      let result = parseFloat(data)
      if (!Number.isInteger(result)) {
        result = result.toFixed(2)
      }
      return result
    },
    goto(id) {
      if (!id) {
        return false
      }
      let gotoPage = this.$store.state.allPageList.filter((page) => {
        if (page.id === id) {
          return true
        }
        return false
      })
      let previewPage = JSON.parse(gotoPage[0].content)
      this.$store.state.previewPage = previewPage
    }
  },
  created () {
    this.styleData = JSON.parse(JSON.stringify(this.comData))
    this.scale = this.$store.state.page.scale
  },
  watch: {
    comData: {
      handler: function (val) {
        this.styleData = JSON.parse(JSON.stringify(this.comData))
      },
      deep: true
    },
    pageScale (val) {
      this.scale = val
    }
  },
  computed: {
    eleStyle () {
      return {
        'top': this.styleData.top + 'px',
        'left': this.styleData.left + 'px',
        'z-index': this.styleData['zindex'],
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
    },
    pageScale () {
      return this.$store.state.page.scale
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
  &.design:hover {
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
    z-index: 99999;
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
  .elmentBox {
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    }
}
.selected{
  border: 1px dashed aqua;
}
</style>
