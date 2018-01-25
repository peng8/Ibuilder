<template>
  <div>
    <div class="form-title">操作面板</div>

    <form-item-title :title="'基本'"></form-item-title>

    <div class="field-wrap">
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
  methods: {
    fileChange(urlData) {
      this.$store.state.page.backgroundImage = urlData
    }
  },
  components: {
    FileUpLoad,
    formItemTitle
  }
};
</script>

<style lang="less" scoped>
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
