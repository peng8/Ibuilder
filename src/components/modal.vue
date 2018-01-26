<template>
  <div class="modal-container">
    <div class="preview-content" :style="canvasStyle">
      <div class="preview" :style="innerStyle">
        <div class="control close-btn" @click="close">
          <a class="button">
            X
          </a>
        </div>
        <component :is="$store.state.page.name" :com-data="pageData"></component>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal',
    data () {
      return {
        canvasStyle:{
          'width': '100%',
          'height': '100%'
          // 'transform': 'scale(1)'
        },
        innerStyle:{
          'width': '100%',
          'height': '100%',
          'transform': 'scale(1)'
        },
        sWidth: 0,
        sHeight: 0,
        pageWidth: 0,
        pageHeight: 0,
        pageData: {},
        scale: 1,
        pageData: {}
      }
    },
    methods: {
       getScale () {
        let scale = 1
        let width = parseInt(this.pageWidth)
        let height = parseInt(this.pageHeight)
        if ((this.pageWidth == '100%' && this.pageHeight == '100%') || typeof this.sWidth !== 'number' || this.sWidth === 0) {
          return scale
        }
        if (width > this.sWidth) {
          scale = this.sWidth / width
          width = this.sWidth
          height = height * scale
        }
        if (height > this.sHeight) {
          scale = scale * this.sHeight / height
          height = this.sHeight
          width = width * scale
        }
        this.scale = scale.toFixed(2)
      },
      close () {
        this.pageData.preview = false
        this.$emit('closeModal', false)
      }
    },
    mounted () {
      let page = document.querySelector('.preview-content')
      this.sWidth = page.clientWidth - 20
      this.sHeight = page.clientHeight - 20
      this.pageWidth = this.$store.state.page.width
      this.pageHeight = this.$store.state.page.height
      this.pageData = this.$store.state.page
      this.getScale()
      this.canvasStyle = {
        'width': this.pageWidth * this.scale + 'px',
        'height': this.pageHeight * this.scale + 'px',
      }
      this.innerStyle = {
        'width': this.pageWidth + 'px',
        'height': this.pageHeight + 'px',
        'transform': 'scale(' + this.scale + ')'
      }
      this.pageData = this.$store.state.page
      this.pageData.preview = true
    },
    watch: {
      scale (val) {
        this.canvasStyle = {
          'width': this.pageWidth * this.scale + 'px',
          'height': this.pageHeight * this.scale + 'px',
        }
        this.innerStyle = {
          'width': this.pageWidth + 'px',
          'height': this.pageHeight + 'px',
          'transform': 'scale(' + this.scale + ')'
        }
      }
    }
  }
</script>
<style lang="less">
  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(00,00,00,.8);
    .preview-content {
      position: absolute;
      background: #fff;
      width: 100px;
      height: 100px;
      top: 0;
      left: 0;
      right:0;
      bottom:0;
      margin: auto;
      overflow: hidden;
      transform-origin: center;
      .control.close-btn {
        text-align: right;
      }
      .preview {
        position: absolute;
        top: 0;
        left: 0;
        transform-origin: 0 0;
      }
    }
  }
</style>

