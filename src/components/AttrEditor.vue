<template>
  <div>
    <div class="field">
      <button class="button" @click="delel">删除该元素</button>
    </div>
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
    <div class="field">
      <label class="label">宽度</label>
      <div class="control">
        <input class="input" type="number" v-model.number="$store.state.editorData.width">
      </div>
    </div>
    <div class="field">
      <label class="label">高度</label>
      <div class="control">
        <input class="input" type="number" v-model.number="$store.state.editorData.height">
      </div>
    </div>
    <div class="field">
      <label class="label">图层</label>
      <div class="control" @click="operateLayer">
        <a class="forward button">
          ↑
        </a>
        <a class="top button">
          top
        </a>
        <a class="backward button">
          ↓
        </a>
        <a class="bottom button">
          bottom
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {

    }
  },
  methods: {
    operateLayer (event) {
      let btnType = event.target.getAttribute('class').split(' ')[0]
      this.$store.commit('resetLayer', btnType)
    },
    delel() {
      this.$store.commit('delEl')
    }
  }
}
</script>

<style lang='less' scoped>

</style>
