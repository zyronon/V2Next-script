<template>
  <div class="Author" :class="{expand:!modelValue}">
    <div class="Author-left">
      <Icon
          v-if="!modelValue"
          @click="$emit('update:modelValue',true)"
          color="#177EC9"
          class="expand-icon"
          icon="gravity-ui:chevrons-expand-up-right"/>
      <a class="avatar" v-if="config.viewType !== 'simple'" :href="`/member/${comment.username}`">
        <img :src="comment.avatar" alt="">
      </a>
      <span class="texts">
        <strong>
          <a :href="`/member/${comment.username}`" class="username" :class="{'dark':isNight}">{{ comment.username }}</a>
        </strong>
        <div v-if="comment.isOp" class="owner">OP</div>
        <div v-if="comment.isDup" class="dup">DUP</div>
        <div v-if="comment.isMod" class="mod">MOD</div>
        <span class="ago">{{ comment.date }}</span>
        <template v-if="isLogin && config.openTag">
            <span class="my-tag" v-for="i in myTags">
              <i class="fa fa-tag"></i>
              <span>{{ i }}</span>
              <i class="fa fa-trash-o remove" @click="removeTag(i)"></i>
            </span>
             <span class="add-tag ago" @click="addTag" title="添加标签">+</span>
        </template>
      </span>
    </div>
    <div class="Author-right">
      <div class="toolbar" v-if="isLogin">
        <PopConfirm title="确认隐藏这条回复?" @confirm="$emit('hide')">
          <div class="tool">
            <Icon icon="fluent:eye-hide-24-regular"/>
            <span>隐藏</span>
          </div>
        </PopConfirm>
        <div class="tool" v-if="context" @click="showRelationReply">
          <Icon icon="iconoir:page-search"/>
          <span>上下文</span>
        </div>
        <div class="tool" v-if="type === 'top'" @click="jump">
          <Icon icon="icon-park-outline:to-bottom"/>
          <span>跳转</span>
        </div>
        <div class="tool" @click="checkIsLogin('reply')">
          <Icon icon="mynaui:message"/>
          <span>回复</span>
        </div>
        <Point
            v-show="!comment.thankCount"
            :item="pointInfo"
            @addThank="addThank"
            @recallThank="recallThank"
            :api-url="'reply/'+comment.id"
        />
      </div>
      <Point
          v-show="comment.thankCount"
          :item="pointInfo"
          @addThank="addThank"
          @recallThank="recallThank"
          :api-url="'reply/'+comment.id"
      />
      <div class="floor" :class="{isDev}">{{ (false ? `a${comment.floor}-` : comment.floor) }}</div>
    </div>
  </div>
</template>
<script>
import Point from "./Point.vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import PopConfirm from "./PopConfirm.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "Author",
  components: {PopConfirm, Point, Icon},
  inject: ['isLogin', 'tags', 'config', 'isNight'],
  props: {
    modelValue: false,
    comment: {
      type: Object,
      default() {
        return {}
      }
    },
    type: {
      type: String,
      default() {
        return 'list'
      }
    },
  },
  computed: {
    isDev() {
      return import.meta.env.DEV
    },
    pointInfo() {
      return {
        isThanked: this.comment.isThanked,
        thankCount: this.comment.thankCount,
        username: this.comment.username
      }
    },
    myTags() {
      return this.tags[this.comment.username] ?? []
    },
    context() {
      return this.comment.replyUsers.length
    }
  },
  methods: {
    jump() {
      eventBus.emit(CMD.JUMP, this.comment.floor)
    },
    showRelationReply() {
      if (!this.comment.replyUsers.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '该回复无上下文'})
        return
      }
      eventBus.emit(CMD.RELATION_REPLY, {
        left: this.comment.replyUsers,
        right: this.comment.username,
        rightFloor: this.comment.floor
      })
    },
    addTag() {
      eventBus.emit(CMD.ADD_TAG, this.comment.username)
    },
    removeTag(tag) {
      eventBus.emit(CMD.REMOVE_TAG, {username: this.comment.username, tag})
    },
    checkIsLogin(emitName = '') {
      if (!this.isLogin) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
        return false
      }
      this.$emit(emitName)
      return true
    },
    addThank() {
      eventBus.emit(CMD.CHANGE_COMMENT_THANK, {id: this.comment.id, type: 'add'})
    },
    recallThank() {
      eventBus.emit(CMD.CHANGE_COMMENT_THANK, {id: this.comment.id, type: 'recall'})
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable";

@mr: 0.6rem;
.Author {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.2rem;
  position: relative;

  &.expand {
    margin-bottom: 0;
  }

  .Author-left {
    display: flex;
    align-items: center;
    max-width: 65%;
    word-break: break-all;

    .username {
      font-size: 1.4rem;
      margin-right: @mr;
    }

    .expand-icon {
      cursor: pointer;
      margin-right: @mr;
      width: 2rem;
      height: 2rem;
      transform: rotate(90deg);
    }

    .avatar {
      margin-right: 0.8rem;
      display: flex;

      img {
        @w: 2.8rem;
        width: @w;
        height: @w;
        border-radius: 0.4rem;
      }

      //border-radius: 50%;
    }

    @color: #1484cd;
    @dup-color: red;

    .texts {
      flex: 1;
    }

    .owner {
      display: inline-block;
      background-color: transparent;
      color: @color;
      border-radius: .3rem;
      padding: 0 .3rem;
      cursor: default;
      border: 2px solid @color;
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: @mr;
      transform: scale(.8);
    }

    .dup {
      display: inline-block;
      background-color: transparent;
      color: @dup-color;
      border-radius: .3rem;
      padding: 0 .3rem;
      cursor: default;
      border: 2px solid @dup-color;
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: @mr;
      transform: scale(.8);
    }

    .mod {
      .owner;
      background: @color;
      color: white;
      margin-right: @mr;
    }

  }

  &:hover {
    .add-tag {
      display: inline-block;
    }
  }

  .Author-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;

    .toolbar {
      display: flex;
      align-items: center;
      color: var(--color-gray);
      opacity: 0;
      gap: .2rem;

      &:hover {
        opacity: 1;
      }
    }

    .isDev {
      //color: black !important;
    }
  }
}
</style>
