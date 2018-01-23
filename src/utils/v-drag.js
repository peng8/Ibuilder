import Vue from 'vue'

export default () => {
  Vue.directive('drag', {
    bind: function (el, binding, vnode) {
      let dragItem = el;
      let self = this;
      //鼠标按下，在拖拽物上触发点击
      el.onmousedown = function (el) {
        //记录鼠标相对拖拽物的坐标
        let disX = el.clientX - dragItem.offsetLeft;
        let disY = el.clientY - dragItem.offsetTop;
        //鼠标按下的同时，鼠标移动
        document.onmousemove = function (el) {
          //计算拖拽物跟随鼠标的位置
          let left = el.clientX - disX;
          let top = el.clientY - disY;
          dragItem.style.left = left + 'px';
          dragItem.style.top = top + 'px';
          vnode.context.$emit("onmove", {
            top: top,
            left: left,
          })
        }
        //鼠标松开，释放事件
        document.onmouseup = function (el) {
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  })
}