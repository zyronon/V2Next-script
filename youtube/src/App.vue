<script setup lang="ts">
import {onMounted, onUnmounted, reactive, ref, watch} from "vue";
import {GM_openInTab, GM_registerMenuCommand, unsafeWindow} from "gmApi";

let refVideo = ref<HTMLVideoElement>(null)
let rate = ref(1)
let lastRate = ref(1)
let pageType = ref<string>('')

let msg = reactive({
  show: false,
  content: '',
  timer: -1
})

async function sleep(val: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), val)
  })
}

function stop(e) {
  e.preventDefault()
  e.stopPropagation()
  e.stopImmediatePropagation()
  return true
}

//打开新标签页
function openNewTab(href: string, active = false) {
  GM_openInTab(href, {active});
}

function getBrowserType() {
  let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
  if (userAgent.indexOf("Opera") > -1) { //判断是否Opera浏览器
    return "Opera"
  }
  if (userAgent.indexOf("Firefox") > -1) { //判断是否Firefox浏览器
    return "FF";
  }
  if (userAgent.indexOf("Chrome") > -1) {
    return "Chrome";
  }
  if (userAgent.indexOf("Safari") > -1) { //判断是否Safari浏览器
    return "Safari";
  }
  if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) { //判断是否IE浏览器
    return "IE";
  }
}

//初始化样式表
function initStyle(type) {
  let style2 = `
  :root {
  --color-scrollbar: rgb(147, 173, 227);
}

html[darker-dark-theme] {
  --color-scrollbar: rgb(92, 93, 94);
}

${type === 'FF' ?
      `/* 火狐美化滚动条 */
* {
  scrollbar-color: var(--color-scrollbar);
  /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin;
  /* 滚动条宽度有三种：thin、auto、none */
}` :
      `
  ::-webkit-scrollbar {
  width: 1rem;
  height: 1rem;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: .2rem;
}

::-webkit-scrollbar-thumb {
  background: var(--color-scrollbar);
  border-radius: 1rem;
}`}
  `
  let addStyle2: HTMLStyleElement = document.createElement("style");
  // @ts-ignore
  addStyle2.rel = "stylesheet";
  addStyle2.type = "text/css";
  addStyle2.innerHTML = style2
  window.document.head.append(addStyle2)
}

function findA(target: HTMLDivElement, e: Event) {
  let parentNode: any = target.parentNode
  let count = 0
  while (parentNode.tagName !== 'A' && count < 10) {
    count++
    parentNode = parentNode.parentNode
  }
  console.log(parentNode)
  openNewTab(parentNode.href, true)
  return stop(e)
}

function checkPageType() {
  if (location.pathname === '/watch') {
    pageType.value = 'watch'
  }
  if (location.pathname === '/') {
    pageType.value = 'home'
  }
  if (location.pathname.startsWith('/@')) {
    pageType.value = 'user'
  }
}

function checkVideo() {
  let v = document.querySelector('video')
  if (v) {
    v.playbackRate = rate.value
    refVideo.value = v
    window.funs.checkWatchPageDiv()
    return true
  }
}

function playbackRateToggle() {
  checkVideo()
  if (refVideo.value) {
    if (refVideo.value.playbackRate !== 1) {
      lastRate.value = rate.value
      rate.value = refVideo.value.playbackRate = 1
      showMsg('播放速度: 1')
    } else {
      rate.value = refVideo.value.playbackRate = (lastRate.value === 1 ? 2 : lastRate.value)
      showMsg('播放速度: ' + rate.value)
    }
  }
}

function toggle() {
  checkVideo()
  if (refVideo.value) {
    if (refVideo.value.paused) {
      refVideo.value.play()
    } else {
      refVideo.value.pause()
    }
  }
}

function setPlaybackRate(val: number) {
  checkVideo()
  if (refVideo.value) {
    rate.value = refVideo.value.playbackRate = Number(val.toFixed(1))
    showMsg('播放速度: ' + rate.value)
  }
}

function showMsg(text: string) {
  if (msg.show) {
    msg.show = false
    clearTimeout(msg.timer)
  }
  msg.show = true
  msg.content = text
  msg.timer = setTimeout(() => {
    msg.show = false
  }, 3000)
}

function checkOptionButtons() {
  let dom = document.querySelector('.ytb-next')
  if (dom) return;
  dom = document.createElement('div')
  dom.classList.add('ytb-next')
  dom.innerHTML = `
    <div class="btn" onclick="window.cb('playbackRateToggle')">切换</div>
    <div class="btn" onclick="window.cb('addRate')">&nbsp;+&nbsp;</div>
    <div class="btn" onclick="window.cb('removeRate')">&nbsp;-&nbsp;</div>
    <div class="btn" onclick="window.cb('playbackRateToggle2')">&nbsp;2&nbsp;</div>
    <div class="btn" onclick="window.cb('playbackRateToggle25')">&nbsp;2.5&nbsp;</div>
    <div class="btn" onclick="window.cb('playbackRateToggle3')">&nbsp;3&nbsp;</div>
        `
  document.body.append(dom)
}

