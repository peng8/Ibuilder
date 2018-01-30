<template>
  <ui-element :comData="comData" v-if="comData" :isPreview="isPreview">
    <img :src="comData.src" alt="" :style="eleStyle">
  </ui-element> 
</template>

<script>
export default {
  props: {
    comData: {
    
    },
    isPreview: {
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
