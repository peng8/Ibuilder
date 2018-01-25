<template>
  <div>
    <div class="field">
      <label class="label">显示器宽度</label>
      <div class="control">
        <input class="input" type="text" v-model="width">
      </div>
    </div>
    <div class="field">
      <label class="label">显示器高度</label>
      <div class="control">
        <input class="input" type="text" v-model="height">
      </div>
    </div>
    <div class="field">
      <label class="label">缩放比</label>
      <div class="control">
        <input class="input" type="text" v-model="scale" disabled>
      </div>
    </div>
    <div class="field">
      <label class="label">背景色</label>
      <div class="control">
        <input class="input" type="text" v-model="$store.state.page.backgroundColor">
      </div>
    </div>
    <div class="field">
      <label class="label">背景图</label>
      <div class="control">
        <FileUpLoad @fileChange="fileChange"></FileUpLoad>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpLoad from "@/components/FileUpLoad.vue"
export default {
  data () {
    return {
      width: '100%',
      height: '100%',
      sWidth: 0,
      sHeight: 0
    }
  },
  methods: {
    fileChange(urlData){
      this.$store.state.page.backgroundImage = urlData
    },
    init () {
      let page = document.querySelector('.canvas')
      this.sWidth = page.clientWidth - 10
      this.sHeight = page.clientHeight - 10
    }
  },
  created () {
    this.width = this.$store.state.page.width
    this.height = this.$store.state.page.height
  },
  mounted () {
    this.init()
  },
  watch: {
    width (val) {
      this.$store.commit('setPageInfo', {
        width: this.width,
        height: this.height,
        scale: this.scale,
      })
    },
    height (val) {
      this.$store.commit('setPageInfo', {
        width: this.width,
        height: this.height,
        scale: this.scale,
      })
    },
  },
  computed: {
    scale () {
      let scale = 1
      let width = parseInt(this.width)
      let height = parseInt(this.height)
      let page = document.querySelector('.canvas-content')
      if ((this.width == '100%' && this.height == '100%') || typeof this.sWidth !== 'number' || this.sWidth === 0) {
        return scale
      }
      if (width > this.sWidth) {
        scale = this.sWidth / width
        width = this.sWidth
        height = this.height * scale
      }
      if (height > this.sHeight) {
        scale = scale * this.sHeight / height
        height = this.sHeight
        width = this.width * scale
      }
      page.style.width = width + 'px'
      page.style.height = height + 'px'
      return scale.toFixed(2)
    }
  },
  components:{
    FileUpLoad,
  }
};
</script>

<style lang="less" scoped>

</style>
