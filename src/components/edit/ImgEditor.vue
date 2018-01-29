<template>
  <div>
    <attr-editor></attr-editor>
    <div class="subEditor">
      <form-item-title :title="'页面信息'"></form-item-title>
      <div class="field-wrap">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">修改图片</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <FileUpLoad @urlChange="fileChange"></FileUpLoad>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">旋转</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.s['rotate']">
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
      this.$store.state.editorData.src = val
    }
  }
}
</script>

<style lang="less" scoped>

</style>
