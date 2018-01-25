<template>
  <div class="form-item-title">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '无标题'
    }
  }
}
</script>

<style lang="less" scoped>
.form-item-title {
  margin: 0 -10px;
  padding: 5px 10px;
  background-color: #efefef;
  font-size: 15px;
  font-weight: bold;
}
</style>
