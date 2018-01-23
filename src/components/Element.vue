<template>
  <div class="baseEle"
       :style="eleStyle"
        @mousedown="mousedown"
        @click.stop="selectEl"
        :class="{selected: comData ? comData.isSelected: ''}">
    <slot></slot>
    <div class="operate" v-if="comData && comData.isSelected" @mousedown="zoomElement">
      <div class="circleArea tl operate_btn"></div>
      <div class="circleArea bl operate_btn"></div>
      <div class="circleArea tr operate_btn"></div>
      <div class="circleArea br operate_btn"></div>
      <div class="rectangleArea t operate_btn" :style="tBtnStyle"></div>
      <div class="rectangleArea l operate_btn" :style="lBtnStyle"></div>
      <div class="rectangleArea r operate_btn" :style="rBtnStyle"></div>
      <div class="rectangleArea b operate_btn" :style="bBtnStyle"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comData:{

    },
  },
  data(){
    return {
      mouseEventType: 'zoom', // 缩放事件， 拖动事件drag
      startPos: {
        x: 0,
        y: 0
      },
      currentItem: ''
    }
  },
  computed: {
    eleStyle: function(){
      return {
        'top': this.comData['top'] + 'px',
        'left': this.comData['left'] + 'px',
        'z-index': this.comData['z-index'],
        'width': this.comData['width'] + 'px',
        'height': this.comData['height'] + 'px', 
      }
    },
    tBtnStyle () {
      return {
        'left': this.comData['width'] / 2 - 5 + 'px'
      }
    },
    bBtnStyle () {
      return {
        'left': this.comData['width'] / 2 - 5 + 'px'
      }
    },
    lBtnStyle () {
      return {
        'top': this.comData['height'] / 2 - 5 + 'px'
      }
    },
    rBtnStyle () {
      return {
        'top': this.comData['height'] / 2 - 5 + 'px'
      }
    }
  },
  methods: {
    // mousedown(downEvent) {
    //   let ele = this.comData
    //   let startY = downEvent.clientY
    //   let startX = downEvent.clientX
    //   let startTop = ele["top"]
    //   let startLeft = ele["left"]
    //   let move = moveEvent => {
    //     let currX = moveEvent.clientX
    //     let currY = moveEvent.clientY
    //     //todo: 这里也可以直接赋值改变comData,相当于不经过commit直接修改了值
    //     //todo: 大量移动操作，频繁提交，可能会有问题
    //     //ele["top"] = currY - startY + startTop
    //     //ele["left"] = currX - startX + startLeft
    //     this.$store.commit("setPosition", {
    //       top: currY - startY + startTop,
    //       left: currX - startX + startLeft,
    //       uuid: ele.uuid,
    //     })
    //   }
    //   let up = () => {
    //     document.removeEventListener("mousemove", move)
    //     document.removeEventListener("mouseup", up)
    //     //this.$store.commit("setPosition", ele)
    //   };
    //   document.addEventListener("mousemove", move)
    //   document.addEventListener("mouseup", up)
    // },
    selectEl(){
      this.$store.commit('setSelectedEl', this.comData.uuid)
      //this.comData.isSelected = true
      // console.log(this.comData)
    },
    mousedown (event) {
      this.mouseEventType = 'drag'
      this.onMouseDown(event)
    },
    zoomElement (event) {
      this.mouseEventType = 'zoom'
      event.stopImmediatePropagation()
      this.onMouseDown(event)
    },
    onMouseDown (event) {
      this.startPos.x = event.clientX
      this.startPos.y = event.clientY
      this.currentItem = event.target.getAttribute('class').split(' ')[1]
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
      if (this.mouseEventType === 'zoom') {
        this.resetPosition(width, height)
      } else {
        this.setPosition(width, height)
      }
      this.startPos.x = newPos.x
      this.startPos.y = newPos.y
    },
    onMouseUp () {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    },
    /** @description 缩放时重置属性 */
    resetPosition (width, height) {
      let newWidth = ''
      let newHeigth = ''
      let newTop = ''
      let newleft = ''
      switch (this.currentItem) {
        case 'tl':
          newWidth = this.comData.width - width
          newHeigth = oldHeight - height
          newTop = oldTop + height
          newleft = oldLeft + width
          break;
        case 'tr':
          newWidth = this.comData.width + width
          newHeigth = oldHeight - height
          newTop = oldTop - height
          break;
        case 'bl':
          newWidth = this.comData.width - width
          newHeigth = oldHeight + height
          newleft = oldLeft + width
          break;
        case 'br':
          newWidth = this.comData.width + width
          newHeigth = oldHeight + height
          break;
        case 't':
          newHeigth = oldHeight - height
          newTop = oldTop + height
          break;
        case 'b':
          newHeigth = oldHeight + height
          break;
        case 'l':
          newWidth = this.comData.width - width
          newleft = oldLeft + width
          break;
        case 'r':
          newWidth = this.comData.width + width
          break;
        default:
          break;
      }
      this.$store.commit('setPosition', {
        top: this.comData['top'] + height,
        left: this.comData['left'] + width,
        uuid: this.comData.uuid,
      })
    },
    /** @description 鼠标拖动时重置属性 */
    setPosition (width, height) {
      this.$store.commit('setPosition', {
        top: this.comData['top'] + height,
        left: this.comData['left'] + width,
        uuid: this.comData.uuid,
      })
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
