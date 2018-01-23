<template>
  <ui-element @onmove="move" :comData="comData">
    {{comData.text}}
  </ui-element>  
</template>

<script>
export default {
  props: {
    comData: {

    },
  },
  methods: {
    move(top){
      console.log(top)
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style lang="less" scoped>

</style>
