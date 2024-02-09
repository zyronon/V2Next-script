// ==UserScript==
// @name         Youtube Next
// @namespace    http://tampermonkey.net/
// @version      8.0.3
// @author       zyronon
// @description  Youtube Next - 一个好用的V2EX脚本！ 已适配移动端
// @license      GPL License
// @icon         https://v2next.netlify.app/favicon.ico
// @homepage     https://github.com/zyronon/web-scripts
// @homepageURL  https://github.com/zyronon/web-scripts
// @supportURL   https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @downloadURL  https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @updateURL    https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @match        https://youtube.com/*
// @match        https://*.youtube.com/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.14/dist/vue.global.prod.js
// @grant        GM_openInTab
// ==/UserScript==

(function (vue) {
  'use strict';

  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main = {};
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", null, "123123123");
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
  function stop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }
  function openNewTab(href, active = false) {
    _GM_openInTab(href, { active });
  }
  function getBrowserType() {
    let userAgent = navigator.userAgent;
    if (userAgent.indexOf("Opera") > -1) {
      return "Opera";
    }
    if (userAgent.indexOf("Firefox") > -1) {
      return "FF";
    }
    if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    }
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
      return "IE";
    }
  }
  function initStyle(type) {
    let style2 = `
  :root {
  --color-scrollbar: rgb(147, 173, 227);
}

html[darker-dark-theme] {
  --color-scrollbar: rgb(92, 93, 94);
}

${type === "FF" ? `/* 火狐美化滚动条 */
* {
  scrollbar-color: var(--color-scrollbar);
  /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin;
  /* 滚动条宽度有三种：thin、auto、none */
}` : `
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
  `;
    let addStyle2 = document.createElement("style");
    addStyle2.rel = "stylesheet";
    addStyle2.type = "text/css";
    addStyle2.innerHTML = style2;
    window.document.head.append(addStyle2);
  }
  function findA(target, e) {
    let parentNode = target.parentNode;
    let count = 0;
    while (parentNode.tagName !== "A" && count < 10) {
      count++;
      parentNode = parentNode.parentNode;
    }
    console.log(parentNode);
    openNewTab(parentNode.href);
    return stop(e);
  }
  function init() {
    let browserType = getBrowserType();
    initStyle(browserType);
    console.log("Youtube Next start");
    window.addEventListener("click", function(e) {
      let target = e.target;
      let tagName = target.tagName;
      let classList = target.classList;
      console.log("e", e, target, tagName, classList);
      if (tagName === "IMG" && Array.from(classList).some((v) => v.includes("yt-core-image"))) {
        console.log("封面");
        return findA(target, e);
      }
      if (tagName === "SPAN" && Array.from(classList).some((v) => v.includes("yt-core-attributed-string"))) {
        console.log("标题");
        return findA(target, e);
      }
    }, true);
  }
  init();
  let isMobile = !document.querySelector("#Rightbar");
  isMobile = false;
  let $section = document.createElement("section");
  $section.id = "vue-app";
  document.body.append($section);
  if (!isMobile) {
    let vueApp = vue.createApp(App);
    vueApp.config.unwrapInjectedRef = true;
    vueApp.mount($section);
  }

})(Vue);