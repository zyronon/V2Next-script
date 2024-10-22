<template>
  <span @click.stop="showPop">
      <slot></slot>
  </span>
</template>
<script>
import eventBus from "@/utils/eventBus.js";
import {CMD} from "@/utils/type.js";

export default {
  name: "PopConfirm",
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
      id: '',
    }
  },
  created() {

  },
  methods: {
    cb(id) {
      if (id === this.id) {
        this.$emit('confirm')
        this.id = ''
      }
    },
    showPop(e) {
      if (this.disabled) return
      let rect = e.target.getBoundingClientRect()
      this.id = Date.now()
      eventBus.emit(CMD.SHOW_CONFIRM_MODAL, {title: this.title, rect, id: this.id})
      eventBus.offOne(CMD.SHOW_CONFIRM_MODAL_CONFIRM, this.cb)
      eventBus.on(CMD.SHOW_CONFIRM_MODAL_CONFIRM, this.cb)
    },
  },
  unmounted() {
    eventBus.offOne(CMD.SHOW_CONFIRM_MODAL_CONFIRM, this.cb)
  }
}
</script>
 