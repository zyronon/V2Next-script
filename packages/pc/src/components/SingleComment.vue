<template>
  <div class="comment" :class="{isSimple:config.viewType === 'simple'}" ref="comment">
    <a class="avatar" v-if="!isRight" :href="`/member/${comment.username}`">
      <img :src="comment.avatar" alt="">
    </a>
    <div class="comment-body" :class="{isRight}">
      <div class="texts">
        <div class="point" v-if="comment.thankCount && isRight">
          <Icon v-if="comment.isThanked" color="rgb(224,42,42)" icon="icon-park-solid:like"/>
          <Icon v-else :color="!comment.thankCount ? null:'rgb(224,42,42)'" icon="icon-park-outline:like"/>
          <div class="link-num">{{ comment.thankCount }}</div>
        </div>
        <template v-if="isLogin && config.openTag  && isRight">
            <span class="my-tag" v-for="i in myTags">
              <i class="fa fa-tag"></i>
              <span>{{ i }}</span>
            </span>
        </template>
        <span class="ago" v-if="isRight">{{ comment.date }}</span>
        <div v-if="comment.isMod && isRight" class="mod">MOD</div>
        <div v-if="comment.isOp && isRight" class="owner">OP</div>
        <a :href="`/member/${comment.username}`" class="username">{{ comment.username }}</a>
        <div v-if="comment.isOp && !isRight" class="owner">OP</div>
        <div v-if="comment.isMod && !isRight" class="mod">MOD</div>
        <span class="ago" v-if="!isRight">{{ comment.date }}</span>
        <template v-if="isLogin && config.openTag && !isRight">
            <span class="my-tag" v-for="i in myTags">
              <i class="fa fa-tag"></i>
              <span>{{ i }}</span>
            </span>
        </template>
        <div class="point" v-if="comment.thankCount && !isRight">
          <Icon v-if="comment.isThanked" color="rgb(224,42,42)" icon="icon-park-solid:like"/>
          <Icon v-else :color="!comment.thankCount ? null:'rgb(224,42,42)'" icon="icon-park-outline:like"/>
          <div class="link-num">{{ comment.thankCount }}</div>
        </div>
      </div>
      <BaseHtmlRender class="reply_content" :html="comment.reply_content"/>
    </div>
    <a class="avatar" v-if="isRight" :href="`/member/${comment.username}`">
      <img :src="comment.avatar" alt="">
    </a>
    <div class="Author-right">
      <div class="floor">{{ comment.floor }}</div>
      <div class="tool jump" @click.stop="jump">
        <span>跳转</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import BaseHtmlRender from "./BaseHtmlRender.vue";
import {computed, inject} from "vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import {Icon} from "@iconify/vue";

const config = inject('config')
const isLogin = inject('isLogin')
const tags = inject('tags')
const props = defineProps({
  comment: {
    reply_content: ''
  },
  isRight: {
    type: Boolean,
    default() {
      return false
    }
  }
})
const myTags = computed(() => {
  return tags[props.comment.username] ?? []
})

function jump() {
  eventBus.emit(CMD.JUMP, props.comment.floor)
}
</script>

<style scoped lang="less">
@import "../assets/less/variable.less";

.comment {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--color-line);

  &.isSimple {
    .avatar {
      display: none;
    }

    .reply_content {
      margin-top: 0.5rem !important;
    }
  }

  .avatar {
    display: flex;

    img {
      @w: 3.8rem;
      width: @w;
      height: @w;
      border-radius: .3rem;
    }
  }

  .comment-body {
    flex: 1;
    display: flex;
    flex-direction: column;

    .texts {
      display: flex;
      align-items: center;
    }

    .reply_content {
      margin-top: 1rem;
      max-width: calc(100% - 5rem);
    }
  }

  .isRight {
    align-items: flex-end;

    .owner, .mod, .username {
      margin: 0 0 0 1rem;
    }
  }

  .Author-right {
    display: flex;
    flex-direction: column;
    align-items: center;

    .floor {
      margin-left: 0;
    }

    .jump {
      color: #929596;
      margin-top: .4rem;
      font-size: 1.4rem;
    }
  }

  .point {
    margin: 0 .5rem;
    font-size: 1.6rem;
    display: flex;
    gap: .5rem;
    align-items: center;
    font-weight: bold;
    color: black;
  }
}


</style>
