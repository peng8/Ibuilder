<template>
  <div class="baseEle"
       :style="eleStyle"
        @mousedown="mousedown"
        @click.stop="selectEl"
        :class="{selected: comData.isSelected}">
    <slot></slot>
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
    }
  },
  methods: {
    mousedown(downEvent) {
      let ele = this.comData
      let startY = downEvent.clientY
      let startX = downEvent.clientX
      let startTop = ele["top"]
      let startLeft = ele["left"]
      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        //todo: 这里也可以直接赋值改变comData,相当于不经过commit直接修改了值
        //todo: 大量移动操作，频繁提交，可能会有问题
        //ele["top"] = currY - startY + startTop
        //ele["left"] = currX - startX + startLeft
        this.$store.commit("setPosition", {
          top: currY - startY + startTop,
          left: currX - startX + startLeft,
          uuid: ele.uuid,
        })
      }
      let up = () => {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
        //this.$store.commit("setPosition", ele)
      };
      document.addEventListener("mousemove", move)
      document.addEventListener("mouseup", up)
    },
    selectEl(){
      this.$store.commit('setSelectedEl', this.comData.uuid)
      //this.comData.isSelected = true
      console.log(this.comData)
    }
  }
}
</script>

<style lang="less" scoped>
.baseEle {
  position: absolute;
  user-select: none;
  &:hover {
    border: 1px solid #8799A6;
    cursor: move; 
  }
}
.selected{
  border: 1px dashed aqua;
}
</style>
