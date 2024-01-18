<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { Icon } from "@iconify/vue";
import FromBottomDialog from "@/components/Modal/FromBottomDialog.vue";
import { CommentDisplayType } from "@v2next/core/types";
import { copy } from '@/utils/index'
import eventBus from '@/utils/eventBus'
import { CMD } from '@/utils/type'

const props = defineProps<{
  modelValue: boolean,
  comment: any
  post: any
}>()
const emit = defineEmits<{
  close: [],
  reply: [],
  merge: [val: any],
  'update:modelValue': [val: boolean],
}>()

const config: any = inject('config')
const isLogin = inject<boolean>('isLogin')

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

async function handleCopy() {
  let text = props.comment.reply_content
  if (config.value.commentDisplayType === CommentDisplayType.FloorInFloorNoCallUser) {
    text = props.comment.hideCallUserReplyContent
  }
  text = $(`<div>${text}</div>`).text()
  if (await copy(text)) {
    close()
  }
}

async function hide() {
  if (!checkIsLogin()) return
  let url = `${window.baseUrl}/ignore/reply/${props.comment.id}?once=${props.post.once}`
  eventBus.emit(CMD.REMOVE, props.comment.floor)
  close()
  $.post(url).then(res => {
    eventBus.emit(CMD.REFRESH_ONCE)
    eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '隐藏成功'})
  }, err => {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '隐藏成功,仅本次有效（接口调用失败！）'})
  })
}

function jump() {
  eventBus.emit(CMD.JUMP, props.comment.floor)
  close()
}

function showRelationReply() {
  if (!props.comment.replyUsers.length) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '该回复无上下文'})
    return
  }
  //TODO
  eventBus.emit(CMD.RELATION_REPLY, {
    left: props.comment.replyUsers,
    right: props.comment.username,
    rightFloor: props.comment.floor
  })
  close()
}

function recallThank() {
  eventBus.emit(CMD.CHANGE_COMMENT_THANK, {id: props.comment.id, type: 'recall'})
}

function thank() {
  if (!checkIsLogin()) return
  if (props.comment.username === window.user.username) {
    return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '不能感谢自己'})
  }
  if (props.comment.isThanked) {
    return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '已经感谢过了'})
  }
  eventBus.emit(CMD.CHANGE_COMMENT_THANK, {id: props.comment.id, type: 'add'})
  //https://www.v2ex.com/thank/topic/886147?once=38719
  let url = `${window.baseUrl}/thank/reply/${props.comment.id}?once=${props.post.once}`
  $.post(url).then(res => {
    if (!res.success) {
      recallThank()
      eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: res.message})
    }
    eventBus.emit(CMD.REFRESH_ONCE, res.once)
  }, err => {
    recallThank()
    eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '感谢失败'})
    eventBus.emit(CMD.REFRESH_ONCE)
  })
  close()
}

</script>

<template>
  <from-bottom-dialog
      page-id="post-detail"
      height="40rem"
      :model-value="modelValue"
      @cancel="emit('update:modelValue',false)">
    <div class="wrapper">
      <div class="options">
        <div class="item" @click="hide">
          <div class="icon-wrap">
            <Icon icon="solar:forbidden-circle-outline"/>
          </div>
          <span>忽略</span>
        </div>
        <div class="item" @click="handleCopy">
          <div class="icon-wrap">
            <Icon icon="octicon:copy-24"/>
          </div>
          <span>复制</span>
        </div>
        <div class="item"
             @click="showRelationReply"
             :class="[!comment.replyUsers.length && 'disabled']">
          <div class="icon-wrap">
            <Icon icon="iconoir:page-search"/>
          </div>
          <span>上下文</span>
        </div>
        <div class="item"
             @click="thank"
             :class="[comment.isThanked && 'full']">
          <div class="icon-wrap">
            <Icon v-if="comment.isThanked" icon="icon-park-solid:like"/>
            <Icon v-else icon="icon-park-outline:like"/>
          </div>
          <span>{{ comment.isThanked ? '已' : ''}}感谢</span>
        </div>
        <div class="item" @click="emit('reply')">
          <div class="icon-wrap">
            <Icon icon="mynaui:message"/>
          </div>
          <span>回复</span>
        </div>
        <div class="item" v-if="comment.top" @click="jump">
          <div class="icon-wrap">
            <Icon icon="icon-park-outline:to-bottom"/>
          </div>
          <span>跳转</span>
        </div>
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

      &.full {
        svg {
          color: rgb(224, 42, 42) !important;
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
          color: rgb(57, 174, 85);
        }
      }
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