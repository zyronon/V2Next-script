import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import test from 'node:test'
import vm from 'node:vm'
import {transformWithEsbuild} from 'vite'

const source = await readFile(new URL('../../core/core.ts', import.meta.url), 'utf8')
const {code} = await transformWithEsbuild(source, 'core.ts', {format: 'cjs'})
const widgetUrl = 'https://example.com/widget.user.js'
const responseText = 'globalThis.widgetCount++'

function createLoader(widgetCount = 0) {
  const requests = []
  const module = {exports: {}}
  const context = {
    module, exports: module.exports, widgetCount,
    require: name => name === './types' ? {} : {GM_xmlhttpRequest: request => requests.push(request)},
    document: {getElementById: id => id === 'sb_v2' && context.widgetCount ? {} : null},
  }
  vm.runInNewContext(code, context)
  const load = () => module.exports.functions.loadAndRunScript(widgetUrl, () => !context.document.getElementById('sb_v2'))
  return {load, context, requests, functions: module.exports.functions}
}

test('已单独安装挂件时不请求或运行内置脚本', () => {
  const {load, requests, context} = createLoader(1)
  load()
  assert.equal(requests.length, 0)
  assert.equal(context.widgetCount, 1)
})

test('内置脚本下载期间外部挂件初始化时不再运行内置脚本', () => {
  const {load, requests, context} = createLoader()
  load()
  assert.equal(requests.length, 1)
  context.widgetCount = 1
  requests[0].onload({responseText})
  assert.equal(context.widgetCount, 1)
})

test('没有单独安装时内置挂件仍运行且后续加载不重复请求', () => {
  const {load, requests, context} = createLoader()
  load()
  assert.equal(requests[0].url, widgetUrl)
  requests[0].onload({responseText})
  load()
  assert.equal(context.widgetCount, 1)
  assert.equal(requests.length, 1)
})

test('并发下载内置脚本时最多执行一次', () => {
  const {load, requests, context} = createLoader()
  load()
  load()
  requests.forEach(request => request.onload({responseText}))
  assert.equal(context.widgetCount, 1)
})

test('未提供加载条件时保留原有脚本加载行为', () => {
  const {functions, requests, context} = createLoader()
  functions.loadAndRunScript(widgetUrl)
  requests[0].onload({responseText})
  assert.equal(context.widgetCount, 1)
})
