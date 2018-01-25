<template>
  <div>
    <div class="field is-horizontal">
      <button class="button is-small" @click="delel">删除该元素</button>
    </div>
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
        <label class="label">X坐标</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input is-small" type="number" v-model.number="$store.state.editorData.top">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">Y坐标</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input is-small" type="number" v-model.number="$store.state.editorData.left">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">宽度</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input class="input is-small" type="number" v-model.number="$store.state.editorData.width">
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
            <input class="input is-small" type="number" v-model.number="$store.state.editorData.height">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label">图层</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control" @click="operateLayer">
            <a class="forward button is-small">
              ↑
            </a>
            <a class="top button is-small">
              top
            </a>
            <a class="backward button is-small">
              ↓
            </a>
            <a class="bottom button is-small">
              bottom
            </a>
          </div>
        </div>
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
    operateLayer(event) {
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
.label {
  width: 50px;
}
</style>
