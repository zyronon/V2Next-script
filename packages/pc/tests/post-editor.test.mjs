import assert from 'node:assert/strict'
import {readFile} from 'node:fs/promises'
import test from 'node:test'
import vm from 'node:vm'
import * as vue from 'vue'
import {compileScript, parse} from 'vue/compiler-sfc'
import {transformWithEsbuild} from 'vite'
import eventBus from '../src/utils/eventBus.js'
import {CMD} from '../src/utils/type.js'

const filename = new URL('../src/components/PostEditor.vue', import.meta.url)
const {descriptor} = parse(await readFile(filename, 'utf8'))
const script = compileScript(descriptor, {id: 'post-editor-test'})
const {code} = await transformWithEsbuild(script.content, 'PostEditor.js', {format: 'cjs'})

/**
 * 使用模拟请求执行真实编辑器的提交逻辑，不向网站发送回复。
 * @param response 模拟服务器响应或请求函数。
 * @param props 编辑器参数。
 * @returns 编辑器状态、事件和请求记录。
 */
function createEditor(response, props = {}) {
  eventBus.clear()
  const events = []
  const requests = []
  Object.values(CMD).forEach(type => eventBus.on(type, value => events.push({type, value})))
  const post = vue.ref({id: '123', once: 10, replyCount: 25, username: 'op'})
  const injections = {post, show: vue.ref(true), isNight: vue.ref(false)}
  const module = {exports: {}}
  const imports = {
    vue: {...vue, inject: key => injections[key], onMounted() {}, onBeforeUnmount() {}, watch() {}},
    '../utils/eventBus.js': {__esModule: true, default: eventBus},
    '../utils/type.js': {CMD},
    '@v2next/core/core.ts': {classicsEmoticons: [], emojiEmoticons: [], DefaultVal: {}},
  }
  const context = {
    module, exports: module.exports, require: name => imports[name] || {},
    console: {...console, error() {}},
    window: {
      user: {username: 'me', avatar: '/avatar.png'},
      document: {body: {clientWidth: 1400}}, open: () => null,
    },
    location: {origin: 'https://www.v2ex.com'},
    $: {post: (...args) => {
      requests.push(args)
      return typeof response === 'function' ? response() : Promise.resolve(response)
    }},
  }
  vm.runInNewContext(code, context)
  const editor = module.exports.default.setup({useType: 'reply-comment', ...props}, {
    expose() {}, emit: type => events.push({type}),
  })
  editor.content.value = '测试回复'
  return {editor, events, requests}
}

const findEvent = (events, type) => events.find(event => event.type === type)

test('JSON 成功响应关闭编辑器、清空输入并添加真实回复 ID', async () => {
  const {editor, events, requests} = createEditor({success: true, reply_id: 789, once: '20'}, {
    replyUser: 'other', replyFloor: 25,
  })
  await editor.submit()
  assert.equal(requests.length, 1)
  assert.equal(requests[0][1].content, '测试回复')
  assert.equal(editor.content.value, '@other #25 ')
  assert.ok(findEvent(events, 'close'))
  const reply = findEvent(events, CMD.ADD_REPLY).value
  assert.equal(String(reply.id), '789')
  assert.equal(reply.replyFloor, 25)
  assert.equal(reply.replyUsers[0], 'other')
  assert.equal(findEvent(events, CMD.REFRESH_ONCE).value, 20)
  assert.equal(findEvent(events, CMD.SHOW_MSG).value.type, 'success')
  assert.equal(editor.loading.value, false)
})

test('JSON 失败响应显示服务端原因、更新 once 并保留输入', async () => {
  const {editor, events} = createEditor({success: false, message: '请稍后再试', once: 30})
  await editor.submit()
  assert.equal(editor.content.value, '测试回复')
  assert.equal(findEvent(events, CMD.SHOW_MSG).value.text, '请稍后再试')
  assert.equal(findEvent(events, CMD.REFRESH_ONCE).value, 30)
  assert.equal(findEvent(events, CMD.ADD_REPLY), undefined)
  assert.equal(findEvent(events, 'close'), undefined)
  assert.equal(editor.loading.value, false)
})

test('HTML 成功响应继续添加回复', async () => {
  const html = '<html><script>var once = "40";</script></html>'
  const {editor, events} = createEditor(html)
  await editor.submit()
  assert.equal(editor.content.value, '')
  assert.ok(findEvent(events, CMD.ADD_REPLY))
  assert.ok(findEvent(events, 'close'))
  assert.equal(findEvent(events, CMD.REFRESH_ONCE).value, html)
})

test('HTML 重复回复错误保留输入且不添加回复', async () => {
  const {editor, events} = createEditor('<html>你上一条回复的内容和这条相同</html>')
  await editor.submit()
  assert.equal(editor.content.value, '测试回复')
  assert.equal(findEvent(events, CMD.ADD_REPLY), undefined)
  assert.equal(findEvent(events, CMD.SHOW_MSG).value.type, 'error')
})

test('JSON 成功响应未携带 once 时主动刷新令牌', async () => {
  const {editor, events} = createEditor({success: true, reply_id: 789})
  await editor.submit()
  assert.ok(findEvent(events, CMD.REFRESH_ONCE))
  assert.ok(findEvent(events, CMD.ADD_REPLY))
  assert.equal(editor.loading.value, false)
})

test('JSON 失败响应没有原因时显示默认错误', async () => {
  const {editor, events} = createEditor({success: false})
  await editor.submit()
  assert.equal(findEvent(events, CMD.SHOW_MSG).value.text, '回复失败')
  assert.equal(editor.content.value, '测试回复')
  assert.equal(findEvent(events, CMD.ADD_REPLY), undefined)
})

test('请求未完成时阻止再次提交，完成后恢复按钮状态', async () => {
  let resolve
  const pending = new Promise(done => { resolve = done })
  const {editor, requests} = createEditor(() => pending)
  const submitted = editor.submit()
  assert.equal(editor.loading.value, true)
  await editor.submit()
  assert.equal(requests.length, 1)
  resolve({success: true, reply_id: 789})
  await submitted
  assert.equal(editor.loading.value, false)
})

test('请求异常保留输入并提示刷新确认，不自动重发', async () => {
  const {editor, events, requests} = createEditor(() => Promise.reject(new Error('连接断开')))
  await editor.submit()
  assert.equal(editor.content.value, '测试回复')
  assert.equal(editor.loading.value, false)
  assert.equal(requests.length, 1)
  assert.match(findEvent(events, CMD.SHOW_MSG).value.text, /刷新页面确认/)
  assert.equal(findEvent(events, CMD.ADD_REPLY), undefined)
})

test('界面更新抛错时提示刷新确认并结束加载状态', async () => {
  const {editor, events, requests} = createEditor({success: true, reply_id: 789})
  eventBus.on(CMD.ADD_REPLY, () => { throw new Error('更新失败') })
  await editor.submit()
  assert.equal(editor.loading.value, false)
  assert.equal(requests.length, 1)
  assert.match(findEvent(events, CMD.SHOW_MSG).value.text, /避免重复发送/)
})

test('HTML 原版回复页弹窗被拦截时保留输入并正常结束加载', async () => {
  const {editor, events} = createEditor('<html>创建新回复</html>')
  await editor.submit()
  assert.equal(editor.content.value, '测试回复')
  assert.equal(editor.loading.value, false)
  assert.equal(findEvent(events, CMD.ADD_REPLY), undefined)
  assert.match(findEvent(events, CMD.SHOW_MSG).value.text, /请使用原版进行回复/)
})
