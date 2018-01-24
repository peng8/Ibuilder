<template>
  <ui-element :comData="comData">
    <div :style="eleStyle">
      <input type="text" v-model="comData.text" class="input-class" :style="inputStyle">
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

        if (key === 'input') {
          this.inputStyle = val
          continue
        }

        style[key] = val
      }

      return style
    }
  },
  data() {
    return {
      inputStyle: {}
    }
  }
}
</script>

<style lang="less" scoped>
.input-class {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
}
</style>
