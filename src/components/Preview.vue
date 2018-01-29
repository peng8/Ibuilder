<template>
  <div class="preview-contianer">
    <component :is="$store.state.page.name" :com-data="pageData"></component>
  </div>
</template>
<script>
  import queryString from "@/utils/queryString.js"
  export default {
    data () {
      return {
      }
    },
    methods: {
      loadData() {
        this.axios.get('/centaur/page/getById?accessToken=utry-646862b404be11e8b2c9000c2907a862&id=810c98ff04b811e88098000c2907a862')
          .then((res) => {
            let data = JSON.parse(res.data.content);
            data.preview = true
            this.$store.commit("addPage", !data ? new Page({ elements: [], }) : data)
          })
      }
    },
    created () {
      this.loadData()
    },
    computed: {
      pageData () {
        return this.$store.state.page
      }
    }
  }
</script>
<style lang="less">
.preview-contianer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
