<template>
  <div class="post-detail"
       ref="detail"
       @keydown.esc="close()"
       v-show="modelValue"
       :class="[isNight?'isNight':'',pageType]"
       @click="close('space')">
    <div ref="main" class="main" tabindex="1" @click="stop">
      <div class="main-wrapper" ref="mainWrapper"
           :style="{width:config.postWidth+'!important'}">
        <div class="my-box post-wrapper">
          <div class="header">
            <div class="fr">
              <a :href="`/member/${post.member.username}`"
                 style="width: 73px;height: 73px;display:inline-block;">
                <img :src="post.member.avatar_large"
                     v-if="post.member.avatar_large"
                     class="avatar"
                     style="width: 73px;height: 73px;"
                     border="0" align="default" :alt="post.member.username"></a>
            </div>
            <a href="/packages/pcckages/pc/public">V2EX</a>
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
                <template v-if="canAppend">
                  <a :href="`/append/topic/${post.id}`" class="op">APPEND</a>
                </template>
                <template v-if="canEditMove">
                  <a :href="`/move/topic/${post.id}`" class="op">MOVE</a>&nbsp;
                  <a :href="`/edit/topic/${post.id}`" class="op">EDIT</a>
                </template>
              </template>
            </small>
            <template v-if="isLogin && config.openTag ">
              <span class="my-tag" v-for="i in myTags">
                <i class="fa fa-tag"></i>
                <span>{{ i }}</span>
                <i class="fa fa-trash-o remove" @click.stop="removeTag(i)"></i>
              </span>
              <span class="add-tag ago" @click.stop="addTag" title="添加标签">+</span>
            </template>
          </div>
          <BaseHtmlRender v-if="post.headerTemplate" :html="post.headerTemplate "/>
          <BaseHtmlRender v-else :html="post.jsonContent "/>
          <Toolbar @reply="isSticky = !isSticky">
            <Point
              @addThank="addThank"
              @recallThank="recallThank"
              :item="{
                isThanked:post.isThanked,
                thankCount:post.thankCount,
                username:post.username
              }"
              :api-url="'topic/'+post.id"/>
          </Toolbar>
        </div>

        <div class="my-box" v-if="post.topReplyList.length && config.showTopReply">
          <div class="my-cell flex " @click.stop="collapseTopReplyList">
            <span>高赞回复</span>
            <div class="top-reply">
              <Tooltip title="收起高赞回复">
                <div class="tool">
                  <Icon icon="gravity-ui:chevrons-collapse-vertical"/>
                </div>
              </Tooltip>
            </div>
          </div>
          <div ref="topReply">
            <Comment v-for="(item,index) in post.topReplyList"
                     :key="item.floor"
                     type="top"
                     v-model="post.topReplyList[index]"/>
          </div>
        </div>

        <div class="my-box comment-wrapper">
          <template v-if="post.replyList.length ||loading">
            <div class="my-cell flex">
              <div>{{ post.replyCount }} 条回复
                <span v-if="post.lastReplyDate"> &nbsp;<strong class="snow">•</strong> &nbsp;{{
                    post.lastReplyDate
                  }}</span>
              </div>
              <BaseSelect
                v-if="config.showToolbar"
                :display-type="displayType"
                @update:display-type="e => $emit('update:displayType', e)"
              />
              <div class="fr" v-html="post.fr" v-else></div>
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
              <a style="margin-right: 2rem;" v-if="isSticky" @click.stop="isSticky = false">取消回复框停靠</a>
              <a @click.stop="scrollTop">回到顶部</a>
            </div>
          </div>
          <div class="p1">
            <PostEditor
              @close="goBottom"
              ref="post-editor"
              useType="reply-post"
              @click.stop="isSticky = true"/>
          </div>
        </div>
      </div>

      <div class="relationReply" v-if="showRelationReply" @click.stop="close('space')">
        <div class="my-cell flex" @click.stop="stop">
          <span class="gray">上下文</span>
          <div class="top-reply">
            <Icon icon="ic:round-close" @click.stop="showRelationReply = false"/>
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
             @click.stop="setCall(item)"
             :class="{select:index === selectCallIndex}"
             v-for="(item,index) in filterCallList">
          <a>{{ item }}</a>
        </div>
      </div>
      <div class="close-btn" @click.stop="close('btn')">
        <Icon icon="fontisto:close-a"/>
      </div>
      <div class="refresh gray" @click.stop="$emit('refresh')">
        <BaseLoading v-if="refreshLoading"/>
        <Icon v-else icon="material-symbols:refresh"/>
      </div>
      <div class="scroll-to gray" @click.stop="jump(currentFloor)">
        <Icon icon="lucide:move-down"/>
        <input type="text" v-model="currentFloor"
               @click.stop="stop"
               @keydown.enter="jump(currentFloor)">
      </div>
      <div class="scroll-top gray" @click.stop="scrollTop">
        <Icon icon="lucide:move-up"/>
      </div>
      <!--      <div class="msg gray">-->
      <!--        <Icon icon="uiw:bell" />-->
      <!--      </div>-->
    </div>

    <teleport to="body">
      <div class="preview-modal"
           @wheel="wheel"
      >
        <div class="mask"
             @click="closePreviewModal"
        ></div>
        <Icon class="close" icon="fontisto:close-a" @click="closePreviewModal"/>
      </div>
    </teleport>
  </div>
