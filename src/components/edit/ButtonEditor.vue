<template>
  <div>
    <attr-editor></attr-editor>
    <div class="subEditor">
      <form-item-title :title="'文字'"></form-item-title>
      <div class="field-wrap">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">文本</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.text">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">字体</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.s['font-family']">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">字号</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.s['font-size']">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">字体粗细</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.s['font-weight']">
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">字体颜色</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="color" v-model="$store.state.editorData.s['color']">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttrEditor from "@/components/AttrEditor.vue"
import FileUpLoad from "@/components/FileUpLoad.vue"
import formItemTitle from '../formItemTitle'
export default {
  components: {
    AttrEditor,
    FileUpLoad,
    formItemTitle
  },
  methods: {
    fileChange(val) {
      this.$store.state.editorData.backgroundSrc = val
    }
  }
}
</script>

<style lang="less" scoped>
.subEditor {
  margin-top: 0.75rem;
}
</style>
