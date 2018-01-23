<template>
  <div>
    <div class="field">
      <label class="label">文本</label>
      <div class="control">
        <input class="input" type="text" v-model="$store.state.editorData.text">
      </div>
    </div>
    <div class="field">
      <label class="label">X坐标</label>
      <div class="control">
        <input class="input" type="number" v-model.number="$store.state.editorData.top">
      </div>
    </div>
    <div class="field">
      <label class="label">Y坐标</label>
      <div class="control">
        <input class="input" type="number" v-model.number="$store.state.editorData.left">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    
  },
  data(){
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

</style>
