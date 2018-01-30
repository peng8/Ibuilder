<template>
  <div>
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
      </div>

      <form-item-title :title="'事件'"></form-item-title>
      <div class="field-wrap">
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">跳转</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <div class="select is-small">
                  <select v-model="$store.state.editorData.goto">
                    <option v-for="(item, index) in $store.state.allPageList" :key="index" :value="item.id">
                      {{item.title}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-small">
            <label class="label">弹窗</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input class="input is-small" type="text" v-model="$store.state.editorData.modal">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <attr-editor></attr-editor>
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
