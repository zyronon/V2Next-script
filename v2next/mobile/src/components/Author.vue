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
      <div class="info">
        <div class="top">
          <span class="texts">
            <strong>
              <a :href="`/member/${comment.username}`" class="username" :class="{'dark':isNight}">{{
                  comment.username
                }}</a>
            </strong>
            <div v-if="comment.isOp" class="owner">OP</div>
            <div v-if="comment.isDup" class="dup">DUP</div>
            <div v-if="comment.isMod" class="mod">MOD</div>
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
        <div>
          <span class="floor">{{ comment.floor }}楼</span>
          <span class="ago">{{ comment.date }}</span>
        </div>
      </div>
    </div>
    <div class="Author-right">
      <Point
          v-show="comment.thankCount"
          :item="pointInfo"
          @addThank="addThank"
          @recallThank="recallThank"
          :api-url="'reply/'+comment.id"
      />
      <MoreIcon @click.stop="eventBus.emit(CMD.SHOW_COMMENT_OPTIONS,{...comment, top: type === 'top'})"/>
    </div>
  </div>
</template>
<script>
import Point from "./Point.vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import MoreIcon from "@/components/MoreIcon.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "Author",
  components: {MoreIcon, Point, Icon},
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
    eventBus() {
      return eventBus
    },
    CMD() {
      return CMD
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
  },
  methods: {
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

    .info {
      display: flex;
      flex-direction: column;

      .top {

      }
    }

    .username {
      font-size: 1.4rem;
      margin-right: 1rem;
    }

    .expand-icon {
      margin-right: .8rem;
      width: 2.4rem;
      height: 2.4rem;
      transform: rotate(90deg);
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
      margin-right: 1rem;
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
      margin-right: 1rem;
      transform: scale(.8);
    }

    .mod {
      .owner;
      background: @color;
      color: white;
      margin-right: 1rem;
    }
  }

  .Author-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
  }
}
</style>
