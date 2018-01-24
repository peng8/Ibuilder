<template>
  <div>
    <div class="field">
      <label class="label">背景色</label>
      <div class="control">
        <input class="input" type="text" v-model="$store.state.page.backgroundColor">
      </div>
    </div>
    <div class="field">
      <label class="label">背景图</label>
      <div class="control">
        <FileUpLoad @fileChange="fileChange"></FileUpLoad>
      </div>
    </div>
  </div>
</template>

<script>
import FileUpLoad from "@/components/FileUpLoad.vue"
export default {
  methods: {
    fileChange(urlData){
      this.$store.state.page.backgroundImage = urlData
    }
  },
  components:{
    FileUpLoad,
  }
};
</script>

<style lang="less" scoped>

</style>
