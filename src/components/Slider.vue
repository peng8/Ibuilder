<template>
  <div class="slider-wrap">
    <div class="slider-bar" ref="sliderBar" @click="setNum"></div>
    <div class="slider-btn" ref="sliderBtn">
      <div class="tip">
        <div class="num">{{parseInt(num*100)}}%</div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      num: this.value
    }
  },
  watch: {
    value: function() {
      this.num = this.value
      this.refresh()
    }
  },
  mounted() {
    this.refresh()

    let _this = this
    let barEl = this.$refs.sliderBar
    let btnEl = this.$refs.sliderBtn
    let barWidth = barEl.clientWidth
    let initLeft = null
    let newLeft = null
    let initMouseX = null
    let newMouseX = null

    let btnMoveFunc = function(moveEvent) {
      newMouseX = moveEvent.x
      newLeft = initLeft + (newMouseX - initMouseX)
      if (newLeft > barWidth) {
        newLeft = barWidth
      }
      if (newLeft < 0) {
        newLeft = 0
      }
      _this.num = (newLeft / barWidth).toFixed(2)
      _this.$emit('input', _this.num);
      btnEl.style.left = newLeft + 'px'
    }

    let removeBtnMoveFunc = function(upEvent) {
      document.removeEventListener('mousemove', btnMoveFunc)
      document.removeEventListener('mouseup', removeBtnMoveFunc)
    }

    btnEl.addEventListener('mousedown', function(downEvent) {
      event.preventDefault();
      initLeft = btnEl.offsetLeft
      initMouseX = downEvent.x
      document.addEventListener('mousemove', btnMoveFunc, false)
      document.addEventListener('mouseup', removeBtnMoveFunc, false)
    }, false)
  },
  methods: {
    setNum(event) {
      let barEl = this.$refs.sliderBar
      let barWidth = barEl.clientWidth
      this.num = event.offsetX / barWidth
      this.$emit('input', this.num)
    },
    refresh() {
      let barEl = this.$refs.sliderBar
      let btnEl = this.$refs.sliderBtn
      let barWidth = barEl.clientWidth
      btnEl.style.left = this.num * barWidth + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.slider-wrap {
  position: relative;
  width: 100%;
  height: 2.25em;
  display: flex;
  align-items: center;
  font-size: 0.75rem;

  .slider-bar {
    height: 4px;
    width: 100%;
    margin: 0 6px;
    background: #dbdbdb;
    border-radius: 2px;
  }

  .slider-btn {
    position: absolute;
    left: 0;
    width: 12px;
    height: 12px;
    border: 3px solid #00d1b2;
    border-radius: 50%;
    background-color: #fff;
  }

  .slider-btn:hover {
    .tip {
      display: flex;
    }
  }

  .tip {
    display: none;
    position: absolute;
    top: -36px;
    left: -11px;
    justify-content: center;
    align-items: center;

    .num {
      padding: 5px 6px;
      background-color: rgba(70, 76, 91, 0.9);
      border-radius: 4px;
      color: #fff;
    }

    .arrow {
      position: absolute;
      left: 9px;
      bottom: -5px;
      width: 0;
      height: 0;
      border-style: solid;
      border-color: transparent;
      border-width: 5px 5px 0;
      border-top-color: rgba(70, 76, 91, .9);
    }
  }
}
</style>

