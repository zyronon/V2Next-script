<template>
  <div class="pop-confirm">
    <Teleport to="body">
      <Transition>
        <div ref="tip" class="pop-confirm-content" v-if="show">
          <div class="text">
            {{ title }}
          </div>
          <div class="options">
            <BaseButton type="link" size="small" @click="show = false">取消</BaseButton>
            <BaseButton size="small" @click="confirm">确认</BaseButton>
          </div>
        </div>
      </Transition>
    </Teleport>
    <span @click="showPop">
      <slot></slot>
    </span>
  </div>
</template>
<script>
import {nextTick} from "vue";
import BaseButton from "./BaseButton.vue";

export default {
  name: "PopConfirm",
  components: {BaseButton},
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
      let rect = e.target.getBoundingClientRect()
      this.show = true
      nextTick(() => {
        this.$refs.tip.style.top = rect.top + 'px'
        this.$refs.tip.style.left = rect.left + rect.width / 2 - 50 + 'px'
      })
    },
    confirm() {
      this.show = false
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="less" scoped>
@import "src/assets/less/variable";

.pop-confirm-content {
  position: fixed;
  background: var(--color-tooltip-bg);
  box-shadow: 0 0 6px 1px var(--color-tooltip-shadow);
  color: var(--color-font);
  padding: 1.5rem;
  border-radius: .8rem;
  transform: translate(-50%, calc(-100% - 1rem));
  z-index: 999;

  .text {
    text-align: start;
    font-size: 1.6rem;
    width: 15rem;
    min-width: 15rem;
  }

  .options {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
}

</style>
 