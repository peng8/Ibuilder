<template>
  <div class="page">
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
    background:{
      
    },
    comData:{
      type: Object
    }
  },
  data(){
    return {
      style: {
        'background': this.background,
      }
    }
  },
  methods: {
    
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

