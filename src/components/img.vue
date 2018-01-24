<template>
  <ui-element :comData="comData">
    <img src="../assets/logo.png" alt="">
  </ui-element> 
</template>

<script>
export default {
  props: {
    comData: {
    
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
