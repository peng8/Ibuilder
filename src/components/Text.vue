<template>
  <ui-element :comData="comData">
    <div :style="eleStyle" class="text-wrap">
      {{comData.text}}
    </div>
  </ui-element>
</template>

<script>
export default {
  props: {
    comData: {

    },
  },
  methods: {

  },
  computed: {
    eleStyle: function() {

      let style = {
        'width': '100%',
        'height': '100%'
      }

      for (let key in this.comData.s) {
        let val = this.comData.s[key]

        if (key === 'boxShadow') {
          style['box-shadow'] = '' + (val.color || '#fff') + ' ' + (val.position || '0 0') + ' ' + (val.blur || '0') + ' ' + (val.radius || '0')
          continue
        }
        style[key] = val
      }

      return style
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.text-wrap{
  display: flex;
}
</style>
