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
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 32L19.1875 27M31 32L28.8125 27M19.1875 27L24 16L28.8125 27M19.1875 27H28.8125" stroke="#929596"
              stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M43.1999 20C41.3468 10.871 33.2758 4 23.5999 4C13.9241 4 5.85308 10.871 4 20L10 18" stroke="#929596"
              stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4 28C5.85308 37.129 13.9241 44 23.5999 44C33.2758 44 41.3468 37.129 43.1999 28L38 30" stroke="#929596"
              stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </template>
    <div v-else>
      <span>{{ decodeText }}</span>
      <BaseButton class="btn" size="small" @click="copy(decodeText)">点击复制</BaseButton>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import BaseButton from "./BaseButton.vue";
import {copy} from "@/utils/index.js";

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
  $('.post-detail', window.win().doc).on('scroll', fn)
})

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

  line-break: anywhere;
  font-size: 1.4rem;
  color: var(--color-font-8);

  svg {
    margin-left: 1rem;
    min-width: 1.8rem;
  }

  :deep(.base-button) {
    margin-left: 1rem;
    margin-top: 1rem;
  }
}
</style>