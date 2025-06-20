<template>
  <div class="comment" :class="myClass" ref="comment" :data-floor="floor">
    <Author v-model="expand"
            :comment="modelValue"
            @reply="edit = !edit"
            :type="type"
            @hide="hide"
    />
    <div v-if="cssStyle && !expand" class="more ago" @click="expand = !expand">
      由于嵌套回复层级太深，自动将后续回复隐藏
    </div>
    <div class="comment-content-w" v-if="expand" :style="cssStyle">
      <div v-if="cssStyle" class="more ago" @click="expand = !expand">
        由于嵌套回复层级太深，自动将以下回复移至可见范围
      </div>
      <div class="comment-content">
        <div class="left expand-line" @click="toggle"></div>
        <div class="right">
          <div class="w">
            <div class="wrong-wrapper" v-if="modelValue.isWrong">
              <span
                  @click="expandWrong = !expandWrong"
                  title="点击楼层号查看提示"
              >
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
                <a href="https://github.com/zyronon/V2Next/issues" target="_blank">这里</a>反馈
              </div>
            </div>
            <BaseHtmlRender
                v-if="[CommentDisplayType.Like, CommentDisplayType.FloorInFloorNoCallUser].includes(config.commentDisplayType) && type !== 'top'"
                class="reply_content" :html="modelValue.hideCallUserReplyContent"/>
            <BaseHtmlRender v-else class="reply_content" :html="modelValue.reply_content"/>
            <PostEditor v-if="edit"
                        @close="edit = false"
                        :replyInfo="replyInfo"
                        :replyUser="modelValue.username"
                        :replyFloor="modelValue.floor"/>

            <div class="reply-count"
                 @click="expandTopReply = !expandTopReply"
                 v-if="type === 'top' && modelValue.replyCount ">
              <div class="gang"></div>
              <span>
              共有{{ modelValue.replyCount }} 条回复
              </span>
              <Icon icon="ep:arrow-up-bold" v-if="expandTopReply"/>
              <Icon icon="ep:arrow-down-bold" v-else/>
            </div>
          </div>
          <div class="simple-wrapper">
            <template v-if="type === 'top'">
              <div class="top-reply-wrap" v-if="expandTopReply && modelValue.replyCount">
                <TopSubComment
                    :level="1"
                    v-for="(item,index) in modelValue.children"
                    v-model="modelValue.children[index]"
                    :key="index"/>
              </div>
            </template>
            <template v-else>
              <Comment
                  v-for="(item,index) in modelValue.children"
                  v-model="modelValue.children[index]"
                  :key="index"/>
            </template>

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
import {Icon} from "@iconify/vue";
import TopSubComment from "@/components/TopSubComment.vue";

export default {
  name: "Comment",
  components: {BaseHtmlRender, Author, PostEditor, Point, Icon, TopSubComment},
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
      expandTopReply: true,
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
    CommentDisplayType() {
      return CommentDisplayType
    },
    myClass() {
      return {
        isOp: this.modelValue.isOp,
        isSimple: this.config.viewType === 'simple',
        ding: this.ding,
        isLevelOne: this.type === 'top' ? true : (this.modelValue.level === 0),
        ['c_' + this.floor]: this.type !== 'top',
      }
    }
  },
  mounted() {
    this.checkIsTooLong(this.postDetailWidth)
  },
  methods: {
    checkIsTooLong(postDetailWidth) {
      // console.log('postDetailWidth', postDetailWidth)
      if (postDetailWidth !== 0) {
        let rect = this.$refs.comment.getBoundingClientRect()
        let ban = postDetailWidth * 0.6
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
    hide() {
      let url = `${location.origin}/ignore/reply/${this.modelValue.id}?once=${this.post.once}`
      eventBus.emit(CMD.REMOVE, this.modelValue.floor)
      $.post(url).then(res => {
        eventBus.emit(CMD.REFRESH_ONCE)
        eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '隐藏成功'})
      }, err => {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '隐藏成功,仅本次有效（接口调用失败！）'})
      })
    },
    toggle() {
      this.expand = !this.expand
    },
    jump() {
      eventBus.emit(CMD.JUMP, this.modelValue.floor)
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

  &.isSimple {
    .avatar, .expand-line {
      display: none;
    }

    .simple-wrapper {
      padding-left: 2.8rem;
    }

    .w {
      padding-left: 0 !important;
      padding-top: .5rem;
    }
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
      cursor: pointer;
      margin-top: .6rem;
      @w: 2.0rem;
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

      &:hover {
        &:after {
          border-right: 2px solid var(--color-active);
        }
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
    cursor: pointer;
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

.reply-count {
  padding: .8rem 0;
  padding-bottom: .4rem;
  border-radius: .2rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  color: gray;
  gap: 1rem;
  cursor: pointer;

  .gang {
    width: 2rem;
    height: 0;
    border-bottom: 1px solid #d5d5d5;
  }

  svg {
    font-size: 1rem;
  }
}

.top-reply-wrap {
  //background: rgb(241, 245, 249);
  //background: rgb(226, 226, 226);
  background: var(--color-top-reply-wrap-bg);
  border-radius: .8rem;
  padding: .6rem;
  padding-left: 0;
  margin-left: 1rem;
}

</style>
