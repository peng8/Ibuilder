<template>
  <div>
    <attr-editor></attr-editor>
    <div class="subEditor">
      <div class="field">
        <label class="label">背景图片</label>
        <div class="control">
          <FileUpLoad @urlChange="fileChange"></FileUpLoad>
        </div>
      </div>
      <div class="field">
        <label class="label">背景色</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['background-color']">
        </div>
      </div>
      <div class="field">
        <label class="label">透明度</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['opacity']">
        </div>
      </div>
      <div class="field">
        <label class="label">内边距</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['padding']">
        </div>
      </div>
      <div class="field">
        <label class="label">内部对齐方式</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['justify-content']">
        </div>
      </div>
      <div class="field">
        <label class="label">边框样式</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['border-style']">
        </div>
      </div>
      <div class="field">
        <label class="label">边框大小</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['border-width']">
        </div>
      </div>
      <div class="field">
        <label class="label">边框颜色</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['border-color']">
        </div>
      </div>
      <div class="field">
        <label class="label">边框圆角大小</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['border-radius']">
        </div>
      </div>
      <div class="field">
        <label class="label">字体</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['font-family']">
        </div>
      </div>
      <div class="field">
        <label class="label">字号</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['font-size']">
        </div>
      </div>
      <div class="field">
        <label class="label">字体粗细</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['font-weight']">
        </div>
      </div>
      <div class="field">
        <label class="label">字体颜色</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s['color']">
        </div>
      </div>
      <div class="field">
        <label class="label">阴影颜色</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s.boxShadow.color">
        </div>
      </div>

      <div class="field">
        <label class="label">阴影大小</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s.boxShadow.radius">
        </div>
      </div>
      <div class="field">
        <label class="label">阴影方向</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s.boxShadow.position">
        </div>
      </div>
      <div class="field">
        <label class="label">阴影模糊</label>
        <div class="control">
          <input class="input" type="text" v-model="$store.state.editorData.s.boxShadow.blur">
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
