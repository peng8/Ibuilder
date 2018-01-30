<template>
  <div class="wrap">
    <div class="title">页面列表</div>
    <ul class="lists">
      <li v-for="(page,index) in $store.state.allPageList">
        <span>{{page.title}}</span>
        <button class="button is-small" @click="copy(page)">复制</button>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    methods: {
      copy(page) {
        this.$store.state.copyPage = page
      }
    }
  }

</script>

<style lang="less" scoped>
  .wrap {
    margin-top: 10px;

    .title {
      margin: 0 -10px;
      padding: 5px 10px;
      background-color: #f6f9fa;
      font-size: 15px;
      font-weight: bold;
    }

    .lists {
      margin: 0 -10px;

      li {
        padding: 10px 15px;
        border-bottom: 1px solid #f5f5f5;

        .button{
          float: right;
        }
      }

      li:first-child {
        border-top: 1px solid #f5f5f5;
      }
    }
  }
</style>
