<template>
  <div class="comment" :class="myClass" ref="comment" :data-floor="floor">
    <Author v-model="expand"
            :comment="modelValue"
            :type="type"
    />
    <div v-if="cssStyle && !expand" class="more ago" @click="expand = !expand">
      由于嵌套回复层级太深，自动将后续回复隐藏
    </div>
    <div class="comment-content-w" v-if="expand" :style="cssStyle">
      <div v-if="cssStyle" class="more ago" @click="expand = !expand">
        由于嵌套回复层级太深，自动将以下回复移至可见范围
      </div>
      <div class="comment-content">
        <div class="left expand-line"  @click="toggle"></div>
        <div class="right"
             @click.stop="eventBus.emit(CMD.SHOW_EDITOR,modelValue)">
          <div class="w">
            <div class="wrong-wrapper" v-if="modelValue.isWrong">
              <span @click="expandWrong = !expandWrong" title="点击楼层号查看提示">
                <a :href="'/member/'+modelValue.replyUsers[0]">@{{ modelValue.replyUsers[0] }}&nbsp;&nbsp;</a>
                <span class="del-line">#{{ modelValue.replyFloor }} </span>
                <i class="fa fa-question-circle-o wrong-icon" aria-hidden="true"></i>
              </span>
              <div class="warning" v-if="expandWrong">
                这条回复似乎有点问题，指定的楼层号与@的人对应不上
                <br>
                原因可能有下面几种：
                <br>
                一、屏蔽用户导致楼层塌陷：你屏蔽了A，自A以后的回复的楼层号都会减1
                <br>
                二、忽略回复导致楼层塌陷：原理同上
                <br>
                三、层主回复时指定错了楼层号（同一，层主屏蔽了别人，导致楼层塌陷）
                <br>
                四、脚本解析错误，请在
                <a href="https://github.com/zyronon/web-scripts/issues" target="_blank">这里</a>反馈
              </div>
            </div>
            <BaseHtmlRender
                v-if="config.commentDisplayType === CommentDisplayType.FloorInFloorNoCallUser && this.type !== 'top'"
                class="reply_content"
                :html="modelValue.hideCallUserReplyContent"/>
            <BaseHtmlRender v-else class="reply_content" :html="modelValue.reply_content"/>
          </div>
          <div class="simple-wrapper">
            <Comment v-for="(item,index) in modelValue.children"
                     v-model="modelValue.children[index]"
                     :key="index"/>
          </div>
        </div>
      </div>
      <div v-if="cssStyle" class="more ago" @click="expand = !expand">
        由于嵌套回复层级太深，自动将以上回复移至可见范围
      </div>
    </div>
  </div>
</template>
<script>
import Author from "./Author.vue";
import PostEditor from "./PostEditor.vue";
import Point from "./Point.vue";
import eventBus from "../utils/eventBus.js";
import BaseHtmlRender from "./BaseHtmlRender.vue";
import {CMD} from "../utils/type.js";
import {CommentDisplayType} from "@v2next/core/types.ts";
import MoreIcon from "@/components/MoreIcon.vue";

export default {
  name: "Comment",
  components: {MoreIcon, BaseHtmlRender, Author, PostEditor, Point},
  inject: ['post', 'postDetailWidth', 'show', 'isNight', 'config'],
  props: {
    modelValue: {
      reply_content: ''
    },
    type: {
      type: String,
      default() {
        return 'list'
      }
    },
  },
  data() {
    return {
      edit: false,
      ding: false,
      expand: true,
      expandWrong: false,
      replyInfo: `@${this.modelValue.username} #${this.modelValue.floor} `,
      cssStyle: null,
      floor: this.modelValue.floor
    }
  },
  watch: {
    show(e) {
      if (e) {
        this.edit = false
      }
    },
    postDetailWidth(n, o) {
      this.checkIsTooLong(n)
    }
  },
  computed: {
    eventBus() {
      return eventBus
    },
    CMD() {
      return CMD
    },
    CommentDisplayType() {
      return CommentDisplayType
    },
    myClass() {
      return {
        isOp: this.modelValue.isOp,
        ding: this.ding,
        isLevelOne: this.modelValue.level === 0,
        ['c_' + this.floor]: this.type !== 'top'
      }
    }
  },
  mounted() {
    this.checkIsTooLong(this.postDetailWidth)
  },
  methods: {
    checkIsTooLong(postDetailWidth) {
      if (postDetailWidth !== 0) {
        let rect = this.$refs.comment.getBoundingClientRect()
        let ban = postDetailWidth / 2
        // console.log('ban', ban)
        if (ban < rect.width && rect.width < ban + 25 && this.modelValue.children.length) {
          this.expand = false
          // console.log(rect.width - this.postDetailWidth)
          let padding = 2
          this.cssStyle = {
            padding: '1rem 0',
            width: `calc(${postDetailWidth}px - ${padding}rem)`,
            transform: `translateX(calc(${rect.width - postDetailWidth}px + ${padding}rem))`,
            background: this.isNight ? '#18222d' : 'white'
          }
          // console.log(this.cssStyle)
        }
      }
    },
    //高亮一下
    showDing() {
      this.ding = true
      setTimeout(() => {
        this.ding = false
      }, 2000)
    },
    toggle() {
      this.expand = !this.expand
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable";

.comment {
  width: 100%;
  box-sizing: border-box;
  margin-top: .6rem;

  @line-color: #ececec;

  &.isLevelOne {
    border-bottom: 1px solid var(--color-line);
    padding: .8rem 1rem;
    //padding: 1rem 1rem;
    margin-top: 0;
  }


  &.ding {
    @bg: rgb(yellow, .3);
    background: @bg !important;
  }

  .comment-content-w {
    .more {
      text-align: center;
      margin: 2rem 0;
    }
  }

  .comment-content {
    display: flex;
    position: relative;

    .expand-line {
      margin-top: .6rem;
      @w: 2.8rem;
      width: @w;
      min-width: @w;
      position: relative;

      &:after {
        position: absolute;
        left: 50%;
        content: " ";
        height: 100%;
        width: 0;
        border-right: 1px solid var(--color-line);
      }
    }

    .right {
      flex: 1;
      width: calc(100% - 3rem);

      .w {
        padding-left: 1rem;

        .post-editor-wrapper {
          margin-top: 1rem;
        }
      }
    }
  }
}

.wrong-wrapper {
  font-size: 1.4rem;
  margin-bottom: 1rem;

  span {

  }

  .del-line {
    text-decoration: line-through;
  }

  .wrong-icon {
    margin-left: .5rem;
  }

  .warning {
    @border: #e1e1e1;
    border-top: 1px solid @border;
    border-bottom: 1px solid @border;
    padding: 1rem 0;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: red;
  }
}


</style>
