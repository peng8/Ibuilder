<template>
  <ui-element :comData="comData" :editable="editable">
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
      editable: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      eleStyle: function () {

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
            style['box-shadow'] = '' + (val.color || '#fff') + ' ' + (val.position || '0 0') + ' ' + (val.blur || '0') +
              ' ' + (val.radius || '0')
            continue
          }
          style[key] = val
        }

        return style
      }
    },
    data() {
      return {
        eleClass: []
      }
    }
  }

</script>

<style lang="less" scoped>


</style>
