<template>
  <ui-element :comData="comData" :editable = "editable">
    <div :style="eleStyle" class="input">
      <input type="text" :value="comData.text" class="input-class" :style="inputStyle">
    </div>
  </ui-element>
</template>

<script>
export default {
  props: {
    comData: {

    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  methods: {

  },
  computed: {
    eleStyle: function() {

      let style = {
        'width': '100%',
        'height': '100%'
      }

      if (this.comData.backgroundSrc) {
        style.background = 'no-repeat center/cover url(' + this.comData.backgroundSrc + ')'
      }

      for (let key in this.comData.s) {
        let val = this.comData.s[key]

        if (key === 'boxShadow' && Object.keys(val).length!==0) {
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
  outline: none;
}
</style>
