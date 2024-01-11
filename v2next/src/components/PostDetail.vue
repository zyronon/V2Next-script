<template>
  <div class="post-detail"
       ref="detail"
       @keydown.esc="close()"
       v-show="modelValue"
       :class="[isNight?'isNight':'',pageType]"
       @scroll="debounceScroll"
       @click="close('space')">
    <div ref="main" class="main" tabindex="1" @click.stop="stop">
      <div class="main-wrapper" ref="mainWrapper" :style="{width:config.postWidth}">
        <div class="my-box post-wrapper">
          <div class="header">
            <div class="fr">
              <a :href="`/member/${post.member.username}`"
                 v-if="post.member.avatar_large">
                <img :src="post.member.avatar_large"
                     class="avatar"
                     style="width: 73px;height: 73px;"
                     border="0" align="default" :alt="post.member.username"></a>
            </div>
            <a href="/">V2EX</a>
            <span class="chevron">&nbsp;&nbsp;›&nbsp;&nbsp;</span>
            <a :href="post.node.url">{{ post.node.title }}</a>
            <div class="sep10"></div>
            <h1>{{ post.title }}</h1>
            <div :id="`topic_${post.id}_votes`" class="votes">
              <a href="javascript:" :onclick="`upVoteTopic(${post.id});`" class="vote">
                <li class="fa fa-chevron-up"></li> &nbsp;
              </a>
              &nbsp;
              <a href="javascript:" :onclick="`downVoteTopic(${post.id});`" class="vote">
                <li class="fa fa-chevron-down"></li>
              </a>
            </div> &nbsp;
            <small class="gray">
              <a :href="`/member/${post.member.username}`">{{ post.member.username }}</a> ·
              <template v-if="post.member.createDate">
                <span :class="post.member.isNew && 'danger'">{{ post.member.createDate }}</span> ·
              </template>
              <template v-if="post.createDateAgo">
                <span :title="post.createDate">{{ post.createDateAgo }}</span> ·
              </template>
              {{ post.clickCount }} 次点击
              <template v-if="isMy">&nbsp;&nbsp;
                <a :href="`/t/${post.id}/info`">
                  <li class="fa fa-info-circle"></li>
                </a>&nbsp;&nbsp;
                <a :href="`/append/topic/${post.id}`" class="op">APPEND</a>
              </template>
            </small>
            <template v-if="isLogin && config.openTag ">
              <span class="my-tag" v-for="i in myTags">
                <i class="fa fa-tag"></i>
                <span>{{ i }}</span>
                <i class="fa fa-trash-o remove" @click="removeTag(i)"></i>
              </span>
              <span class="add-tag ago" @click="addTag" title="添加标签">+</span>
            </template>
          </div>
          <BaseHtmlRender :html="post.headerTemplate"/>
          <Toolbar @reply="isSticky = !isSticky">
            <Point
                @addThank="addThank"
                @recallThank="recallThank"
                :full="false"
                :item="{
                isThanked:post.isThanked,
                thankCount:post.thankCount,
                username:post.username
              }"
                :api-url="'topic/'+post.id"/>
          </Toolbar>
        </div>

        <div class="my-box" v-if="topReply.length && config.showTopReply">
          <div class="my-cell flex ">
            <span class=" ">高赞回复</span>
            <div class="top-reply">
              <Tooltip :title="`统计点赞数大于等于${config.topReplyLoveMinCount}个的回复，可在设置中调整`">
                <i class="fa fa-info" @click="showConfig()"/>
              </Tooltip>
              <PopConfirm title="关闭后不再默认显示，可在设置里重新打开，确认关闭？"
                          @confirm="config.showTopReply = false">
                <i class="fa fa-times"/>
              </PopConfirm>
              <Tooltip title="收起高赞回复">
                <i class="fa fa-compress" @click="collapseTopReplyList"/>
              </Tooltip>
            </div>
          </div>
          <div ref="topReply">
            <Comment v-for="(item,index) in topReply"
                     :key="item.floor"
                     type="top"
                     v-model="topReply[index]"/>
          </div>
        </div>

        <div class="my-box comment-wrapper">
          <template v-if="post.replyList.length ||loading">
            <div class="my-cell flex" v-if="config.showToolbar">
              <div class="radio-group2">
                <Tooltip title="不隐藏@用户">
                  <div class="radio"
                       @click="changeOption(CommentDisplayType.FloorInFloor)"
                       :class="displayType === CommentDisplayType.FloorInFloor?'active':''">楼中楼(@)
                  </div>
                </Tooltip>
                <Tooltip title="隐藏第一个@用户，双击内容可显示原文">
                  <div class="radio"
                       @click="changeOption(CommentDisplayType.FloorInFloorNoCallUser)"
                       :class="displayType === CommentDisplayType.FloorInFloorNoCallUser?'active':''">楼中楼
                  </div>
                </Tooltip>
                <Tooltip title="重复显示楼中楼的回复">
                  <div class="radio"
                       @click="changeOption(CommentDisplayType.FloorInFloorNested)"
                       :class="displayType === CommentDisplayType.FloorInFloorNested?'active':''">冗余楼中楼
                  </div>
                </Tooltip>
                <div class="radio"
                     @click="changeOption(CommentDisplayType.Like)"
                     :class="displayType ===CommentDisplayType.Like?'active':''">感谢
                </div>
                <div class="radio"
                     @click="changeOption(CommentDisplayType.OnlyOp)"
                     :class="displayType === CommentDisplayType.OnlyOp?'active':''">只看楼主
                </div>
                <div class="radio"
                     @click="changeOption(CommentDisplayType.V2exOrigin)"
                     :class="displayType === CommentDisplayType.V2exOrigin?'active':''">V2原版
                </div>
              </div>
              <div class="read-notice" v-if="read.floor || read.total">
                <span>上次打开：</span>
                <template v-if="read.floor">
                  <span>阅读到<b>{{ read.floor }}</b>楼</span>
                  <div class="jump jump1" @click="jump(read.floor)">
                    <i class="fa fa-long-arrow-down"/>
                  </div>
                </template>
                <span>总楼层<b>{{ read.total }}</b></span>
                <div class="jump" @click="jump(read.total)">
                  <i class="fa fa-long-arrow-down"/>
                </div>
              </div>
            </div>
            <div class="my-cell flex">
                <span>{{ post.replyCount }} 条回复
                 <span v-if="post.createDate"> &nbsp;<strong class="snow">•</strong> &nbsp;{{ post.createDate }}</span>
                </span>
              <div class="fr" v-html="post.fr"></div>
            </div>
          </template>

          <template v-if="replyList.length || loading">
            <div class="loading-wrapper" v-if="loading">
              <BaseLoading size="large"/>
            </div>
            <div class="comments" v-else>
              <template v-if="modelValue">
                <Comment v-for="(item,index) in replyList"
                         :key="item.floor"
                         v-model="replyList[index]"/>
              </template>
            </div>
          </template>
        </div>

        <div v-if="!(replyList.length || loading)" id="no-comments-yet">目前尚无回复</div>

        <div v-if="isLogin" class="my-box" ref="replyBox" :class="{'sticky':isSticky}">
          <div class="my-cell flex">
            <span>添加一条新回复</span>
            <div class="notice-right gray">
              <a style="margin-right: 2rem;" v-if="isSticky" @click="isSticky = false">取消回复框停靠</a>
              <a @click="scrollTop">回到顶部</a>
            </div>
          </div>
          <div class="p1">
            <PostEditor
                @close="goBottom"
                ref="post-editor"
                useType="reply-post"
                @click="isSticky = true"/>
          </div>
        </div>
      </div>

      <div class="relationReply" v-if="showRelationReply" @click="close('space')">
        <div class="my-cell flex" @click.stop="stop">
          <span class="gray">上下文</span>
          <div class="top-reply">
            <i class="fa fa-times" @click="showRelationReply = false"/>
          </div>
        </div>
        <div class="comments" @click.stop="stop">
          <SingleComment v-for="(item,index) in relationReply"
                         :is-right="item.username === targetUser.right"
                         :key="item.floor"
                         :comment="item"/>
        </div>
      </div>

      <div class="call-list"
           :style="callStyle"
           v-if="showCallList && filterCallList.length">
        <div class="call-item"
             @click="setCall(item)"
             :class="{select:index === selectCallIndex}"
             v-for="(item,index) in filterCallList">
          <a>{{ item }}</a>
        </div>
      </div>
      <div class="close-btn" v-if="config.closePostDetailBySpace" @click="close('btn')">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
      <div class="scroll-top gray" @click.stop="scrollTop">
        <i class="fa fa-long-arrow-up" aria-hidden="true"></i>
      </div>
      <div class="refresh gray" @click.stop="$emit('refresh')">
        <BaseLoading v-if="refreshLoading"/>
        <i v-else class="fa fa-refresh" aria-hidden="true"></i>
      </div>
      <div class="scroll-to gray" @click.stop="jump(currentFloor)">
        <i class="fa fa-long-arrow-down"/>
        <input type="text" v-model="currentFloor"
               @click.stop="stop"
               @keydown.enter="jump(currentFloor)">
      </div>
    </div>
  </div>
