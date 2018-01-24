<template>
  <div class="file has-name">
    <label class="file-label">
      <input class="file-input" type="file" name="file" @change="fileUpLoad">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-upload"></i>
        </span>
        <span class="file-label">
          点击上传
        </span>
      </span>
      <span class="file-name">
        {{fileName}}
      </span>
    </label>
  </div>
</template>

<script>
export default {
  props: {

  },
  data(){
    return {
      fileName: "",
    }
  },
  methods: {
    fileUpLoad() {
      var input = document.querySelector('input[type="file"]');
      var data = new FormData();
      data.append("file", input.files[0]);
      this.axios.post("/fileManager/file/upload", data)
      .then((res) => {
        let imgId = res.data[0].fileId
        let url = res.config.baseURL + "/fileManager/file/render/" + imgId + "?accessToken=" + res.config.headers.accessToken
        let urlData = "url(" + url + ")"
        console.log(url)
        console.log(urlData)
        this.$emit("fileChange", urlData)
        this.fileName = input.files[0].name
      })
    }
  }
};
</script>

<style>

</style>
