<template>
  <div class="main-container">
    <div class="editor-content">
      <div class="page-view" :style="pickUpElStyle">
        <new-el></new-el>
        <div class="pick-up pick-up-el" @click="pickupEl" ref="pickUpEl">
          <span class="icon" v-show="JSON.stringify(pickUpElStyle) === '{}'">
            <i class="fas fa-outdent"></i>
          </span>
          <span class="icon" v-show="JSON.stringify(pickUpElStyle) !== '{}'">
            <i class="fas fa-indent"></i>
          </span>
        </div>
      </div>
      <div class="canvas">
        <div class="canvas-content" :style="canvasStyle">
          <component :is="$store.state.page.name" :com-data="$store.state.page"></component>
        </div>
        <ui-img></ui-img>
      </div>
      <div class="edit-panel" :style="pickUpEditStyle">
        <div class="tools">
          <a class="button is-small" @click="modal=true">
            <span class="icon">
              <i class="fas fa-eye"></i>
            </span>
            <span>预览</span>
          </a>
          <a class="button is-small" @click="save">
            <span class="icon">
              <i class="fas fa-save"></i>
            </span>
            <span>保存</span>
          </a>
          <a class="button is-small" @click="undo">
            <span class="icon">
              <i class="fas fa-undo"></i>
            </span>
            <span>撤销</span>
          </a>
          <a class="button is-small" @click="redo">
            <span class="icon">
              <i class="fas fa-redo"></i>
            </span>
            <span>恢复</span>
          </a>
        </div>
        <component class="editor-part" :is="$store.state.editorData.name + 'Editor'"></component>
        <div class="pick-up pick-up-edit" @click="pickupEdit" ref="pickUpEdit">
          <span class="icon" v-show="JSON.stringify(pickUpEditStyle) === '{}'">
            <i class="fas fa-indent"></i>
          </span>
          <span class="icon" v-show="JSON.stringify(pickUpEditStyle) !== '{}'">
            <i class="fas fa-outdent"></i>
          </span>
        </div>
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
        pickUpElStyle: {},
        pickUpEditStyle: {}
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
      preview() {
        this.modal = true
        let previewPage = JSON.parse(JSON.stringify(this.$store.state.page))
        this.$store.state.previewPage = previewPage
      },
      loadData() {
        this.axios.get('/centaur/page/getById?id=' + queryString('id'))
          .then((res) => {
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
      },
      pickupEl() {
        if (Object.keys(this.pickUpElStyle).length === 0) {
          this.pickUpElStyle = {
            'position': 'fixed',
            'left': '-70px',
            'z-index': 1,
            'overflow': 'unset'
          }
          this.$refs.pickUpEl.style.display = 'flex'
        } else {
          this.pickUpElStyle = {}
          this.$refs.pickUpEl.style.display = ''
        }
      },
      pickupEdit() {
        if (Object.keys(this.pickUpEditStyle).length === 0) {
          this.pickUpEditStyle = {
            'position': 'fixed',
            'right': '-300px',
            'z-index': 1,
            'overflow': 'unset'
          }
          this.$refs.pickUpEdit.style.display = 'flex'
        } else {
          this.pickUpEditStyle = {}
          this.$refs.pickUpEdit.style.display = ''
        }
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
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #fdfdfd;

    .editor-content {
      flex: 1;
      display: flex;
      .page-view {
        width: 70px;
        height: 100%;
        color: #2c3e50;
        border-right: 1px solid #c8c7c7;
        background: #fff;
        overflow-y: auto;

        &:hover {
          .pick-up-el {
            display: flex;
          }
        }
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
          border: 1px solid #000000;
          box-shadow: #a7a7a7 0 0 20px 0px;
        }
      }
      .edit-panel {
        width: 300px;
        height: 100%;
        border-left: 1px solid #c8c7c7;
        padding: 10px;
        overflow-y: auto;
        background: #fff;

        &:hover {
          .pick-up-edit {
            display: flex;
          }
        }

        .tools {
          display: flex;
          justify-content: center;
          align-items: center;

          .button {
            margin: 3px;
          }
        }

        .tab {
          margin: 10px -10px 0 -10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .editor-part {
          margin-top: 10px;
        }
      }
    }

    .pick-up {
      width: 22px;
      height: 70px;
      top: 44%;
      position: absolute;
      display: none;
      justify-content: center;
      align-items: center;
      border: 1px solid #c8c7c7;
      background-color: #fff;
      z-index: 1;
      cursor: pointer;

      &.pick-up-el {
        left: 69px;
        border-left: 0;
      }

      &.pick-up-edit {
        right: 299px;
        border-right: 0;
      }
    }

  }

</style>
