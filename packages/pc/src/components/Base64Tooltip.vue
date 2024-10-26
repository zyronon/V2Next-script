<template>
  <div
      class="base64_tooltip"
      v-show="show"
      :style="styleObject"
      @click="decode"
      ref="tooltip"
  >
    <template v-if="!decodeText">
      Base64解码：{{ originalText }}
      <Icon icon="system-uicons:translate"/>
    </template>
    <div v-else>
      <span>{{ decodeText }}</span>
      <BaseButton class="btn" size="small" @click="copy">点击复制</BaseButton>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import BaseButton from "./BaseButton.vue";
import {Icon} from '@iconify/vue'

const tooltip = ref(null)
const show = ref(false)
const originalText = ref('')
const decodeText = ref('')
const styleObject = reactive({
  left: '-100vw',
  top: '-100vh'
})
onMounted(() => {
  eventBus.on(CMD.SHOW_TOOLTIP, ({text, e}) => {
    //延时触发，因为click事件会设置为false
    setTimeout(() => (show.value = true))
    // console.log('SHOW_TOOLTIP', e.pageX, e.pageY,e)
    originalText.value = text
    decodeText.value = ''
    styleObject.left = e.clientX + 'px'
    styleObject.top = e.clientY + 20 + 'px'
  })
  window.addEventListener('click', e => {
    if (!tooltip.value) return
    if ((!tooltip.value.contains(e.target)) && show.value) {
      show.value = false
    }
  }, {capture: true})
  const fn = () => (show.value && (show.value = false))
  $('.post-detail', document).on('scroll', fn)
})

function copy() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(decodeText.value);
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '复制成功'})
  } else {
    eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '复制失败！浏览器不支持！'})
  }
}

function base64ToArrayBuffer(base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

function decode() {
  try {
    // decodeText.value = window.atob(originalText.value)
    new Blob([base64ToArrayBuffer(originalText.value)]).text().then(r => {
      decodeText.value = r
    })
  } catch (e) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: 'Base64解码失败！不是标准数据！'})
  }
}
</script>

<style scoped lang="less">
@import "src/assets/less/variable";

.base64_tooltip {
  //box-shadow: 0 0 0 3px gray;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  background: var(--color-third-bg);
  min-height: 2.2rem;
  max-width: 20rem;
  padding: 1rem;
  position: fixed;
  z-index: 9998;
  display: flex;
  align-items: center;
  border-radius: .5rem;
  cursor: pointer;
  line-break: anywhere;
  font-size: 1.4rem;
  color: var(--color-font-8);

  svg {
    margin-left: 1rem;
    font-size: 3rem;
    color: var(--color-gray);
  }

  :deep(.base-button) {
    margin-left: 1rem;
    margin-top: 1rem;
  }
}
</style>