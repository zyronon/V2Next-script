<template>
  <div class="post-editor-wrapper" :class="editorClass">
    <textarea class="post-editor"
              ref="txtRef"
              @focus="isFocus = true"
              @blur="onBlur"
              @focusin="onFocusin"
              placeholder="请尽量让自己的回复能够对别人有帮助"
              :class="editorId"
              @input="onInput"
              @keydown="onKeydown"
              @drop="drop"
              v-model="content"></textarea>
    <div class="get-cursor">
      <span v-html="cursorHtml"></span>
      <span class="cursor" ref="cursorRef">|</span>
    </div>
    <div class="toolbar">
      <div class="left">
        <Icon @click.stop="showEmoticons" icon="streamline:smiley-happy" />

        <div class="upload">
          <input type="file" accept="image/*" @change="e=>upload(e.currentTarget.files[0])">
          <Icon icon="lets-icons:img-load-box-fill" />
        </div>
        <span v-if="uploadLoading" style="color: black;font-size: 1.4rem">上传中.....</span>
      </div>
      <div class="right">
        <BaseButton
            type="link"
            size="small"
            v-if="useType === 'reply-comment'" style="margin-right: 1rem;cursor: pointer;"
            @click.stop="emits('close')">
          关闭
        </BaseButton>
        <BaseButton
            size="small"
            :disabled="disabled"
            :loading="loading"
            @click.stop="submit">回复
        </BaseButton>
      </div>
    </div>

    <div class="emoticon-pack" ref="emoticonsRef" v-show="isShowEmoticons">
      <Icon icon="ic:round-close" @click.stop="isShowEmoticons = false" />
      <div class="title">经典</div>
      <div class="list">
        <img v-for="item in classicsEmoticons"
             :src="getEmojiSrc(item.high)"
             referrerpolicy="no-referrer"
             @click.stop="insert(item.name);isShowEmoticons = false">
      </div>
      <div class="emoji">
        <template v-for="item in emojiEmoticons">
          <div class="title">{{ item.title }}</div>
          <div class="list">
            <span v-for="emoji in item.list" @click.stop="insert(emoji);isShowEmoticons = false">{{ emoji }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, h, inject, onBeforeUnmount, onMounted, ref, toRef, watch} from "vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import BaseButton from "./BaseButton.vue";
import {Icon} from '@iconify/vue'
import {classicsEmoticons, DefaultVal, emojiEmoticons} from '@v2next/core/core.ts'

const props = defineProps({
  replyUser: null,
  replyFloor: null,
  useType: {
    type: String,
    default() {
      return 'reply-comment'
    }
  },
})
const {replyUser, replyFloor, useType} = props
const replyInfo = replyUser ? `@${replyUser} #${replyFloor} ` : ''
const emits = defineEmits(['close'])

const post = inject('post')
const show = inject('show')
const isNight = inject('isNight')
const pageType = inject('pageType')
const allReplyUsers = inject('allReplyUsers')
let isFocus = ref(false)
const loading = ref(false)
const uploadLoading = ref(false)
const isShowEmoticons = ref(false)
const editorId = ref('editorId_' + Date.now())
const content = ref(replyInfo)
const txtRef = ref(null)
const cursorRef = ref(null)
const emoticonsRef = ref(null)
const none = ref('<span style="white-space:pre-wrap;"> </span>')


/** 以下 Client ID 来自「V2EX_Polish」*/
const imgurClientIdPool = [
  '3107b9ef8b316f3',
  '442b04f26eefc8a',
  '59cfebe717c09e4',
  '60605aad4a62882',
  '6c65ab1d3f5452a',
  '83e123737849aa9',
  '9311f6be1c10160',
  'c4a4a563f698595',
  '81be04b9e4a08ce',
]

defineExpose({content, isFocus: () => isFocus.value})

const editorClass = computed(() => {
  return [useType, isFocus.value ? 'isFocus' : '', isNight.value ? 'isNight' : '']
})

const cursorHtml = computed(() => {
  if (!txtRef.value || !content.value) return ''
  let index = txtRef.value?.selectionStart || 0
  return content.value.substring(0, index)
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/\n/g, '<br/>')
      .replace(/\s/g, none.value);
})

const disabled = computed(() => {
  if (content.value) {
    return content.value === replyInfo
  } else {
    return true
  }
})

function drop(e) {
  e.preventDefault()
  upload(e.dataTransfer.files[0])
}

