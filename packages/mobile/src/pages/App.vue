<script>
import {MAX_REPLY_LIMIT, PageType} from "@v2next/core/types.ts"
import {computed, nextTick} from "vue";
import Setting from "./Setting.vue";
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import PostDetail from "../components/PostDetail.vue";
import Base64Tooltip from "../components/Base64Tooltip.vue";
import Msg from '../components/Msg.vue';
import Tooltip from "../components/Tooltip.vue";
import TagModal from "../components/Modal/TagModal.vue";
import MsgModal from "../components/Modal/MsgModal.vue";
import {decodeEmail} from "../utils/email-decode.js";
import BaseSwitch from "../components/BaseSwitch.vue";
import BaseLoading from "../components/BaseLoading.vue";
import NotificationModal from "../components/Modal/NotificationModal.vue";
import BaseButton from "../components/BaseButton.vue";
import {functions, getDefaultPost} from "@v2next/core/core.ts";

export default {
  components: {
    BaseButton,
    NotificationModal,
    BaseLoading, BaseSwitch, MsgModal, TagModal, Tooltip, Setting, PostDetail, Base64Tooltip, Msg
  },
  provide() {
    return {
      user: computed(() => window.user),
      isLogin: computed(() => this.isLogin),
      isNight: computed(() => this.isNight),
      pageType: computed(() => this.pageType),
      tags: computed(() => this.tags),
      show: computed(() => this.show),
      post: computed(() => this.current),
      config: computed(() => this.config),
      allReplyUsers: computed(() => {
        if (this.current?.replyList) {
          return Array.from(new Set(this.current?.replyList?.map(v => v.username) ?? []))
        }
        return []
      }),
    }
  },
  data() {
    return {
      loading: window.pageType === PageType.Post,
      refreshLoading: false,
      loadMore: false,
      isLogin: !!window.user.username,
      pageType: window.pageType,
      isNight: window.isNight,
      stopMe: window.stopMe,//停止使用脚本
      show: false,
      current: getDefaultPost(),
      list: [],
      config: functions.clone(window.config),
      tags: window.user.tags,
      readList: window.user.readList,
      notificationModal: {
        show: false,
        h: ''
      },
      step: 0,
    }
  },
  computed: {
    targetUserTags() {
      return this.tags[window.targetUserName] ?? []
    },
    isList() {
      return [PageType.Home, PageType.Node].includes(this.pageType)
    },
    isPost() {
      return this.pageType === PageType.Post
    },
    isMember() {
      return this.pageType === PageType.Member
    },
  },
  watch: {
    config: {
      handler(newVal) {
        let config = {[window.user.username ?? 'default']: newVal}
        localStorage.setItem('v2ex-config', JSON.stringify(config))
        window.config = newVal
      },
      deep: true
    },
    tags(newVal) {
      window.user.tags = newVal
    },
    'config.viewType'(newVal) {
      if (!newVal) return
      if (newVal === 'card') {
        $('.post-item').each(function () {
          $(this).addClass('preview')
        })
      } else {
        $('.post-item').each(function () {
          $(this).removeClass('preview')
        })
      }
    },
    'config.fontSizeType': {
      handler(newVal) {
        switch (newVal) {
          case 'small':
            return $('html').css('font-size', '8px')
          case 'normal':
            return $('html').css('font-size', '10px')
          case 'large':
            return $('html').css('font-size', '12px')
          case 'big-large':
            return $('html').css('font-size', '14px')
        }
      },
      deep: true
    },
    show(n) {
      if (n) this.step++
      else this.step--
      this.slide('post')
    }
  },
  created() {
    let that = this
    this.initEvent()
    window.cb = this.winCb
    if (!window.canParseV2exPage) return

    // fetch(location.origin)

    //A标签的
    document.addEventListener('click', this.clickA, true)
    //帖子的
    $(document).on('click', '.post-item', function (e) {
      // console.log('click-post-item')
      if (e.currentTarget.getAttribute('script')) return
      if (that.stopMe) return true
      //只有预览时，才响应点击
      if (this.classList.contains('preview')) {
        //A标签，要么上面的on事件已经处理了，要么就是不需要处理
        //IMG是头像
        //toggle是切换按钮
        if (e.target.tagName !== 'A'
            &&
            e.target.tagName !== 'IMG'
        ) {
          console.log('点空白处', this)
          let id = this.dataset['id']
          let href = this.dataset['href']
          if (id) {
            that.clickPost(e, id, href)
          } else {
            if (href) location.href = href
          }
        }
      }
    })

    window.onpopstate = (event) => {
      if (event.state) {
        if (!this.show) this.show = true
      } else {
        if (this.show) this.show = false
      }
    };

    window.deleteNotification = (nId, token) => {
      console.log('deleteNotification', nId, token)
      let item = $("#n_" + nId)
      item.slideUp('fast');
      $.post({
        url: '/delete/notification/' + nId + '?once=' + token,
        success() {
          // $.get('/notifications/below/' + window.notificationBottom || nId, (data, status, request) => {
          //   $('#notifications').append(data);
          //   window.notificationBottom = request.getResponseHeader('X-V2EX-New-Notification-Bottom');
          // })
          // if (!window.notificationBottom) window.notificationBottom = nId
          $.get({
            url: '/notifications/below/' + window.notificationBottom,
            success(data, status, request) {
              item.remove()
              $('#notifications').append(data);
              window.notificationBottom = request.getResponseHeader('X-V2EX-New-Notification-Bottom');
            },
            error() {
              item.slideDown('fast');
            }
          })
        },
        error() {
          item.slideDown('fast');
        }
      })
    }
  },
  beforeUnmount() {
    // console.log('unmounted')
    eventBus.clear()
    document.removeEventListener('click', this.clickA, true)
  },
  methods: {
    async getUnreadMessagesCount() {
      const res = await fetch(`${location.origin}/mission`)
      const htmlText = await res.text()
      const $page = $(htmlText)
      const text = $page.find('#Rightbar a[href^="/notifications"]').text()

      if (text.includes('未读提醒')) {
        const countStr = text.match(/\d+/)?.at(0)

        if (countStr) {
          return Number(text.match(/\d+/)?.at(0))
        }
      } else {
        return 0
      }
      throw new Error('无法获取未读消息数量')
    },
    clickA(e) {
      if (!e?.target) return
      if (e.target.tagName !== 'A') return
      let that = this
      //有script表示是脚本生成的a标签用于新开页面的
      if (e.target.getAttribute('script')) return
      if (that.stopMe) return true
      let {href, id, title} = functions.parseA(e.target)

      // console.log('click-a', e.target, e, href, id, title)
      //夜间模式切换
      if (href.includes('/settings/night/toggle')) return
      if (href.includes('/?tab=')) return
      if (href.includes('/go')) return
      //清除最近记录
      if (href === window.origin + '/#;') return
      //主页
      if (href === window.origin + '/') return
      //最近
      if (href === window.origin + '/recent') return
      //未读提醒
      if (href.includes('/notifications')) return
      if (href === window.origin + '/script-setting') {
        window.functions.clickAvatar(this.show ? '.post-wrapper ' : '')
        this.slide('setting', this.step++)
        that.stopEvent(e)
        return
      }

      if (id) {
        that.clickPost(e, id, href, title)
      } else {
        if (that.config.newTabOpen) {
          that.stopEvent(e)
          functions.openNewTab(href)
        }
      }
    },
    stopEvent(e) {
      e.preventDefault()
      e.stopPropagation()
    },
    async clickPost(e, id, href, title = '') {
      // id = '976890'
      if (id) {
        if (this.config.clickPostItemOpenDetail) {
          this.stopEvent(e)
          let index = this.list.findIndex(v => v.id == id)
          let postItem = getDefaultPost()

          if (index > -1) {
            postItem = this.list[index]
          }
          if (!postItem.title) {
            postItem.title = title ?? '加载中'
          }
          postItem.inList = index > -1

          //如果在列表里面，直接判断大小即可
          if (postItem.inList) {
            if (postItem.replyCount > MAX_REPLY_LIMIT) {
              return functions.openNewTab(`${location.origin}/t/${id}?p=1&script=1`)
            }
          }

          // console.log('postItem', this.list, postItem)
          postItem.id = id
          postItem.href = href
          if (!postItem.headerTemplate) {
            let template = `
            <div class="cell">
              <div class="topic_content">
                <div class="markdown_body">
                 ${postItem?.content_rendered ?? ''}
                </div>
              </div>
            </div>
            `
            postItem.headerTemplate = template
          }
          this.getPostDetail(postItem)
          return
        }
        if (this.config.newTabOpen) {
          this.stopEvent(e)
          functions.openNewTab(`https://www.v2ex.com/t/${id}?p=1`)
        }
      }
    },
    showPost() {
      $('.slide-list').css('transition', `0s`)
      setTimeout(() => {
        $('.slide-list').css('transition', `transform .3s`)
      }, 500)
      this.show = true
      $('#site-header').css('margin-top', '-42px')
      $(`#Wrapper .box:lt(5)`).each(function () {
        $(this).hide()
      })
    },
    slide(to = 'post', v) {
      if (this.step === 1) {
        if (to === 'post') {
          $('.post-wrapper').css('z-index', 10)
          $('.setting-wrapper').css('z-index', 9)
        } else {
          $('.post-wrapper').css('z-index', 9)
          $('.setting-wrapper').css('z-index', 10)
        }
      }
      $('.slide-list').css('transform', `translateX(-${this.step * 100}vw)`)
    },
    async winCb({type, value}) {
      console.log('回调的类型', type, value)
      if (type === 'syncList') {
        this.list = Object.assign(this.list, window.postList)
      }
      if (type === 'syncData') {
        this.list = window.postList
        this.config = window.config
        this.stopMe = window.stopMe
        this.tags = window.user.tags
        this.readList = window.user.readList
        this.current.read = this.readList[this.current.id] ?? {}
        if (this.show && this.isPost && this.current.read.floor) {
          this.$refs.postDetail.read = this.current.read
          //单独打开，如果不去点击到标签页，Chrome无法跳转。不知道是为什么
          // nextTick(() => {
          //   this.$refs.postDetail.jumpLastRead(this.current.read.floor)
          // })
        }
        // console.log('this.readList', this.readList)
        // console.log(this.tags)
      }

      if (type === 'warningNotice') {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: value})
      }

      if (this.stopMe) return

      if (type === 'restorePost') {
        this.show = false
        this.loading = false
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '脚本无法查看此页面！'})
        $(`#Wrapper #Main .box:lt(3)`).each(function () {
          $(this).show()
        })
      }

      if (type === 'postContent') {
        this.current = Object.assign(this.current, value)
        this.current.inList = true
        //这时有正文了，再打开，体验比较好
        this.showPost()
      }
      if (type === 'postReplies') {
        this.current = Object.assign(this.current, value)
        // console.log('当前帖子', this.current)
        this.list.push(this.clone(this.current))
        this.loading = false
      }
    },
    clone(val) {
      return functions.clone(val)
    },
    regenerateReplyList() {
      // console.log('重新生成列表')
      if (this.current.replyList.length) {
        this.current.replyCount = this.current.replyList.length
        let res = functions.createNestedList(this.current.replyList)
        if (res) {
          this.current.nestedReplies = res
        }
        let dup_res = functions.createNestedRedundantList(this.current.replyList)
        if (dup_res) {
          this.current.nestedRedundReplies = dup_res
        }
      } else {
        this.current.replyCount = 0
        this.current.nestedReplies = []
        this.current.nestedRedundReplies = []
      }

      if (this.list.length) {
        let rIndex = this.list.findIndex(i => i.id === this.current.id)
        if (rIndex > -1) {
          this.list[rIndex] = this.clone(this.current)
        }
      }
    },
    initEvent() {
      eventBus.on(CMD.CHANGE_COMMENT_THANK, (val) => {
        console.log('CHANGE_COMMENT_THANK', val)
        const {id, type} = val
        let currentI = this.current.replyList.findIndex(i => i.id === id)
        if (currentI > -1) {
          this.current.replyList[currentI].isThanked = type === 'add'
          if (type === 'add') {
            this.current.replyList[currentI].thankCount++
          } else {
            this.current.replyList[currentI].thankCount--
          }
          this.regenerateReplyList()
        }
      })
      eventBus.on(CMD.CHANGE_POST_THANK, (val) => {
        const {id, type} = val
        this.current.isThanked = type === 'add'
        if (type === 'add') {
          this.current.thankCount++
        } else {
          this.current.thankCount--
        }
        let currentI = this.list.findIndex(i => i.id === id)
        if (currentI > -1) {
          this.list[currentI].isThanked = type === 'add'
          if (type === 'add') {
            this.list[currentI].thankCount++
          } else {
            this.list[currentI].thankCount++
          }
        }
      })
      eventBus.on(CMD.REMOVE, (val) => {
        // console.log('remove', val)
        let removeIndex = this.current.replyList.findIndex(i => i.floor === val)
        // console.log('removeIndex',removeIndex)
        if (removeIndex > -1) {
          this.current.replyList.splice(removeIndex, 1)
        }
        // console.log('removeIndex',this.current.replyList)

        this.regenerateReplyList()
        // this.msgList.push({...val, id: Date.now()})
      })
      eventBus.on(CMD.IGNORE, () => {
        this.show = false
        let rIndex = this.list.findIndex(i => i.id === this.current.id)
        if (rIndex > -1) {
          this.list.splice(rIndex, 1)
        }
        let el = document.querySelector(`.id_${this.current.id}`)
        if (el) el.remove()
        this.current = getDefaultPost()
      })
      eventBus.on(CMD.MERGE, (val) => {
        this.current = Object.assign(this.current, val)
        let rIndex = this.list.findIndex(i => i.id === this.current.id)
        if (rIndex > -1) {
          this.list[rIndex] = this.clone(this.current)
        }
      })
      eventBus.on(CMD.MERGE_CONFIG, (val) => {
        this.config = Object.assign(this.config, val)
      })
      eventBus.on(CMD.ADD_READ, (val) => {
        this.readList[this.current.id] = val
      })
      eventBus.on(CMD.ADD_REPLY, (item) => {
        this.current.replyList.push(item)
        this.regenerateReplyList()
      })
      eventBus.on(CMD.REFRESH_ONCE, async (once) => {
        if (once) {
          if (typeof once === 'string') {
            let res = once.match(/var once = "([\d]+)";/)
            if (res && res[1]) {
              this.current.once = Number(res[1])
              // console.log('接口返回了once-str', this.current.once)
              return
            }
          }
          if (typeof once === 'number') {
            this.current.once = once
            // console.log('接口返回了once-number', this.current.once)
            return
          }
        }
        window.fetchOnce().then(r => {
          // console.log('通过fetchOnce接口拿once', r)
          this.current.once = r
        })
      })
      eventBus.on(CMD.REMOVE_TAG, async ({username, tag}) => {
        let oldTag = this.clone(this.tags)
        let tags = this.tags[username] ?? []
        let rIndex = tags.findIndex(v => v === tag)
        if (rIndex > -1) {
          tags.splice(rIndex, 1)
        }
        this.tags[username] = tags

        let res = await window.parse.saveTags(this.tags)
        if (!res) {
          eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '标签删除失败！'})
          this.tags = oldTag
        }
      })
      eventBus.on(CMD.REFRESH_POST, () => this.getPostDetail(this.current))
    },
    async getPostDetail(post) {
      console.log('getPostDetail', this.clone(post))
      this.current = post
      this.current.read = this.readList[this.current.id] ?? {floor: 0, total: 0}
      this.show = true

      //如果不在列表里面，则调用接口判断,调接口比请求html正则判断来得快，他接口有缓存的
      if (!this.current.inList) {
        this.loading = true
        let r = await functions.checkPostReplies(post.id, true)
        if (r) {
          eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '由于回复数量较多，已为您单独打开此主题'})
          this.loading = this.show = false
          return
        }
      }

      let url = location.origin + '/t/' + post.id
      this.current.url = url

      let alreadyHasReply = this.current.replyList.length
      //如果有数据，显示右侧的loading
      if (alreadyHasReply) {
        this.refreshLoading = true
        this.$refs.postDetail.jumpLastRead(this.current.read.floor)
      } else {
        this.loading = true
      }

      //ajax不能判断是否跳转
      // $.get(url + '?p=1').then((res, textStatus, xhr) => {
      let apiRes = await window.fetch(url + '?p=1')
      if (apiRes.status === 404) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '主题未找到'})
        return this.refreshLoading = this.loading = false
      }
      if (apiRes.status === 403) {
        this.refreshLoading = this.show = this.loading = false
        functions.openNewTab(`${location.origin}/t/${post.id}?p=1&script=0`)
        return
      }
      //如果是重定向了，那么就是没权限
      if (apiRes.redirected) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '没有权限'})
        return this.refreshLoading = this.loading = false
      }
      let htmlText = await apiRes.text()
      let hasPermission = htmlText.search('你要查看的页面需要先登录')
      if (hasPermission > -1) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '你要查看的页面需要先登录'})
        return this.refreshLoading = this.loading = false
      }
      let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
      let body = $(bodyText[0])

      decodeEmail(body)

      await window.parse.getPostDetail(this.current, body, htmlText)
      let index = this.list.findIndex(v => v.id == this.current.id)
      if (index > -1) {
        this.list[index] = this.clone(this.current)
      } else {
        this.list.push(this.clone(this.current))
      }
      this.refreshLoading = this.loading = false
      if (!alreadyHasReply) {
        nextTick(() => {
          this.$refs.postDetail.jumpLastRead(this.current.read.floor)
        })
      }
      await window.parse.parseOp(this.current)
      console.log('当前帖子', this.current)
    },
    addTargetUserTag() {
      eventBus.emit(CMD.ADD_TAG, window.targetUserName)
    },
    removeTargetUserTag(tag) {
      eventBus.emit(CMD.REMOVE_TAG, {username: window.targetUserName, tag})
    },
  },
}
</script>