</template>
<script>
import Comment from './Comment'
import PostEditor from './PostEditor'
import Point from "./Point";
import Toolbar from "./Toolbar";
import BaseHtmlRender from "@/components/BaseHtmlRender";
import eventBus from "@/utils/eventBus.js";
import {CMD} from "@/utils/type";
import {computed, nextTick} from "vue";
import {CommentDisplayType, PageType} from "@/types";
import Tooltip from "@/components/Tooltip.vue";
import PopConfirm from "@/components/PopConfirm.vue";
import SingleComment from "@/components/SingleComment.vue";
import {debounce} from "@/utils/index.js";
import BaseLoading from "./BaseLoading.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "detail",
  components: {
    BaseButton,
    SingleComment,
    PopConfirm,
    Comment,
    PostEditor,
    Point,
    Toolbar,
    BaseHtmlRender,
    Tooltip,
    BaseLoading
  },
  inject: ['allReplyUsers', 'post', 'tags', 'isLogin', 'config', 'pageType', 'isNight', 'showConfig'],
  provide() {
    return {
      postDetailWidth: computed(() => this.postDetailWidth)
    }
  },
  props: {
    modelValue: {
      type: Boolean,
      default() {
        return false
      }
    },
    loading: {
      type: Boolean,
      default() {
        return false
      }
    },
    refreshLoading: {
      type: Boolean,
      default() {
        return false
      }
    },
    displayType: CommentDisplayType.FloorInFloorNoCallUser,
  },
  data() {
    return {
      isSticky: false,
      selectCallIndex: 0,
      postDetailWidth: 0,
      showCallList: false,
      showRelationReply: false,
      replyText: '',
      callStyle: {
        top: 0,
        left: 0
      },
      targetUser: {
        left: [],
        right: '',
        rightFloor: -1
      },
      debounceScroll: () => {
      },
      read: {
        floor: 0,
        total: 0
      },
      currentFloor: '',
      showOpTag: false
    }
  },
  computed: {
    isMy() {
      return this.post.member.username === window.user.username
    },
    myTags() {
      return this.tags[this.post.member.username] ?? []
    },
    CommentDisplayType() {
      return CommentDisplayType
    },
    isPost() {
      return this.pageType === PageType.Post
    },
    filterCallList() {
      if (this.showCallList) {
        let list = ['管理员', '所有人'].concat(this.allReplyUsers)
        if (this.replyText) return list.filter(i => i.search(this.replyText) > -1)
        return list
      }
      return []
    },
    topReply() {
      return this.post.replyList
          .filter(v => v.thankCount >= this.config.topReplyLoveMinCount)
          .sort((a, b) => b.thankCount - a.thankCount)
          .slice(0, this.config.topReplyCount)
    },
    replyList() {
      console.log('this.post.nestedReplies',this.post.nestedReplies)
      if ([CommentDisplayType.FloorInFloor, CommentDisplayType.FloorInFloorNoCallUser].includes(this.displayType)) return this.post.nestedReplies
      if (this.displayType === CommentDisplayType.Like) {
        return window.clone(this.post.nestedReplies).sort((a, b) => b.thankCount - a.thankCount)
      }
      if (this.displayType === CommentDisplayType.V2exOrigin) return this.post.replyList
      if (this.displayType === CommentDisplayType.FloorInFloorNested) return this.post.nestedRedundReplies
      if (this.displayType === CommentDisplayType.OnlyOp) return this.post.replyList.filter(v => v.username === this.post.member?.username)
      return []
    },
    //关联回复
    relationReply() {
      if (this.targetUser.left.length && this.targetUser.right) {
        return this.post.replyList
            .filter(v => {
              if (this.targetUser.left.includes(v.username)) {
                //如果超过目标楼层，只找回复目标的
                if (v.floor > this.targetUser.rightFloor) {
                  if (v.replyUsers.includes(this.targetUser.right)) {
                    return true
                  }
                } else {
                  return true
                }
              }
              if (v.username === this.targetUser.right) {
                for (let i = 0; i < this.targetUser.left.length; i++) {
                  if (v.replyUsers.includes(this.targetUser.left[i])) {
                    return true
                  }
                }
              }
            })
      }
      return []
    }
  },
  watch: {
    'post.id'(n, o) {
      if (this.$refs["post-editor"]) {
        this.$refs["post-editor"].content = ''
        nextTick(() => {
          this.$refs?.detail?.scrollTo({top: 0})
        })
      }
    },
    'post.headerTemplate'(n, o) {
      let mountEl = document.querySelector('.main-wrapper .post-wrapper .html-wrapper .header')
      if (mountEl) {
        this.showOpTag = true
      }
    },
    modelValue: {
      handler(newVal) {
        // console.log('modelValue', newVal, window.history.state)
        if (this.isPost) {
          return
        }
        if (newVal) {
          document.body.style.overflow = 'hidden'
          if (!window.history.state) {
            // console.log('执行了pushState')
            window.history.pushState({}, 0, this.post.url);
          }

          this.read = this.post.read
          this.currentFloor = ''
          nextTick(() => {
            window.document.title = this.post.title ?? 'V2EX'
            this.$refs?.main?.focus()
          })
        } else {
          this.$emit('saveReadList')
          document.body.style.overflow = 'unset'
          window.document.title = 'V2EX'
          this.isSticky = false
          this.showRelationReply = false
          if (window.history.state) {
            // console.log('执行了back')
            window.history.back();
          }
        }
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.postDetailWidth = this.$refs.mainWrapper?.getBoundingClientRect().width || 0
    })
    this.debounceScroll = debounce(this.scroll, 300, false)
    if (this.isLogin) {
      const observer = new IntersectionObserver(
          ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
          {threshold: [1]}
      );
      observer.observe(this.$refs.replyBox);
      window.addEventListener('keydown', this.onKeyDown)
    }
    eventBus.on(CMD.SHOW_CALL, (val) => {
      if (val.show) {
        // console.log('va', val)
        this.showCallList = true
        this.replyText = val.text
        //top值要加上滚动的距离，因为val传的top是相对于视口，而不是父div
        //left要减去父级的left，原理同上
        if (this.isPost) {
          this.callStyle.top = val.top + $(window.win()).scrollTop() + -40 + 'px'
        } else {
          this.callStyle.top = val.top + $('.post-detail').scrollTop() + 15 + 'px'
        }
        this.callStyle.left = val.left - $('.main')[0].getBoundingClientRect().left + 10 + 'px'
        if (this.selectCallIndex >= this.filterCallList.length) {
          this.selectCallIndex = 0
        }
      } else {
        this.replyText = ''
        this.showCallList = false
        this.selectCallIndex = 0
      }
    })
    eventBus.on(CMD.RELATION_REPLY, (val) => {
      this.targetUser = val
      this.showRelationReply = true
    })
    eventBus.on(CMD.JUMP, this.jump)
    if (this.isPost) {
      window.addEventListener('scroll', this.debounceScroll)
    }
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeyDown)
    eventBus.off(CMD.SHOW_CALL)
  },
  methods: {
    addTag() {
      eventBus.emit(CMD.ADD_TAG, this.post.member.username)
    },
    removeTag(tag) {
      eventBus.emit(CMD.REMOVE_TAG, {username: this.post.member.username, tag})
    },
    scroll() {
      if (!this.config.rememberLastReadFloor) return
      let height = window.innerHeight * 0.3
      let comments = $('.comments  .comment')
      let forCount = 0
      for (let i = 0; i < comments.length; i++) {
        forCount++
        let ins = comments[i]
        let rect = ins.getBoundingClientRect()
        if (rect.top > height) {
          let lastReadFloor = Number(ins.dataset['floor']);
          console.log('当前阅读楼层', lastReadFloor)
          eventBus.emit(CMD.ADD_READ, {
            floor: lastReadFloor > 3 ? lastReadFloor : 0,
            total: this.post.replyList.length
          })
          if (lastReadFloor > 3) {
            this.read.floor = 0
          }
          break
        }
      }
      if (forCount === comments.length) {
        console.log('看到最后了')
        eventBus.emit(CMD.ADD_READ, {
          floor: forCount,
          total: this.post.replyList.length
        })
      }
    },
    stop(e) {
    },
    jump(floor) {
      let lastItem = this.replyList[this.replyList.length - 1]
      if (floor === '') {
        floor = lastItem.floor
      } else {
        try {
          floor = Number(floor)
        } catch (e) {
          floor = lastItem.floor
        }
        if (floor === 0) {
          floor = 1
        }
        if (floor > lastItem.floor) floor = lastItem.floor
      }

      if (!this.post.replyList.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '没有回复可跳转！'})
        this.read.floor = 0
        return
      }
      if (floor > this.post.replyList.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '没有找到对应回复！'})
        this.read.floor = 0
        return;
      }
      let comment = $(`.c_${floor}`)
      if (!comment.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '没有找到对应回复！'})
        this.read.floor = 0
        return
      }
      comment[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
      comment.addClass('ding')
      this.read.floor = 0
      this.currentFloor = floor + 1
      setTimeout(() => {
        comment.removeClass('ding')
      }, 2000)
    },
    jumpLastRead(floor) {
      if (this.config.autoJumpLastReadFloor) {
        if (!floor) return
        setTimeout(() => {
          console.log('上次跳转', floor)
          this.jump(floor)
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '已跳转到上次阅读位置'})
        }, 300)
      }
    },
    collapseTopReplyList() {
      $(this.$refs.topReply).slideToggle('fast')
    },
    goBottom() {
      this.isSticky = false
      setTimeout(() => {
        if (this.isPost) {
          let body = $('body , html')
          let scrollHeight = body.prop("scrollHeight");
          body.animate({scrollTop: scrollHeight - 850}, 300);
        } else {
          this.$refs.detail.scrollTo({top: this.$refs.detail.scrollHeight, behavior: 'smooth'})
        }
      })
    },
    close(from) {
      if (this.isPost) return
      if (from === 'space') {
        if (this.config.closePostDetailBySpace) {
          this.$emit('update:modelValue', false)
        }
      } else {
        this.$emit('update:modelValue', false)
      }
    },
    setCall(e) {
      eventBus.emit(CMD.SET_CALL, e)
      this.showCallList = false
    },
    onKeyDown(e) {
      if (!this.modelValue) return
      if (!this.showCallList) return
      let length = this.filterCallList.slice(0, 10).length
      //enter
      if (e.keyCode === 13) {
        this.setCall(this.filterCallList[this.selectCallIndex])
        e.preventDefault()
      }
      //上
      if (e.keyCode === 38) {
        this.selectCallIndex--
        if (this.selectCallIndex < 0) {
          this.selectCallIndex = length - 1
        }
        e.preventDefault()
      }
      //下
      if (e.keyCode === 40) {
        this.selectCallIndex++
        if (this.selectCallIndex > (length - 1)) {
          this.selectCallIndex = 0
        }
        e.preventDefault()
      }
    },
    changeOption(item) {
      this.$emit('update:displayType', item)
    },
    addThank() {
      eventBus.emit(CMD.CHANGE_POST_THANK, {id: this.post.id, type: 'add'})
    },
    recallThank() {
      eventBus.emit(CMD.CHANGE_POST_THANK, {id: this.post.id, type: 'recall'})
    },
    scrollTop() {
      if (this.isPost) {
        $("body , html").animate({scrollTop: 0}, 300);
      } else {
        this.$refs.detail.scrollTo({top: 0, behavior: 'smooth'})
      }
    },
  }
}
</script>