</template>
<script>
import Comment from './Comment.vue'
import PostEditor from './PostEditor.vue'
import Point from "./Point.vue";
import Toolbar from "./Toolbar.vue";
import BaseHtmlRender from "./BaseHtmlRender.vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import {computed, nextTick} from "vue";
import {functions} from "@v2next/core";
import {CommentDisplayType, PageType} from "@v2next/core/types.ts";
import Tooltip from "./Tooltip.vue";
import PopConfirm from "./PopConfirm.vue";
import SingleComment from "./SingleComment.vue";
import BaseLoading from "./BaseLoading.vue";
import BaseButton from "./BaseButton.vue";
import {Icon} from "@iconify/vue";
import BaseSelect from "@/components/BaseSelect.vue";

function _css(el, key, value) {
  const reg = /^-?\d+.?\d*(px|pt|em|rem|vw|vh|%|rpx|ms)$/i
  if (value === undefined) {
    let val = null
    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(el, null)[key]
    } else {
      val = el.currentStyle[key]
    }
    return reg.test(val) ? parseFloat(val) : val
    // return parseFloat(val)
  } else {
    if (
      [
        'top',
        'left',
        'bottom',
        'right',
        'width',
        'height',
        'font-size',
        'margin',
        'padding'
      ].includes(key)
    ) {
      if (!reg.test(value)) {
        if (!String(value).includes('calc')) {
          value += 'px'
        }
      }
    }
    if (key === 'transform') {
      //直接设置不生效
      el.style.webkitTransform =
        el.style.MsTransform =
          el.style.msTransform =
            el.style.MozTransform =
              el.style.OTransform =
                el.style.transform =
                  value
    } else {
      el.style[key] = value
    }
  }
}

