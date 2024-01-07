<script lang="jsx">
import {nextTick, Teleport, Transition} from "vue";

export default {
  name: "Tooltip",
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    showPop(e) {
      if (this.disabled) return
      if (!this.title) return
      e.stopPropagation()
      let rect = e.target.getBoundingClientRect()
      this.show = true
      nextTick(() => {
        let tip = this.$refs?.tip?.getBoundingClientRect()
        if (!tip) return
        if (rect.top < 50) {
          this.$refs.tip.style.top = rect.top + rect.height + 10 + 'px'
        } else {
          this.$refs.tip.style.top = rect.top - tip.height - 10 + 'px'
        }
        let tipWidth = tip.width
        let rectWidth = rect.width
        this.$refs.tip.style.left = rect.left - (tipWidth - rectWidth) / 2 + 'px'

        // this.$refs.tip.style.left = rect.left + (rectWidth) / 2 + 'px'
      })
    },
  },
  render() {
    let Vnode = this.$slots.default()[0]
    return <>
      {
          this.show && this.title && (
              <Teleport to="body">
                <Transition name="fade">
                  <div ref="tip" className="tip">
                    {this.title}
                  </div>
                </Transition>
              </Teleport>
          )
      }
      <Vnode
          onClick={() => this.show = false}
          onmouseenter={(e) => this.showPop(e)}
          onmouseleave={() => this.show = false}
      />
    </>
  }
}
</script>
<style lang="less" scoped>

.tip {
  position: fixed;
  font-size: 1.6rem;
  z-index: 9999;
  max-width: 10rem;
  border-radius: 0.5rem;
  padding: 1rem;
  color: var(--color-font);
  background: var(--color-tooltip-bg);
  box-shadow: 0 0 6px 1px var(--color-tooltip-shadow);
}

</style>
