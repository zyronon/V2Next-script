<template>
  <!--  <transition name="from-bottom"> -->
  <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
      :css="false"
  >
    <div ref="dialog"
         class="FromBottomDialog"
         v-if="modelValue"
         :class="[mode,showHengGang ? '' : 'no-heng-gang']"
         :style="{'max-height':height}"
         @touchstart="start"
         @touchmove="move"
         @touchend="end"
    >
      <slot name="header"></slot>
      <div class="heng-gang" :class="mode" v-if="showHengGang">
        <div class="gang-content"></div>
      </div>
      <div class="dialog-wrapper">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>

export default {
  name: "FromBottomDialog",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      // default: 'dark'
      default: 'light'
      // default: 'white'
    },
    maskMode: {
      type: String,
      default: 'dark'
    },
    height: {
      type: String,
      default: '70vh'
    },
    showHengGang: {
      type: Boolean,
      default: true
    },
    pageId: {
      type: String,
      default: null,
      required: true
    },
    borderRadius: {
      type: String,
      default: '1rem 1rem 0 0'
    },
    tag: {
      type: String,
      default: ''
    }
  },
  watch: {
    modelValue(newVal) {
      let page = document.getElementById(this.pageId)
      if (newVal) {
        page.style.overflow = 'hidden'
        this.scroll = page.scrollTop
        let mask = $(`<div class="mask fade-in ${this.maskMode}"></div>`)
        mask.on('click', e => {
          this.hide(false)
        })
        page.appendChild(mask[0])
      } else {
        // page.scrollTop = this.scroll + 'px'
        page.style.overflow = 'unset'
        let mask = $('.mask')
        mask.removeClass('fade-in')
        mask.addClass('fade-out')
        setTimeout(() => {
          mask.remove()
        }, 250)
      }
    },
  },
  data() {
    return {
      scroll: 0,
      startLocationY: 0,
      moveYDistance: 0,
      startTime: 0,
      pagePosition: null
    }
  },
  computed: {},
  created() {
  },
  methods: {
    beforeEnter(el) {
      el.style['transition-duration'] = `250ms`
      el.style['transform'] = `translate3d(0,${this.height},0)`
    },
    enter(el, done) {
      setTimeout(() => {
        el.style['transform'] = `translate3d(0,0,0)`
      }, 0)
      setTimeout(() => {
        el.style['transform'] = `none`
        done()
      }, 250)
    },
    afterEnter() {
    },
    beforeLeave(el) {
      el.style['transition-duration'] = `250ms`
      el.style['transform'] = `translate3d(0,0,0)`
    },
    leave(el, done) {
      //ref获取不到
      let maxHeight = $('.FromBottomDialog').css('max-height')
      el.style['transform'] = `translate3d(0,${maxHeight},0)`
      setTimeout(done, 250)
    },
    afterLeave() {
    },
    hide(val = false) {
      this.$emit('update:modelValue', val)
      this.$emit('cancel')
    },
    start(e) {
      if (this.$refs.dialog.scrollTop !== 0) return
      this.startLocationY = e.touches[0].pageY
      this.startTime = Date.now()
      this.$refs.dialog.style['transition-duration'] = `0ms`
    },
    move(e) {
      // console.log('this.$refs.dialog.scrollTop',this.$refs.dialog.scrollTop)
      if (this.$refs.dialog.scrollTop !== 0) return
      this.moveYDistance = e.touches[0].pageY - this.startLocationY
      if (this.moveYDistance > 0) {
        // bus.emit(EVENT_KEY.DIALOG_MOVE, {tag: this.tag, e: this.moveYDistance})
        this.$refs.dialog.style['transform'] = `translate3d(0,${this.moveYDistance}px,0)`
      }
    },
    end(e) {
      //点击
      if (Date.now() - this.startTime < 150 && Math.abs(this.moveYDistance) < 30) {
        return
      }
      //滑动
      if (this.$refs.dialog.scrollTop !== 0) return
      let clientHeight = this.$refs.dialog.clientHeight
      this.$refs.dialog.style['transition-duration'] = `250ms`
      if (Math.abs(this.moveYDistance) > clientHeight / 2) {
        this.$refs.dialog.style['transform'] = `translate3d(0,${clientHeight}px,0)`
        // bus.emit(EVENT_KEY.DIALOG_END, {tag: this.tag, isClose: true})
        setTimeout(this.hide, 250)
      } else {
        this.$refs.dialog.style['transform'] = `translate3d(0,0,0)`
        // bus.emit(EVENT_KEY.DIALOG_END, {tag: this.tag, isClose: false})
        setTimeout(() => {
          if (this.$refs.dialog) {
            this.$refs.dialog.style['transform'] = `none`
          }
          // this.$setCss(this.$refs.dialog, 'transition-duration', `0ms`)
        }, 250)
      }
      this.moveYDistance = 0
    }
  }
}
</script>

<style scoped lang="less">
.FromBottomDialog {
  z-index: 11;
  position: fixed;
  width: 100%;
  overflow-y: auto;
  bottom: 0;
  box-sizing: border-box;
  border-radius: v-bind(borderRadius);
  transition: all .3s;
  background: var(--color-main-bg);

  &.no-heng-gang {
    padding-top: 0;
  }

  .heng-gang {
    border-radius: .5rem .5rem 0 0;
    border-radius: v-bind(borderRadius);
    z-index: 3;
    width: 100%;
    position: fixed;
    min-height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    .gang-content {
      background: darkgray;
      border-radius: 2px;
      height: .4rem;
      width: 3rem;
    }
  }

  .dialog-wrapper {
    margin-top: 3rem;
  }
}
</style>