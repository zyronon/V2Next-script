<script setup lang="ts">
import { Icon } from "@iconify/vue";
import FromBottomDialog from "@/components/Modal/FromBottomDialog.vue";
import { copy } from '@/utils/index'
import { inject, reactive, ref, watch } from "vue";
import { Post } from "@v2next/core/types";
import eventBus from '@/utils/eventBus'
import { CMD } from '@/utils/type'
import { PageType } from "@v2next/core/types";
import BaseLoading from "@/components/BaseLoading.vue";

let fs = ref(0)
let state = reactive({
  timer: null,
  loading: false,
  loading1: false,
  loading2: false,
  loading3: false,
  loading4: false,
})
const props = defineProps<{
  modelValue: boolean
  post: Post
}>()
const emit = defineEmits<{
  close: [],
  reply: [],
  refresh: [],
  merge: [val: any],
  'update:modelValue': [val: boolean]
}>()
const isLogin = inject<boolean>('isLogin')
const pageType: any = inject('pageType')
const config: any = inject('config')

function close() {
  emit('close')
  emit('update:modelValue', false)
}

function checkIsLogin() {
  if (!isLogin.value) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
    return false
  }
  return true
}

async function copyLink() {
  let text = props.post.url
  if (await copy(text)) {
    close()
  }
}

async function copyContent() {
  let text = props.post.headerTemplate
  text = $(`<div>${text}</div>`).text()
  if (await copy(text)) {
    close()
  }
}

function share() {
  let username = window.user?.username ?? ''
  let url = `https://twitter.com/intent/tweet?url=${location.origin}/t/${props.post.id}?r=${username}&related=v2ex&text=${props.post.title}`
  window.open(url, '_blank',);
  close()
}

function reply() {
  if (!checkIsLogin()) return
  emit('reply')
  close()
}

async function toggleIgnore() {
  if (!checkIsLogin()) return
  if (state.loading2) return
  //先单独保存，eventBus.emit(CMD.IGNORE)会把current清空。isIgnore也没了
  let isIgnore = props.post.isIgnore
  let url = `${window.baseUrl}/${isIgnore ? 'unignore' : 'ignore'}/topic/${props.post.id}?once=${props.post.once}`
  state.loading2 = true
  let apiRes = await window.win().fetch(url)
  state.loading2 = false

  if (apiRes.redirected) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: isIgnore ? '取消成功' : '忽略成功'})
  } else {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '忽略失败'})
  }

  if (isIgnore) {
    //取消忽略
    eventBus.emit(CMD.MERGE, {isIgnore: !isIgnore})
    //因为是引用传递，这里不需要再merge。不然会取反又取反
    // emit('merge', {isIgnore: !props.post.isIgnore})
  } else {
    //忽略
    //如果是帖子详情页，那么直接跳转到首页
    if (pageType.value === PageType.Post) {
      location.href = location.origin
    } else {
      eventBus.emit(CMD.IGNORE)
    }
  }
  eventBus.emit(CMD.REFRESH_ONCE)
  close()
}

async function toggleFavorite() {
  if (config.value.collectBrowserNotice) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '别忘记添加到书签哦'})
  }
  if (!checkIsLogin()) return
  if (state.loading) return
  // return eventBus.emit('merge', 'isFavorite')
  let isFavorite = props.post.isFavorite
  let url = `${window.baseUrl}/${isFavorite ? 'unfavorite' : 'favorite'}/topic/${props.post.id}?once=${props.post.once}`
  state.loading = true
  let apiRes = await fetch(url)
  state.loading = false
  if (apiRes.redirected) {
    let htmlText = await apiRes.text()
    if (htmlText.search(isFavorite ? '加入收藏' : '取消收藏')) {
      eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: isFavorite ? '取消成功' : '收藏成功'})
      eventBus.emit(CMD.MERGE, {collectCount: isFavorite ? (props.post.collectCount - 1) : (props.post.collectCount + 1)})
      eventBus.emit(CMD.REFRESH_ONCE, htmlText)
      eventBus.emit(CMD.MERGE, {isFavorite: !isFavorite})
      return close()
    }
  }
  eventBus.emit(CMD.REFRESH_ONCE)
  eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '操作失败，请重试'})
}

async function report() {
  if (!checkIsLogin()) return
  if (!isLogin.value) return
  if (state.loading1) return
  let isReport = props.post.isReport
  if (isReport) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '你已对本主题进行了报告'})
    return
  }
  let url = `${location.origin}/report/topic/${props.post.id}?once=${props.post.once}`
  state.loading1 = true
  let apiRes = await fetch(url)
  state.loading1 = false
  if (apiRes.redirected) {
    let htmlText = await apiRes.text()
    if (htmlText.search('你已对本主题进行了报告')) {
      eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '你已对本主题进行了报告'})
      eventBus.emit(CMD.REFRESH_ONCE, htmlText)
      eventBus.emit(CMD.MERGE, {isReport: !isReport})
      return close()
    }
  }
  eventBus.emit(CMD.REFRESH_ONCE)
  eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '操作失败，请重试'})
}

