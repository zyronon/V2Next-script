import {GM_openInTab, GM_registerMenuCommand} from "gmApi";

import {createApp} from 'vue';
import App from './App.vue';

// import './global.d.ts'

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
  openNewTab(parentNode.href)
  return stop(e)
}

function init() {
  let browserType = getBrowserType()
  initStyle(browserType)
  console.log('Youtube Next start')

  window.addEventListener('click', function (e: Event) {
    let target: HTMLDivElement = <HTMLDivElement>e.target;
    let tagName = target.tagName;
    let classList = target.classList

    // console.log('e', e, target, tagName, classList)

    if (tagName === 'IMG' && Array.from(classList).some(v => v.includes('yt-core-image'))) {
      console.log('封面',)
      return findA(target, e)
    }
    // if (tagName === 'DIV' && Array.from(classList).some(v => v.includes('collections-v2'))) {
    //   console.log('播放合辑')
    // }
    if (tagName === 'SPAN' && Array.from(classList).some(v => v.includes('yt-core-attributed-string'))) {
      console.log('标题',)
      return findA(target, e)
    }
    // return stop(e)
  }, true);

  window.addEventListener('visibilitychange', stop, true)

}

init()

let isMobile = !document.querySelector('#Rightbar');
isMobile = false
let $section = document.createElement('section')
$section.id = 'vue-app'
document.body.append($section)
if (!isMobile) {
  let vueApp = createApp(App)
  vueApp.config.unwrapInjectedRef = true
  vueApp.mount($section);
}