import Vue from 'vue'
import Vuex from 'vuex'

const recordPlugin = store => {
  // 当 store 初始化后调用
  //todo: 此处要分module,区分编辑以外的操作
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    //console.log()
  })
}

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    page: {
      name: "ui-page",
      width: 1366,
      height: 768,
      scale: 1,
      elements: []
    },
    records: [],
    editorData: {},
    allPageList: [],
    copyPage: null
  },
  mutations: {
    setBackGround: (state, val) => {
      state.background = val
    },
    addImg: (state, val) => {
      state.page.elements.push({
        name: "ui-img",
        text: val,
      })
    },
    addElement: (state, val) => {
      val.zindex = state.page.elements.length
      state.page.elements.push(val)
    },
    setPosition: (state, val) => {
      state.page.elements.forEach((value, index, arr) => {
        if (value.uuid === val.uuid) {
          value.top = val.top || 0
          value.left = val.left || 0
        }
      })
    },
    setElementStyle: (state, val) => {
      state.page.elements.forEach((value, index) => {
        if (value.uuid === val.uuid) {
          if (typeof val.top !== 'undefined') {
            value.top = val.top
          }
          if (typeof val.left !== 'undefined') {
            value.left = val.left
          }
          if (typeof val.width !== 'undefined') {
            value.width = val.width
          }
          if (typeof val.height !== 'undefined') {
            value.height = val.height
          }
          if (typeof val['zindex'] !== 'undefined') {
            value['zindex'] = val['zindex']
          }
        }
      })
    },
    setEditorData: (state, val) => {
      state.editorData = val
    },
    setSelectedPage: (state, val) => {
      state.editorData = state.page
    },
    addPage: (state, val) => {
      state.page = val
    },
    addRecord: (state, val) => {
      state.records.push({
        page: val
      })
    },
    delEl: (state) => {
      let zIndex = state.editorData.zindex
      state.page.elements.forEach(function (element) {
        if (element.zindex > zIndex) {
          element.zindex--
        }
      })
      let tmpe = state.page.elements.filter((element) => {
        if (element.uuid === state.editorData.uuid) {
          return false
        }
        return true
      })
      state.page.elements = tmpe
      state.editorData = state.page
    },
    copyEl: (state) => {
      let newEl = JSON.parse(JSON.stringify(state.editorData))
      newEl.uuid = newEl.name + '_' + Date.now()
      newEl.zindex = state.page.elements.length
      state.page.elements.push(newEl)
    },
    resetLayer (state, val) {
      let currentIndex = state.editorData['zindex']
      let len = state.page.elements.length
      if (val === 'forward' && currentIndex < len - 1) {
        for (let i = 0; i < len; i++) {
          if (state.page.elements[i]['zindex'] === currentIndex + 1) {
            state.page.elements[i]['zindex'] = currentIndex
            state.editorData['zindex'] = currentIndex + 1
            break
          }
        }
      } else if (val === 'backward' && currentIndex > 0) {
        for (let i = 0; i < len; i++) {
          if (state.page.elements[i]['zindex'] === currentIndex - 1) {
            state.page.elements[i]['zindex'] = currentIndex
            state.editorData['zindex'] = currentIndex - 1
            break
          }
        }
      } else if (val === 'top' && currentIndex < len - 1) {
        for (let i = 0; i < len; i++) {
          if (state.page.elements[i]['zindex'] > currentIndex) {
            state.page.elements[i]['zindex'] = state.page.elements[i]['zindex'] - 1
          }
        }
        state.editorData['zindex'] = len - 1
      } else if (val === 'bottom' && currentIndex > 0) {
        for (let i = 0; i < len; i++) {
          if (state.page.elements[i]['zindex'] < currentIndex) {
            state.page.elements[i]['zindex'] = state.page.elements[i]['zindex'] + 1
          }
        }
        state.editorData['zindex'] = 0
      }
    },
    setPageInfo (state, val) {
      state.page.width = val.width
      state.page.height = val.height
      state.page.scale = val.scale
    }
  },
  actions: {
    edit(context) {}
  },
  plugins: [recordPlugin]
})