async function upload(file) {
  if (!file) return
  if (uploadLoading.value) return
  uploadLoading.value = true
  const formData = new FormData()
  formData.append('image', file)
  // 随机获取一个 Imgur Client ID。
  const randomIndex = Math.floor(Math.random() * imgurClientIdPool.length)
  const clidenId = imgurClientIdPool[randomIndex]

  // 使用详情参考 Imgur API 文档：https://apidocs.imgur.com/
  const res = await fetch('https://api.imgur.com/3/upload', {
    method: 'POST',
    headers: {Authorization: `Client-ID ${clidenId}`},
    body: formData,
  })

  uploadLoading.value = false
  if (res.ok) {
    const resData = await res.json()
    if (resData.success) {
      return insert(' ' + resData.data.link + ' ')
    }
  }
  eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '上传失败'})
}

async function submit() {
  if (disabled.value || loading.value) return
  loading.value = true

  let submit_content = content.value.replace(/\[((?!\[).)+\]/g, function (match) {
    let item = classicsEmoticons.find(v => v.name === match)
    if (item) {
      return item.low + ' '
    }
    return match
  })


  //转换上传的图片
  let show_content = content.value.replace(/https?:\/\/(i\.)?imgur\.com\/((?!http).)+\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG)/g, function (match) {
    return `<img src="${match}" data-originUrl="${match}" data-notice="这个img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`
  })

  //转换表情
  show_content = show_content.replace(/\[((?!\[).)+\]/g, function (match) {
    let item = classicsEmoticons.find(v => v.name === match)
    if (item) {
      return `<a target="_blank" href="${item.low}" rel="nofollow noopener"><img src="${item.low}" class="embedded_image" rel="noreferrer"></a> `
    }
    return match
  })

  let matchUsers = show_content.match(/@([\w]+?[\s])/g)
  if (matchUsers) {
    matchUsers.map(i => {
      let username = i.replace('@', '').replace(' ', '')
      show_content = show_content.replace(username, `<a href="/member/${username}">${username}</a>`)
    })
  }

  show_content = show_content.replaceAll('\n', '<br/>')

  // loading.value = false
  // console.log('show_content', show_content)

  let item = {
    thankCount: 0,
    isThanked: false,
    isOp: post.value.username === window.user.username,
    isDup: false,
    id: Date.now(),
    username: window.user.username,
    avatar: window.user.avatar,
    date: '几秒前',
    floor: post.value.replyCount + 1,
    reply_content: show_content ?? '',
    children: [],
    replyUsers: replyUser ? [replyUser] : [],
    replyFloor: replyFloor || -1,
    level: useType === 'reply-comment' ? 1 : 0
  }

  item.hideCallUserReplyContent = item.reply_content
  if (item.replyUsers.length === 1) {
    item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => '')
  }
  // console.log('回复', item)
  // loading.value = false
  // return

  // loading.value = false
  // content.value = replyInfo
  // eventBus.emit(CMD.REFRESH_ONCE,)
  // eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '回复成功'})
  // eventBus.emit(CMD.ADD_REPLY, item)
  // emits('close')
  // return console.log('item', item)

  let url = `${location.origin}/t/${post.value.id}`
  $.post(url, {content: submit_content, once: post.value.once}).then(
      // $.post(url, {content: submit_content, once: 123}).then(
      res => {
        // console.log('回复', res)
        loading.value = false
        let r = res.search('你上一条回复的内容和这条相同')
        if (r > -1) return eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '你上一条回复的内容和这条相同'})

        r = res.search('请不要在每一个回复中都包括外链，这看起来像是在 spamming')
        if (r > -1) return eventBus.emit(CMD.SHOW_MSG, {
          type: 'error',
          text: '请不要在每一个回复中都包括外链，这看起来像是在 spamming'
        })

        let r2 = res.search('创建新回复')
        if (r2 > -1) {
          eventBus.emit(CMD.REFRESH_ONCE, res)
          eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '回复出现了问题，请使用原版进行回复'})
          let clientWidth = window.document.body.clientWidth
          let windowWidth = 1200
          let left = clientWidth / 2 - windowWidth / 2
          let newWin = window.open("创建新回复", "", `width=${windowWidth},height=600,left=${left},top=100`);
          newWin.document.write(res);

          let loop = setInterval(function () {//监听子页面关闭事件,轮询时间1000毫秒
            if (newWin.closed) {
              clearInterval(loop);
              eventBus.emit(CMD.REFRESH_POST)
            }
          }, 1000);
          return
        }
        content.value = replyInfo
        emits('close')
        eventBus.emit(CMD.REFRESH_ONCE, res)
        eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '回复成功'})
        eventBus.emit(CMD.ADD_REPLY, item)
      },
      err => {
        console.log('err', err)
        loading.value = false
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '回复失败'})
      }
  ).catch(r => {
    console.log('catch', r)
  })
}