function checkIsWatchPage() {
  checkPageType()
  return pageType.value === 'watch'
}
function checkA(e: Event) {
  let target: HTMLDivElement = <HTMLDivElement>e.target;
  let tagName = target.tagName;
  let classList = target.classList
  // console.log('e', e, target, tagName, classList)
  if (tagName === 'IMG' && Array.from(classList).some(v => v.includes('yt-core-image'))) {
    console.log('封面',)
    if (checkIsWatchPage()) return
    return findA(target, e)
  }
  // if (tagName === 'DIV' && Array.from(classList).some(v => v.includes('collections-v2'))) {
  //   console.log('播放合辑')
  // }
  if (tagName === 'SPAN' && Array.from(classList).some(v => v.includes('yt-core-attributed-string'))) {
    console.log('标题',)
    if (checkIsWatchPage()) return
    return findA(target, e)
  }
  if (tagName === 'BUTTON' && Array.from(classList).some(v => v.includes('ytp-large-play-button'))) {
    console.log('播放按钮',)
    if (checkIsWatchPage()) return
  }
  if (tagName === 'DIV' && Array.from(classList).some(v => v.includes('ytp-cued-thumbnail-overlay-image'))) {
    console.log('播放按钮',)
    if (checkIsWatchPage()) return
  }
  // return stop(e)
}

watch(rate, (value) => {
  localStorage.setItem('youtube-rate', value)
  window.rate = value
})

onMounted(() => {
  console.log('Youtube Next start')
  let browserType = getBrowserType()
  initStyle(browserType)

  let youtubeRate = localStorage.getItem('youtube-rate')
  if (youtubeRate) {
    rate.value = Number(youtubeRate)
    // console.log('r', rate.value)
  }

  unsafeWindow.cb = (type: string) => {
    console.log('type', type)
    switch (type) {
      case 'toggle':
        toggle()
        break
      case 'playbackRateToggle':
        playbackRateToggle()
        break
      case 'playbackRateToggle2':
        setPlaybackRate(2)
        break
      case 'playbackRateToggle25':
        setPlaybackRate(2.5)
        break
      case 'playbackRateToggle3':
        setPlaybackRate(3)
        break
      case 'addRate':
        setPlaybackRate(rate.value + 0.1)
        break
      case 'removeRate':
        setPlaybackRate(rate.value - 0.1)
        break
    }
  }

  if (checkIsWatchPage()){
    checkOptionButtons()
    setTimeout(() => {
      checkVideo()
      if (refVideo.value) {
        refVideo.value.muted = false
        refVideo.value.playbackRate = rate.value
        showMsg('播放速度: ' + rate.value)
      }
    }, 500)
  }
  window.addEventListener('click', checkA, true);
  window.addEventListener('visibilitychange', stop, true)
})

onUnmounted(() => {
  window.removeEventListener('click', checkA, true);
  window.removeEventListener('visibilitychange', stop, true)
})
</script>

<template>
  <div class="next" v-if="false">
    <div class="btn" @click="toggle">暂停/播放</div>
    <div class="btn" @click="playbackRateToggle">速度切换</div>
    <div class="btn" @click="setPlaybackRate(rate + 0.1)">速度 +</div>
    <div class="btn" @click="setPlaybackRate(rate - 0.1)">速度 -</div>
  </div>
  <div class="msg" v-if="msg.show">{{ msg.content }}</div>
</template>

<style lang="less">
.ytb-next {
  font-size: 1.4rem;
  display: flex;
  gap: 1rem;
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 99999;

  .btn {
    color: #f1f1f1;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0 16px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
  }
}

.msg {
  position: fixed;
  z-index: 999;
  font-size: 3rem;
  left: 0;
  top: 0;
  color: black;
  background: white;
  padding: 1rem 2rem;
}
</style>
<style lang="less">
@w: 400px;
@media (min-width: 1280px) and (orientation: landscape) {
  //播放器
  .player-container, .player-container.sticky-player {
    right: @w !important;
    top: 0 !important;
    //z-index: 999!important;
  }

  //左侧，主是要播放器下面的一坨
  ytm-watch {
    margin-right: @w !important;
  }

  //右侧推荐
  ytm-engagement-panel {
    width: @w !important;
    top: 0 !important;
  }

  //右下部的一个黑色区域，不知道干啥的
  .playlist-entrypoint-background-protection {
    //display: none;
    width: @w !important;
  }

  .slide-in-animation-entry-point {
    width: @w !important;
  }

  //右侧历史推荐
  ytm-single-column-watch-next-results-renderer [section-identifier=related-items], ytm-single-column-watch-next-results-renderer > ytm-playlist {
    width: @w !important;
    padding: 0 0 8px 8px
  }

  //右侧历史推荐
  ytm-single-column-watch-next-results-renderer .playlist-content {
    width: @w !important;
  }
}

</style>