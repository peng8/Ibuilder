<template>
  <div>
    <attr-editor></attr-editor>
    <div class="subEditor">
      <div class="field">
        <label class="label">修改图片</label>
        <div class="control">
          <FileUpLoad @urlChange="fileChange"></FileUpLoad>
        </div>
      </div>
      <div class="field">
        <label class="label">透明度</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['opacity']">
        </div>
      </div>
      <div class="field">
        <label class="label">旋转</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['rotate']">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttrEditor from "@/components/AttrEditor.vue"
import FileUpLoad from "@/components/FileUpLoad.vue"
export default {
  components: {
    AttrEditor,
    FileUpLoad
  },
  methods: {
    fileChange (val) {
      this.$store.state.editorData.src = val
    }
  }
}
</script>

<style lang="less" scoped>
.subEditor {
  margin-top: 0.75rem;
}
</style>
