<template>
  <div class="main-container">
    <div class="editor-header">
      <div class="header-left">
        <span class="tag is-light">UI-Builder V0.1</span>
      </div>
      <div class="header-right">
        <a class="button is-primary">预览</a>
        <a class="button is-primary">保存</a>
        <a class="button is-primary">上一步</a>
        <a class="button is-primary">下一步</a>
      </div>
    </div>
    <div class="editor-content">
      <div class="page-view">
        <new-el></new-el>
      </div>
      <div class="canvas">
        <div class="canvas-content">
          <component :is="$store.state.page.name" :com-data="$store.state.page"></component>
        </div>
      </div>
      <div class="edit-panel">
        <!-- <input type="file" @change="fileChange"> -->
        <attr-editor></attr-editor>
      </div>
    </div>
  </div>
</template>

<script>
import AttrEditor from "@/components/AttrEditor.vue"
import NewEl from "@/components/NewEl.vue"
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
    fileChange(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        this.$store.commit("setBackGround", e.target.result);
      };
      reader.readAsDataURL(file);
    },
  },
  components: {
    AttrEditor,
    NewEl,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.main-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fdfdfd;
  .editor-header {
    height: 50px;
    background-color: hsl(0, 0%, 21%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left{
      margin-left: 10px;
    }
    .header-right{
      a{
        margin-right: 10px;
      }
    }
  }
  .editor-content {
    flex: 1;
    display: flex;
    .page-view {
      width: 70px;
      height: 100%;
      background-color: black;
      color: white;
      opacity: 0.7;
    }
    .canvas {
      flex: 1;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .canvas-content{
        position: relative;
        height: 95%;
        width: 95%;
        // height: 1080px;
        // width: 1920px;
        // transform-origin: left top;
        // transform: scale(0.6);
        border: 1px solid hsl(0, 0%, 21%);
      }
    }
    .edit-panel {
      width: 300px;
      height: 100%;
      border: 1px solid #c6c6c6;
      padding: 10px;
    }
  }
}
</style>