async function thank() {
  if (!isLogin.value) {
    return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
  }
  if (props.post.username === window.user.username) {
    return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '不能感谢自己'})
  }
  let isThanked = props.post.isThanked
  if (isThanked) {
    return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '已经感谢过了'})
  }
  if (state.loading4) return
  eventBus.emit(CMD.MERGE, {isThanked: !isThanked})
  //https://www.v2ex.com/thank/topic/886147?once=38719
  let url = `${window.baseUrl}/thank/reply/${props.post.id}?once=${props.post.once}`
  state.loading4 = true
  let apiRes = await fetch(url)
  state.loading4 = false

  // $.post(url).then(res => {
  //   if (!res.success) {
  //     eventBus.emit(CMD.MERGE, {isThanked: !isThanked})
  //     eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: res.message})
  //   }
  //   eventBus.emit(CMD.REFRESH_ONCE, res.once)
  // }, err => {
  //   state.loading4 = false
  //   eventBus.emit(CMD.MERGE, {isThanked: !isThanked})
  //   eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '感谢失败'})
  //   eventBus.emit(CMD.REFRESH_ONCE)
  // })
  // close()
}
</script>

<template>
  <from-bottom-dialog page-id="post-detail"
                      height="40rem"
                      :model-value="modelValue"
                      @cancel="emit('update:modelValue',false)">
    <div class="wrapper">
      <div class="options">
        <div class="item" @click="share">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="ph:share-fat-fill"/>
          </div>
          <span>分享</span>
        </div>
        <div class="item" @click="toggleIgnore">
          <div class="icon-wrap">
            <BaseLoading v-if="state.loading2"/>
            <template v-else>
              <Icon v-if="post.isIgnore" color="rgb(224,42,42)" icon="mdi:eye-off-outline"/>
              <Icon v-else color="rgb(57,174,85)" icon="mdi:eye-outline"/>
            </template>
          </div>
          <span>{{ post.isIgnore ? '取消' : '' }}忽略</span>
        </div>
        <div class="item" @click="reply">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="mynaui:message"/>
          </div>
          <span>回复</span>
        </div>
        <div class="item" @click="thank">
          <div class="icon-wrap">
            <Icon v-if="post.isThanked" icon="flat-color-icons:like"/>
            <Icon v-else color="rgb(57,174,85)" icon="icon-park-outline:like"/>
          </div>
          <span>{{ post.isThanked ? '已' : '' }}感谢</span>
        </div>
        <div class="item" @click="toggleFavorite">
          <div class="icon-wrap">
            <BaseLoading v-if="state.loading"/>
            <template v-else>
              <Icon v-if="post.isFavorite" color="rgb(224,42,42)" icon="iconoir:star-solid"/>
              <Icon v-else color="rgb(57,174,85)" icon="iconoir:star"/>
            </template>
          </div>
          <span>{{ post.isFavorite ? '取消' : '' }}收藏</span>
        </div>
        <div class="item" @click="report"
             :class="[post.isReport && 'disabled']"
        >
          <div class="icon-wrap">
            <BaseLoading v-if="state.loading1"/>
            <template v-else>
              <Icon color="black" icon="solar:danger-triangle-outline"/>
            </template>
          </div>
          <span>{{ post.isReport ? '已报告' : '报告问题' }}</span>
        </div>
        <div class="item" @click="copyLink">
          <div class="icon-wrap">
            <Icon color="black" icon="solar:link-broken"/>
          </div>
          <span>复制链接</span>
        </div>
        <div class="item" @click="copyContent">
          <div class="icon-wrap">
            <Icon color="black" icon="octicon:copy-24"/>
          </div>
          <span>复制内容</span>
        </div>
        <div class="item" @click="emit('refresh'),close()">
          <div class="icon-wrap">
            <Icon color="black" icon="ion:refresh"/>
          </div>
          <span>刷新</span>
        </div>
      </div>
      <div class="font-size">
        <div class="steps">
          <div class="step" :class="[fs=== 0 && 'active']" @click="fs = 0">
            <div class="text" style="font-size: 1.2rem;">小</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 1 && 'active']" @click="fs = 1">
            <div class="text">标准</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 2 && 'active']" @click="fs = 2">
            <div class="text" style="font-size: 1.8rem;">大</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 3 && 'active']" @click="fs = 3">
            <div class="text" style="font-size: 2.2rem;">特大</div>
            <div class="point"></div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="cancel" @click="close">取消</div>
    </div>
  </from-bottom-dialog>
</template>

<style scoped lang="less">

.wrapper {
  .options {
    padding: 3rem 2rem;
    padding-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: space-between;
    gap: 2rem;

    .item {
      //margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: grey;
      font-size: 1.2rem;

      &.disabled {
        opacity: .5;

        svg {
          color: gray !important;
        }
      }

      .icon-wrap {
        margin-bottom: .5rem;
        @w: 15vw;
        width: 100%;
        height: @w;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--color-second-bg);
        //background: var(--color-main-bg);
        border-radius: 1rem;

        svg {
          font-size: 3rem;
        }
      }
    }
  }

  .steps {
    width: 100%;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    .step {
      width: 100%;
      font-size: 20rpx;
      color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 4.8rem;
      gap: 1.5rem;
      color: gray;

      .text {
        font-size: 1.4rem;
      }

      .point {
        @w: 6px;
        border-radius: 50%;
        min-width: @w;
        min-height: @w;
        background: #adadad;
      }

      &.active {
        color: black;

        .point {
          box-shadow: 0 0 1px 1px #f1f1f1;
          background: white;
          transform: scale(3);
        }
      }
    }
  }

  .font-size {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .line {
      position: relative;
      z-index: 1;
      margin-top: -4px;
      height: 2px;
      width: 76%;
      background: #dadada;
    }
  }

  .cancel {
    border-top: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    height: 5rem;
    color: rgb(100, 111, 129);
  }
}

</style>