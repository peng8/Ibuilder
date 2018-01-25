<template>
  <div class="main-container">
    <div class="editor-header">
      <div class="header-left">
        <span class="icon logo">
          <i class="fas fa-cubes"></i>
        </span>
        <span class="text">UI-Builder</span>
        <span class="tag is-light">
          V0.1
        </span>
      </div>
      <div class="header-right">
        <a class="button is-primary is-small">
          <span class="icon">
            <i class="fas fa-eye"></i>
          </span>
          <span>预览</span>
        </a>
        <a class="button is-primary is-small">
          <span class="icon">
            <i class="fas fa-save"></i>
          </span>
          <span>保存</span>
        </a>
        <a class="button is-primary is-small">
          <span class="icon">
            <i class="fas fa-undo"></i>
          </span>
          <span>上一步</span>
        </a>
        <a class="button is-primary is-small">
          <span class="icon">
            <i class="fas fa-redo"></i>
          </span>
          <span>下一步</span>
        </a>
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
        <ui-img></ui-img>
      </div>
      <div class="edit-panel">
        <component :is="$store.state.editorData.name + 'Editor'"></component>
      </div>
    </div>
  </div>
</template>

<script>
import AttrEditor from "@/components/AttrEditor.vue"
import NewEl from "@/components/NewEl.vue"
import Page from "@/model/Page.js";

export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  methods: {
  
  },
  components: {
    AttrEditor,
    NewEl,
  },
  created(){
    this.$store.commit("addPage", new Page({
      elements: [],
    }))
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
    height: 40px;
    background-color: hsl(0, 0%, 21%);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header-left{
      margin-left: 10px;
      .logo{
        color: hsl(171, 100%, 41%);
        font-size: 28px;
        vertical-align: middle;
        margin-right: 5px;
      }
      .text{
        font-size: 18px;
        font-weight: bold;
        color: white;
        margin-right: 5px;
      }
      .tag{
        height: 16px;
      }
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
      overflow-y: auto;
    }
  }
}
</style>