function getEmojiSrc(url) {
  return window.config.replaceImgur ? DefaultVal.imgurProxy + url : url;
}

function showEmoticons(e) {
  if (isShowEmoticons.value) {
    return isShowEmoticons.value = false
  }
  let rect = e.currentTarget.getBoundingClientRect()
  emoticonsRef.value.style.left = rect.left + 30 + 'px'
  emoticonsRef.value.style.bottom = window.innerHeight - rect.top - 20 + 'px'
  isShowEmoticons.value = true
}

function off() {
  eventBus.emit(CMD.SHOW_CALL, {show: false})
  eventBus.off(CMD.SET_CALL)
}

function checkHeight() {
  txtRef.value.style.height = 0;
  txtRef.value.style.height = (txtRef.value.scrollHeight) + "px";
}

function insert(str) {
  let cursorPos = txtRef.value.selectionStart
  let start = content.value.slice(0, cursorPos)
  let end = content.value.slice(cursorPos, content.value.length)
  content.value = start + str + end
  let moveCursorPos = start.length + str.length
  setTimeout(() => {
    txtRef.value.focus()
    txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
    checkHeight()
  })
}

function showCallPopover(text) {
  // console.log('show')
  // let r = getPosition(txtRef.value)
  let r = cursorRef.value.getBoundingClientRect()
  // console.log('r', r)
  eventBus.emit(CMD.SHOW_CALL, {show: true, top: r.top, left: r.left, text})
  eventBus.off(CMD.SET_CALL)
  eventBus.on(CMD.SET_CALL, e => {
    let cursorPos = txtRef.value.selectionStart
    let start = content.value.slice(0, cursorPos)
    let end = content.value.slice(cursorPos, content.value.length)
    let lastCallPos = start.lastIndexOf('@')
    // console.log('e', e)
    start = content.value.slice(0, lastCallPos + 1)
    if (e === '管理员') {
      e = 'Livid @Kai @Olivia @GordianZ @sparanoid @drymonfidelia'
    }
    if (e === '所有人') {
      e = allReplyUsers.value.map((v, i) => {
        if (i) return '@' + v
        else return v
      }).join(' ')
    }
    content.value = start + e + ' ' + end
    let moveCursorPos = start.length + e.length + 1
    // console.log(moveCursorPos)
    setTimeout(() => {
      txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
      checkHeight()
    })
    eventBus.off(CMD.SET_CALL)
  })
}

function onKeydown(e) {
  let code = e.keyCode
  switch (code) {
      //删除
    case 8:
      //如果最后一个字符是@，那么就关闭
      if (content.value === '@') {
        off()
      }
      break
    case 37:
    case 38:
    case 39:
    case 40:
      setTimeout(() => onInput({data: ''}), 100)
      break
      //esc
    case 27:
      e.preventDefault();
      e.stopPropagation()
      e.stopImmediatePropagation()
      return false
    case 13:
      //Ctrl + Enter发送
      if (e.ctrlKey) submit()
      //Command + Enter发送
      if (e.metaKey) submit()
      break
  }
}

function onInput(e) {
  let cursorPos = txtRef.value.selectionStart
  if (!content.value) return
  // console.log('cursorPos', cursorPos, content.value)
  // console.log('e.data', e.data)
  if (e.data === ' ') {
    return off()
  }
  if (e.data === '@') {
    if (content.value.length !== 1) {
      if (content.value[cursorPos - 2] === ' ' || content.value[cursorPos - 2] === '\n') {
        return showCallPopover('')
      }
    } else {
      return showCallPopover('')
    }
    off()
  } else {
    checkHeight()
    // console.log('当前光标位置', cursorPos)
    let judgeStr = content.value.slice(0, cursorPos)
    // console.log('判断的字符串', judgeStr)
    let lastCallPos = judgeStr.lastIndexOf('@')
    // console.log('最后一个@的位置', lastCallPos)
    if (lastCallPos === -1) {
      return off()
    }
    let callStr = judgeStr.slice(lastCallPos, cursorPos)
    // console.log('callStr', callStr)
    let hasSpace = callStr.includes(' ')
    // console.log('是否有空格', hasSpace)
    if (hasSpace) {
      off()
    } else {
      if (lastCallPos === 0) {
        return showCallPopover(callStr.replace('@', ''))
      }
      if (content.value.length !== 1) {
        if (content.value[lastCallPos - 1] === ' ' || content.value[lastCallPos - 1] === '\n') {
          return showCallPopover(callStr.replace('@', ''))
        }
      } else {
        return showCallPopover(callStr.replace('@', ''))
      }
      off()
      // show(callStr.replace('@', ''))
    }
  }
}

