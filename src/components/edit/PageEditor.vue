<template>
  <div>
    <div class="form-title">操作面板</div>

    <form-item-title :title="'页面信息'"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">宽度</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="width">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">高度</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="height">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">缩放比</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="scale" disabled>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">背景色</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="color" v-model="$store.state.page.backgroundColor">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">背景图</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <FileUpLoad @fileChange="fileChange"></FileUpLoad>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import formItemTitle from '../formItemTitle'
import FileUpLoad from "@/components/FileUpLoad.vue"
export default {
  data() {
    return {
      width: '100%',
      height: '100%',
      sWidth: 0,
      sHeight: 0
    }
  },
  methods: {
    fileChange(urlData) {
      this.$store.state.page.backgroundImage = urlData
    },
    init() {
      let page = document.querySelector('.canvas')
      this.sWidth = page.clientWidth - 20
      this.sHeight = page.clientHeight - 20
    }
  },
  created() {
    this.width = this.$store.state.page.width
    this.height = this.$store.state.page.height
  },
  mounted() {
    this.init()
  },
  watch: {
    width(val) {
      this.$store.commit('setPageInfo', {
        width: this.width,
        height: this.height,
        scale: this.scale,
      })
    },
    height(val) {
      this.$store.commit('setPageInfo', {
        width: this.width,
        height: this.height,
        scale: this.scale,
      })
    },
  },
  computed: {
    scale() {
      let scale = 1
      let width = parseInt(this.width)
      let height = parseInt(this.height)
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
      return scale.toFixed(2)
    }
  },
  components: {
    FileUpLoad,
    formItemTitle
  }
};
</script>

<style lang="less" scoped>

</style>
