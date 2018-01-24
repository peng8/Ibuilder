<template>
  <ui-element :comData="comData">
    <button :style="eleStyle" :class="eleClass" class="button">
      {{comData.text}}
    </button>
  </ui-element>
</template>

<script>
export default {
  props: {
    comData: {

    },
  },
  computed: {
    eleStyle: function() {

      let style = {
        'width': '100%',
        'height': '100%'
      }

      for(let key in this.comData.s){
        style[key] = this.comData.s[key]
      }

      return style
    }
  },
  methods: {

  },
  data() {
    return {
      eleClass:[]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