<style lang="less">

.sticky {
  position: sticky;
  bottom: -2px;
  z-index: 2;
  background: var(--box-background-hover-color) !important;
}

.sticky[stuck] {
  box-shadow: 0 2px 20px rgb(0 0 0 / 35%) !important;
}
</style>

<style scoped lang="less">
@import "src/assets/less/index.less";
@import "src/assets/less/variable.less";

.Post {
  position: unset !important;
  background: transparent !important;
  overflow: unset !important;

  .main {
    background: transparent !important;
    padding: unset !important;
    width: 100% !important;
  }

  .close-btn {
    display: none;
  }
}

.post-detail {
  text-align: start;
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(46, 47, 48, .8);
  overflow: auto;
  font-size: 1.4rem;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  :deep(.subtle) {
    background-color: rgb(236 253 245 / 90%);
    border-left: 4px solid #a7f3d0;
  }

  &.isNight {
    :deep(.subtle) {
      background-color: rgb(26, 51, 50);
      border-left: 4px solid #047857;
    }

  }

  @width: 77rem;

  .main {
    display: flex;
    justify-content: flex-end;
    padding: 3rem 8rem 15rem 8rem;
    //margin: auto;
    //box-sizing: border-box;
    //min-height: 100%;
    //background: #e2e2e2;
    background: var(--color-main-bg);
    position: relative;
    outline: none;

    .main-wrapper {
      width: @width;
      padding-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      .post-wrapper {
        .header {
          &:hover {
            .add-tag {
              display: inline-block;
            }
          }
        }
      }

      .loading-wrapper {
        height: 20rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #no-comments-yet {
        color: #a9a9a9;
        font-weight: bold;
        text-align: center;
        width: 100%;
        margin-bottom: 2rem;
        box-sizing: border-box;
      }
    }

    .relationReply {
      position: fixed;
      width: 25vw;
      top: 6.5rem;
      bottom: 15rem;
      z-index: 100;
      transform: translateX(calc(100% + 2rem));
      font-size: 2rem;
      overflow: hidden;

      .my-cell {
        background: var(--color-second-bg);
        border-radius: var(--box-border-radius) var(--box-border-radius) 0 0;
      }

      .comments {
        max-height: calc(100% - 4.2rem);
        overflow: auto;
        background: var(--color-second-bg);
        border-radius: 0 0 var(--box-border-radius) var(--box-border-radius);
      }
    }

    .call-list {
      z-index: 9;
      position: absolute;
      top: 12rem;
      border: 1px solid var(--color-main-bg);
      background: var(--color-call-list-bg);
      box-shadow: 0 5px 15px rgb(0 0 0 / 10%);
      overflow: auto;
      max-height: 30rem;
      border-radius: var(--box-border-radius);
      min-width: 8rem;
      box-sizing: content-box;

      .call-item {
        border-top: 1px solid var(--color-main-bg);
        height: 3rem;
        display: flex;
        padding: 0 1rem;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        box-sizing: border-box;

        .select {
          //background: #f0f0f0;
          background: var(--color-main-bg);
          text-decoration: none;
        }

        &:hover {
          .select();
        }

        &.select {
          .select();
        }

        &:nth-child(1) {
          border-top: 1px solid transparent;
        }
      }
    }
  }

  @media screen and (max-width: 1500px) {
    @width: 65vw;
    .main-wrapper {
      width: @width !important;
    }
  }
  @media screen and (max-width: 1280px) {
    @width: 75vw;
    .main-wrapper {
      width: @width !important;
    }
  }

  .scroll-top {
    cursor: pointer;
    position: fixed;
    border-radius: .6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10rem;
    z-index: 99;
    padding: .8rem 0;
    gap: 1rem;
    width: 4.5rem;
    transform: translateX(6rem);
    font-size: 2rem;
    background: var(--color-sp-btn-bg);
  }

  .refresh {
    .scroll-top;
    bottom: 23.5rem;
  }

  .scroll-to {
    .scroll-top;
    bottom: 15rem;
    display: flex;
    flex-direction: column;

    input {
      height: 2.6rem;
      width: 3.6rem;
      font-size: 1.4rem;
      text-align: center;
      color: gray;
    }
  }

  .read-notice {
    display: flex;
    align-items: center;
    color: gray;

    .jump {
      background: var(--color-third-bg);
      color: gray;
      padding: 0.3rem 1rem;
      border-radius: .4rem;
      margin: 0 1rem;
      cursor: pointer;
    }
  }

  .close-btn {
    color: @main-color;
    cursor: pointer;
    position: fixed;
    top: 3rem;
    transform: translateX(4rem);
    font-size: 2rem;
  }

  .top-reply {
    color: var(--color-font-3);
    cursor: pointer;
    font-size: 2rem;
    display: flex;

    i {
      padding: 0 1rem;
    }
  }
}
</style>
