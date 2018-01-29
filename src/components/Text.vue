<template>
  <ui-element :comData="comData">
    <div :style="eleStyle" class="text-wrap">
      {{comData.text}}
      <iframe class="iframe" v-show="iframeUrl" :src="iframeUrl" frameborder="0"></iframe>
      <div class="hover" v-if=""></div>
    </div>
  </ui-element>
</template>

<script>
  export default {
    props: {
      comData: {

      },
    },
    data() {
      return {
        iframeUrl: ''
      }
    },
    methods: {

    },
    computed: {
      eleStyle: function () {

        let style = {
          'width': '100%',
          'height': '100%'
        }

        for (let key in this.comData.s) {
          let val = this.comData.s[key]

          if (key === 'boxShadow') {
            style['box-shadow'] = '' + (val.color || '#fff') + ' ' + (val.position || '0 0') + ' ' + (val.blur || '0') +
              ' ' + (val.radius || '0')
            continue
          } else if (key === 'iframe-url') {
            this.iframeUrl = val
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
  .text-wrap {
    position: relative;
    display: flex;
    word-wrap: break-word;
    word-break: normal;
    overflow: hidden;
  }
  .iframe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .hover{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

</style>
