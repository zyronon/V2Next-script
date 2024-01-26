import eventBus from "@/utils/eventBus.js";
import {CMD} from "@/utils/type.js";

export function throttle(fn, threshold, scope) {
  let timer;
  return function () {
    let context = scope || this, args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(context, args);
        timer = null;
      }, threshold)
    }
  }
}

export function debounce(fn, delay, scope) {
  let timer = null;
  // 返回函数对debounce作用域形成闭包
  return function () {
    // setTimeout()中用到函数环境总是window,故需要当前环境的副本；
    let context = scope || this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
      timer = null
    }, delay);
  }
}

export async function copy(text) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '复制成功'})
    return true
  } else {
    eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '复制失败！浏览器不支持！'})
  }
}