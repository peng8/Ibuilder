<template>
  <div class="page" @click.self.stop.prevent="selectPage" :style="pageStyle">
    <component 
      v-for="(item, index) in comData.elements" 
      :is="item.name"
      :key="index"
      :com-data="item">
    </component>
  </div>
</template>

<script>
export default {
  props:{
    comData:{
      type: Object
    }
  },
  computed: {
    pageStyle(){
      return {
        'backgroundColor': this.comData.backgroundColor,
        'backgroundImage': this.comData.backgroundImage,
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
      console.log("page")
      this.$store.commit("setSelectedPage")
    }
  }
}
</script>

<style scoped lang="less">
.page{
  width: 100%;
  height: 100%;
}
.img{
  height: 100%;
}
</style>