// 监听paste事件
function onPaste(e) {
  // console.log('onPaste', e)
  const dataTransferItemList = e.clipboardData.items;
  // 过滤非图片类型
  const items = [].slice.call(dataTransferItemList).filter(function (item) {
    return item.type.indexOf('image') !== -1;
  });
  if (items.length === 0) {
    return;
  }
  const dataTransferItem = items[0];
  const blob = dataTransferItem.getAsFile();
  upload(blob);
}

function onBlur() {
  // console.log('onBlur',)
  // eventBus.emit(CMD.SHOW_CALL, {show: false})
  // eventBus.off(CMD.SET_CALL)
  document.removeEventListener('paste', onPaste);
  isFocus.value = false
}

function onFocusin() {
  // console.log('onFocusin',)
  document.addEventListener('paste', onPaste);
}

//如果主题详情关闭了，那么把表情框也关了
watch(() => show, (n) => {
  if (n.value) isShowEmoticons.value = false
}, {deep: true})

onMounted(() => {
  $(`.${editorId.value}`).each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  });
  if (useType === 'reply-comment') {
    txtRef.value && txtRef.value.focus()
  }
})

onBeforeUnmount(() => {
  $(`.${editorId.value}`).off()
})

</script>

<style scoped lang="less">
@import "../assets/less/variable.less";

.post-editor-wrapper {
  width: 100%;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  transition: all .3s;
  color: var(--color-font);

  &.reply-post {
    .post-editor {
      border: 1px solid var(--color-line);
    }

    &.isFocus {
      .post-editor {
        border: 1px solid var(--color-active);
      }
    }
  }

  &.reply-comment {
    border-radius: var(--box-border-radius);
    overflow: hidden;
    border: 1px solid var(--color-line);

    &.isFocus {
      border: 1px solid var(--color-active);
    }

    .toolbar {
      background: var(--color-editor-toolbar);
    }
  }

  .post-editor {
    border-radius: var(--box-border-radius);
    transition: border .3s;
    width: 100%;
    max-width: 100%;
    padding: .6rem 1.4rem;
    box-sizing: border-box;
    outline: none;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1.4rem;
    min-height: 13rem;
    resize: none;
    background: var(--box-background-color);
    color: var(--color-font-pure);
    border: 1px solid transparent;
  }

  .toolbar {
    box-sizing: border-box;
    padding: .5rem 1rem;
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 2.6rem;

      svg {
        cursor: pointer;
      }

      .upload {
        @w: 2.6rem;
        width: @w;
        height: @w;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        input {
          width: @w;
          height: @w;
          cursor: pointer;
          position: absolute;
          opacity: 0;
        }
      }
    }

    span {
      color: gray;
      font-size: 1.3rem;
    }
  }

  .get-cursor {
    .post-editor();
    position: absolute;
    top: 0;
    z-index: -100;
  }

  .emoticon-pack {
    z-index: 999999999;
    border-radius: 1rem;
    padding: 1rem;
    width: 31rem;
    max-width: 31rem;
    height: 30rem;
    max-height: 30rem;
    overflow: auto;
    background: var(--color-third-bg);
    border: 1px solid var(--color-font-3);
    box-shadow: 0 9px 24px -3px rgb(0 0 0 / 6%), 0 4px 8px -1px rgb(0 0 0 /12%);
    position: fixed;
    bottom: 11rem;
    left: 14rem;

    svg {
      cursor: pointer;
      position: absolute;
      right: .8rem;
      font-size: 2.4rem;
    }

    .list {
      margin: 1rem 0;
      display: flex;
      flex-wrap: wrap;
    }

    img {
      cursor: pointer;
      width: calc(100% / 7);
      padding: .5rem;
      box-sizing: border-box;
    }

    span {
      width: calc(100% / 7);
      display: inline-block;
      cursor: pointer;
      font-size: 2.3rem;
      text-align: center;
    }
  }
}

</style>