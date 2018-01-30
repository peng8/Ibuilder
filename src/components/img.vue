<template>
  <ui-element :comData="comData" v-if="comData" :editable="editable">
    <img :src="imgSrc" alt="" :style="eleStyle">
  </ui-element> 
</template>

<script>
import queryString from "@/utils/queryString.js"
export default {
  props: {
    comData: {
    
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    eleStyle: function() {
      let style = {
        'width': '100%',
        'height': '100%'
      }
      if (this.comData && this.comData.s) {
        for(let key in this.comData.s){
          let val = this.comData.s[key]
          if(key === 'rotate'){
            style['transform'] = 'rotate(' + val + 'deg)'
            continue
          }
          style[key] = val
        }
      }
      return style
    },
    imgSrc(){
      return this.comData.src + '?accessToken=' + queryString("accessToken")
    }
  }
}
</script>

<style lang='less' scoped>
img {
  width: 100%;
  height: 100%;
}
</style>
