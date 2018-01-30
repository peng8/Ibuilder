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
        <a class="button is-primary is-small" @click="preview">
          <span class="icon">
            <i class="fas fa-eye"></i>
          </span>
          <span>预览</span>
        </a>
        <a class="button is-primary is-small" @click="save">
          <span class="icon">
            <i class="fas fa-save"></i>
          </span>
          <span>保存</span>
        </a>
        <a class="button is-primary is-small" @click="undo">
          <span class="icon">
            <i class="fas fa-undo"></i>
          </span>
          <span>上一步</span>
        </a>
        <a class="button is-primary is-small" @click="redo">
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
        <div class="canvas-content" :style="canvasStyle">
          <component :is="$store.state.page.name" :com-data="$store.state.page"></component>
        </div>
        <ui-img></ui-img>
      </div>
      <div class="edit-panel">
        <ul class="tab">
          <li :class="{'active': currentTab === 'tab1'}" @click="currentTab='tab1'">操作</li>
          <li :class="{'active': currentTab === 'tab2'}" @click="currentTab='tab2'">页面</li>
        </ul>
        <component v-show="currentTab === 'tab1'" class="editor-part" :is="$store.state.editorData.name + 'Editor'"></component>
        <page-list v-show="currentTab === 'tab2'"></page-list>
      </div>
    </div>
    <modal v-if="modal" @closeModal='close'></modal>
  </div>
</template>

<script>
  import AttrEditor from "@/components/AttrEditor.vue"
  import NewEl from "@/components/NewEl.vue"
  import Page from "@/model/Page.js";
  import queryString from "@/utils/queryString.js"
  import Modal from "@/components/modal.vue"
  import pageList from "@/components/pageList.vue"
  import cloneData from "@/utils/cloneData.js"
  import message from "./message.js"
  export default {
    name: "HelloWorld",
    data() {
      return {
        records: null,
        currentStep: 0,
        noWatch: false,
        pageData: null,
        scale: 1,
        modal: false,
        currentTab: 'tab1'
      };
    },
    created() {
      this.loadData()
      this.pageData = this.$store.state.page
      this.records = this.$store.state.records
    },
    mounted() {
      this.axios.get('/centaur/page/getDesignedList')
        .then((res) => {
          this.$store.state.allPageList = res.data
        })
    },
    computed: {
      canvasStyle() {
        let pageInfo = {
          'width': '95%',
          'height': '95%',
          'transform': 'scale(' + this.scale + ')'
        }
        if (this.pageWidth != '100%' && this.pageHeight != '100%') {
          pageInfo.width = parseInt(this.pageWidth || 0) + 'px'
          pageInfo.height = parseInt(this.pageHeight || 0) + 'px'
        } else if (this.pageWidth != '100%') {
          pageInfo.width = parseInt(this.pageWidth || 0) + 'px'
        } else if (this.pageWidth != '100%') {
          pageInfo.height = parseInt(this.pageHeight || 0) + 'px'
        }
        return pageInfo
      },
      pageScale() {
        return this.$store.state.page.scale
      },
      pageWidth() {
        return this.$store.state.page.width
      },
      pageHeight() {
        return this.$store.state.page.height
      }
    },
    watch: {
      pageData: {
        handler: function (val) {
          console.log(this.noWatch)
          if (this.noWatch) {
            this.noWatch = false
          } else {
            let records = this.$store.state.records
            this.$store.state.records.splice(this.currentStep + 1, records.length - this.currentStep - 1)
            this.$store.state.records.push(cloneData(val))
            this.records = this.$store.state.records
          }
        },
        deep: true
      },
      records: function (val) {
        this.currentStep = val.length - 1
      },
      pageScale(val) {
        this.scale = val
      }
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
      undo() {
        if (this.currentStep - 1 >= 0) {
          this.currentStep--
        } else {
          return
        }
        this.$store.commit('setSelectedPage')
        this.noWatch = true
        this.$store.state.page = cloneData(this.$store.state.records[this.currentStep])
        this.pageData = this.$store.state.page
      },
      redo() {
        if (this.currentStep + 1 < this.records.length) {
          this.currentStep++
        } else {
          return
        }
        this.$store.commit('setSelectedPage')
        this.noWatch = true
        this.$store.state.page = cloneData(this.$store.state.records[this.currentStep])
        this.pageData = this.$store.state.page
      },
      save() {
        var form = new FormData()
        form.append("id", queryString("id"))
        form.append("content", JSON.stringify(this.$store.state.page))
        this.axios.post('/centaur/page/design', form)
          .then((res) => {
            message.success('保存成功')
          })
          .catch((error) => {
            message.danger('保存失败')
          })
      },
      preview () {
        this.modal = true
        this.$store.state.page.preview = true
      },
      loadData() {
        this.axios.get('/centaur/page/getById?id=' + queryString('id'))
          .then((res) => {
            // console.log(res)
            // console.log(JSON.parse(res.data.content))
            let data = JSON.parse(res.data.content);
            this.$store.commit("addPage", !data ? new Page({
              elements: [],
            }) : data)
          })
          .catch((error) => {
            message.danger('数据获取失败')
          })
      },
      close(val) {
        this.modal = val
        this.$store.state.page.preview = false
      }
    },
    components: {
      AttrEditor,
      NewEl,
      Modal,
      pageList
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
      .header-left {
        margin-left: 10px;
        .logo {
          color: hsl(171, 100%, 41%);
          font-size: 28px;
          vertical-align: middle;
          margin-right: 5px;
        }
        .text {
          font-size: 18px;
          font-weight: bold;
          color: white;
          margin-right: 5px;
        }
        .tag {
          height: 16px;
        }
      }
      .header-right {
        a {
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
        overflow: hidden;
        .canvas-content {
          position: relative;
          flex-shrink: 0;
          border: 1px solid hsl(0, 0%, 21%);
        }
      }
      .edit-panel {
        width: 300px;
        height: 100%;
        border: 1px solid #f5f5f5;
        padding: 10px;
        overflow-y: auto;

        .tab {
          margin: -10px -10px 0 -10px;
          display: flex;
          justify-content: center;
          align-items: center;

          li {
            flex: 1;
            padding: 8px 5px;
            text-align: center;
            background-color: #e0e0e0;
            box-shadow: #dbdada 0px -2px 0px 0px inset;
            cursor: pointer;

            &:hover {
              font-weight: bold;
            }

            &.active {
              background-color: #fff;
              box-shadow: none;
            }
          }
        }

        .editor-part {
          margin-top: 10px;
        }
      }
    }
  }

</style>
