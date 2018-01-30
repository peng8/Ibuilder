<template>
  <div>

    <form-item-title :title="'操作元素'"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal">
        <div class="control">
          <a class="forward button is-small" @click="delel">
            删除该元素
          </a>
          <a class="top button is-small" @click="copyel">
            复制元素
          </a>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="control" @click="operateLayer">
          <a class="forward button is-small">
            上移一层
          </a>
          <a class="top button is-small">
            置顶
          </a>
          <a class="backward button is-small">
            下移一层
          </a>
          <a class="bottom button is-small">
            置底
          </a>
        </div>
      </div>
    </div>

    <form-item-title :title="'基本信息'"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">X坐标</label>
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
          <label class="label">Y坐标</label>
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
    </div>

    <form-item-title :title="'阴影'" v-if="$store.state.editorData.s.boxShadow"></form-item-title>
    <div class="field-wrap" v-if="$store.state.editorData.s.boxShadow">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">阴影颜色</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="color" v-model="$store.state.editorData.s.boxShadow.color">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">阴影大小</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s.boxShadow.radius">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">阴影方向</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s.boxShadow.position">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">阴影模糊</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s.boxShadow.blur">
            </div>
          </div>
        </div>
      </div>
    </div>

    <form-item-title :title="'边框'"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">边框样式</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['border-style']">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">边框大小</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['border-width']">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">边框颜色</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="color" v-model="$store.state.editorData.s['border-color']">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">圆角大小</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['border-radius']">
            </div>
          </div>
        </div>
      </div>
    </div>

    <form-item-title :title="'对齐方式'" v-if="$store.state.editorData.s['justify-content'] || $store.state.editorData.s['align-items']"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal" v-if="$store.state.editorData.s['justify-content']">
        <div class="field-label is-small">
          <label class="label">横向</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['justify-content']">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" v-if="$store.state.editorData.s['align-items']">
        <div class="field-label is-small">
          <label class="label">纵向</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['align-items']">
            </div>
          </div>
        </div>
      </div>
    </div>

    <form-item-title :title="'其他'"></form-item-title>
    <div class="field-wrap">
      <div class="field is-horizontal" v-if="typeof $store.state.editorData['src'] === 'undefined'">
        <div class="field-label is-small">
          <label class="label">背景图片</label>
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
          <label class="label">背景色</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="color" v-model="$store.state.editorData.s['background-color']">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">透明度</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <Slider class="is-small" v-model="$store.state.editorData.s['opacity']"></Slider>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" v-if="typeof $store.state.editorData['src'] !== 'undefined'">
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
      <div class="field is-horizontal" v-if="$store.state.editorData.s['padding']">
        <div class="field-label is-small">
          <label class="label">内边距</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="input is-small" type="text" v-model="$store.state.editorData.s['padding']">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import formItemTitle from './formItemTitle'
import FileUpLoad from "@/components/FileUpLoad.vue"
import Slider from "@/components/Slider.vue"
export default {
  props: {

  },
  methods: {
    operateLayer(event) {
      let btnType = event.target.getAttribute('class').split(' ')[0]
      this.$store.commit('resetLayer', btnType)
    },
    delel() {
      this.$store.commit('delEl')
    },
    copyel() {
      this.$store.commit('copyEl')
    },
    fileChange(val) {
      this.$store.state.editorData.backgroundSrc = val
    }
  },
  components: {
    formItemTitle,
    FileUpLoad,
    Slider
  }
}
</script>

<style lang='less' scoped>
.label {
  width: 50px;
  font-weight: initial;
}

.form-title {
  text-align: center;
  margin-bottom: 10px;
}

.field-wrap {
  padding: 0.75rem 0;
}
</style>
