<template>
  <div class="page" @click.self.stop.prevent="selectPage" :style="pageStyle">
    <component 
      v-for="(item, index) in comData.elements" 
      :is="item.name"
      :key="index"
      :isPreview="isPreview"
      :com-data="item">
    </component>
  </div>
</template>

<script>
import queryString from "@/utils/queryString.js"
export default {
  props:{
    comData:{
      type: Object
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    pageStyle(){
      return {
        'backgroundColor': this.comData.backgroundColor,
        'backgroundImage': 'url(' + this.comData.backgroundImage + '?accessToken=' + queryString("accessToken") + ')',
        'backgroundSize': "cover",
      }
    }
  },
  data(){
    return {
      
    }
  },
  methods: {
    selectPage(){
      this.$store.commit("setSelectedPage")
    }
  },
  mounted () {
    this.selectPage()
  }
}
</script>

<style scoped lang="less">
.page{
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
}
.img{
  height: 100%;
}
</style>