<template>
  <Setting v-model="config"
           @back="slide('post', step--)"
           to=".setting-wrapper"/>
  <Setting v-model="config"
           @back="slide('post', step--)"
           to=".setting-wrapper2"/>
  <PostDetail v-model="show"
              ref="postDetail"
              v-model:displayType="config.commentDisplayType"
              @refresh="getPostDetail(current)"
              :loading="loading"
              :refreshLoading="refreshLoading"
  />

  <TagModal v-model:tags="tags"/>
  <Base64Tooltip/>
  <MsgModal/>

  <NotificationModal
      v-if="false"
      v-model="notificationModal.show"
      :h="notificationModal.h"
  />

  <template v-if="!stopMe">
    <div class="target-user-tags p1" v-if="isMember && isLogin && config.openTag">
      <span>标签：</span>
      <span class="my-tag" v-for="i in targetUserTags">
              <i class="fa fa-tag"></i>
              <span>{{ i }}</span>
              <i class="fa fa-trash-o remove" @click="removeTargetUserTag(i)"></i>
            </span>
      <span class="add-tag ago" @click="addTargetUserTag" title="添加标签">+</span>
    </div>
    <div v-if="isPost && !show" class="my-box p2"
         style="margin-top: 2rem;">
      <div class="flex flex-center" v-if="loading">
        <BaseLoading/>
      </div>
      <div v-else class="loaded">
        <span>楼中楼解析完成</span>
        <BaseButton size="small" @click="showPost">点击显示</BaseButton>
      </div>
    </div>
  </template>
</template>

<style lang="less">
@import "../assets/less/index";
</style>

<style scoped lang="less">

.target-user-tags {
  background: var(--color-second-bg);
  color: var(--color-font);
  word-break: break-all;
  text-align: start;
  font-size: 1.4rem;
  box-shadow: 0 2px 3px rgba(0, 0, 0, .1);
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  .add-tag {
    display: inline-block;
  }
}

.loaded {
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>

