<template>
  <div>
    <attr-editor></attr-editor>
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
</template>

<script>
import AttrEditor from "@/components/AttrEditor.vue"
export default {
  components: {
    AttrEditor,
  },
  created () {
    console.log(this.$store.state.editorData)
  }
}
</script>

<style lang="less" scoped>

</style>