function getImgSize(naturalWidth, naturalHeight, maxWidth, maxHeight) {
  const imgRatio = naturalWidth / naturalHeight;
  const maxRatio = maxWidth / maxHeight;
  let width, height;
  // 如果图片实际宽高比例 >= 显示宽高比例
  if (imgRatio >= maxRatio) {
    if (naturalWidth > maxWidth) {
      width = maxWidth;
      height = (maxWidth / naturalWidth) * naturalHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  } else {
    if (naturalHeight > maxHeight) {
      width = (maxHeight / naturalHeight) * naturalWidth;
      height = maxHeight;
    } else {
      width = naturalWidth;
      height = naturalHeight;
    }
  }

  if (height === 0) {
    height = maxHeight
    width = height * 1.3
  } else {
    if (height < 24) {
      height = 50
      width = height * imgRatio
    } else if (height < 100) {
      height = 300
      width = height * imgRatio
    } else {
      height = maxHeight
      width = height * imgRatio
    }
    if (width > maxWidth) {
      width = maxWidth
      height = width / imgRatio
    }
  }


  console.log(width, height)
  return {width: width, height: height};
}

export default {
  name: "detail",
  components: {
    BaseSelect,
    BaseButton,
    SingleComment,
    PopConfirm,
    Comment,
    PostEditor,
    Point,
    Toolbar,
    BaseHtmlRender,
    Tooltip,
    BaseLoading,
    Icon
  },
  inject: ['allReplyUsers', 'post', 'tags', 'isLogin', 'config', 'pageType', 'isNight'],
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
      currentFloor: '',
      showOpTag: false,
      rect: {},
      result: {},
      x: 0,
      y: 0,
      scale: 1,
      minScale: 0.2,
      maxScale: 16,
      preview: {
        rect: {},
        result: {},
        x: 0,
        y: 0,
        scale: 1,
        minScale: 0.2,
        maxScale: 16,
      }
    }
  },
  computed: {
    canAppend() {
      if (this.isMy) {
        let create = new Date(this.post.createDate)
        return (Date.now() - create.valueOf()) > 1000 * 60 * 30
      }
      return false
    },
    canEditMove() {
      if (this.isMy) {
        let create = new Date(this.post.createDate)
        return (Date.now() - create.valueOf()) < 1000 * 60 * 10
      }
      return false
    },
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
    replyList() {
      // console.log('this.post.nestedReplies', this.post.nestedReplies)
      if ([CommentDisplayType.FloorInFloor, CommentDisplayType.FloorInFloorNoCallUser].includes(this.displayType)) return this.post.nestedReplies
      if (this.displayType === CommentDisplayType.Like) {
        return functions.clone(this.post.nestedReplies).sort((a, b) => b.thankCount - a.thankCount)
      }
      if (this.displayType === CommentDisplayType.New) {
        return functions.clone(this.post.replyList).reverse()
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
            if (this.targetUser.left.concat(this.targetUser.right).includes(v.username)) {
              //如果超过目标楼层，只找回复目标的
              if (v.floor > this.targetUser.rightFloor) {
                if (v.replyUsers.includes(this.targetUser.right)) {
                  return true
                }
              } else {
                // if (v.username === this.targetUser.right) return true
                // if (v.replyUsers.length) {
                //   if (v.replyUsers.includes(this.targetUser.right)) {
                //     return true
                //   }
                // } else {
                //   return true
                // }
                return true
              }
            }
            // return false
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
        if (this.isPost) return
        if (newVal) {
          this.currentFloor = ''
          nextTick(() => {
            this.$refs?.main?.focus()
          })
        } else {
          this.isSticky = false
          this.showRelationReply = false
        }
      },
    },
  },
  mounted() {
    nextTick(() => {
      setTimeout(() => {
        this.postDetailWidth = this.$refs.mainWrapper?.getBoundingClientRect().width || 0
      }, 500)
    })
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
    closePreviewModal() {
      let previewModal = document.querySelector('.preview-modal')
      let s = document.querySelector('.shadow')

      let domRect = this.preview.rect
      _css(s, 'transition', 'all 0.3s')
      _css(s, 'width', domRect.width)
      _css(s, 'height', domRect.height)
      _css(s, 'transform', `translate3d(${domRect.x}px, ${domRect.y}px, 0) scale(1)`)

      let mask = document.querySelector('.preview-modal .mask')
      _css(mask, 'opacity', 0)
      setTimeout(() => {
        _css(s, 'transition', 'all 0s')
        s.remove()
        _css(previewModal, 'top', '-1000vh')
        _css(document.body, 'overflow', 'auto')
      }, 300)

    },
    stop(e) {
      e.stopPropagation()
      e.stopImmediatePropagation()
      if (e.target.tagName === 'IMG') {
        console.log('e', e.target.src)
        if (/cdn\.v2ex\.com.*avatar/i.test(e.target.src)) {
          console.log('t')
        }
        this.preview = {
          rect: {},
          result: {},
          x: 0,
          y: 0,
          scale: 1,
          minScale: 0.2,
          maxScale: 16,
        }
        e.preventDefault()
        let domRect = e.target.getBoundingClientRect()
        let previewModal = document.querySelector('.preview-modal')
        _css(previewModal, 'top', '0')

        let s = e.target.cloneNode()
        s.classList.add('shadow')
        previewModal.append(s)
        _css(s, 'transition', 'all 0s')
        _css(s, 'width', domRect.width)
        _css(s, 'height', domRect.height)
        _css(s, 'transform', `translate3d(${domRect.x}px, ${domRect.y}px, 0) scale(1)`)

        let t = '.3'
        let sw = domRect.width / window.innerWidth
        let sh = domRect.height / window.innerHeight
        domRect.sw = sw
        domRect.sh = sh

        this.preview.rect = domRect
        this.preview.result = getImgSize(
          s.naturalWidth,
          s.naturalHeight,
          window.innerWidth * 0.95,
          window.innerHeight * .9
        );

        this.preview.x = (window.innerWidth - this.preview.result.width) * 0.5;
        this.preview.y = (window.innerHeight - this.preview.result.height) * 0.5;

        let isPointerdown = false
        let isMove = false
        let lastPointermove = {x: 0, y: 0}
        let diff = {x: 0, y: 0}
        // 绑定 pointerdown
        s.addEventListener("pointerdown", function (e) {
          isPointerdown = true;
          isMove = false
          s.setPointerCapture(e.pointerId);
          lastPointermove = {x: e.clientX, y: e.clientY};
        });
        // 绑定 pointermove
        s.addEventListener("pointermove", (e) => {
          if (isPointerdown) {
            isMove = true
            const current = {x: e.clientX, y: e.clientY};
            diff.x = current.x - lastPointermove.x;
            diff.y = current.y - lastPointermove.y;
            lastPointermove = {x: current.x, y: current.y};
            this.preview.x += diff.x;
            this.preview.y += diff.y;
            _css(s, 'transition', 'all 0.1s')
            _css(s, 'transform', `translate3d(${this.preview.x}px, ${this.preview.y}px, 0) scale(${this.preview.scale})`)
          }
          e.preventDefault();
        });
        // 绑定 pointerup
        s.addEventListener("pointerup", () => {
          if (isPointerdown) {
            isPointerdown = false;
            if (!isMove) {
              this.closePreviewModal()
            }
          }
        });
        // 绑定 pointercancel
        s.addEventListener("pointercancel", function (e) {
          if (isPointerdown) {
            isPointerdown = false;
          }
        });

        let mask = document.querySelector('.preview-modal .mask')
        _css(mask, 'transition', 'all 0s')
        _css(mask, 'opacity', 0)

        setTimeout(() => {
          _css(s, 'transition', `all ${t}s`)
          _css(mask, 'transition', `all ${t}s`)

          _css(mask, 'opacity', 1)
          _css(s, 'transform', `translate3d(${this.preview.x}px, ${this.preview.y}px, 0) scale(${this.preview.scale})`)
          _css(s, 'width', this.preview.result.width)
          _css(s, 'height', this.preview.result.height)
        }, 0)
        setTimeout(() => {
          _css(document.body, 'overflow', 'hidden')
        }, 300)
        return false
      }
    },
    wheel(e) {
      // console.log('e', e)
      let d = e.deltaY < 0 ? 0.1 : -0.1;
      let ratio = 1 + d;
      let _scale = this.preview.scale * ratio;
      if (_scale > this.preview.maxScale) {
        ratio = this.preview.maxScale / this.preview.scale;
        this.preview.scale = this.preview.maxScale;
      } else if (_scale < this.preview.minScale) {
        ratio = this.preview.minScale / this.preview.scale;
        this.preview.scale = this.preview.minScale;
      } else {
        this.preview.scale = _scale;
      }
      // console.log("r", ratio, "s", this.scale);
      // 目标元素是img说明鼠标在img上，以鼠标位置为缩放中心，否则默认以图片中心点为缩放中心
      if (e.target.tagName === "IMG") {
        const origin = {
          x: (d * this.preview.result.width) / 2,
          y: (d * this.preview.result.height) / 2,
        };
        this.preview.x -= d * (e.clientX - this.preview.x) - origin.x;
        this.preview.y -= d * (e.clientY - this.preview.y) - origin.y;
      }
      let s = document.querySelector('.shadow')
      _css(s, 'transition', 'all 0.2s')
      _css(s, 'transform', `translate3d(${this.preview.x}px, ${this.preview.y}px, 0) scale(${this.preview.scale})`)
      e.preventDefault();
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
        return
      }
      if (floor > this.post.replyList.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '没有找到对应回复！'})
        return;
      }
      let comment = $(`.c_${floor}`)
      if (!comment.length) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '没有找到对应回复！'})
        return
      }
      comment[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
      comment.addClass('ding')
      this.currentFloor = floor + 1
      setTimeout(() => {
        comment.removeClass('ding')
      }, 2000)
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

.preview-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: -1000vh;
  z-index: 9999;

  .close {
    font-size: 2rem;
    color: white;
    position: absolute;
    right: 2rem;
    top: 2rem;
    cursor: pointer;
  }

  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, .7);
    transition: all .3s;
  }
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
  z-index: 1002;
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

  @media screen and (max-width: 1280px) {
    @width: 60vw;
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
    width: 4.2rem;
    transform: translateX(6rem);
    font-size: 2rem;
    background: var(--color-sp-btn-bg);
    color: var(--color-font-3);

    svg {
      font-size: 2.4rem;
    }
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

  .msg {
    .scroll-top;
    bottom: 5rem;
  }

  .close-btn {
    color: var(--color-font-3);
    cursor: pointer;
    position: fixed;
    top: 3rem;
    transform: translateX(4rem);
    font-size: 1.6rem;
  }

  .top-reply {
    color: var(--color-font-3);
    cursor: pointer;
    font-size: 2rem;
    display: flex;

  }
}

</style>
