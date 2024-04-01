<script>
import {MAX_REPLY_LIMIT, PageType} from "@v2next/core/types.ts"
import {computed} from "vue";
import Setting from "./components/Modal/SettingModal.vue";
import eventBus from "./utils/eventBus.js";
import {CMD} from "./utils/type.js";
import PostDetail from "./components/PostDetail.vue";
import Base64Tooltip from "./components/Base64Tooltip.vue";
import Msg from './components/Msg.vue';
import Tooltip from "./components/Tooltip.vue";
import TagModal from "./components/Modal/TagModal.vue";
import MsgModal from "./components/Modal/MsgModal.vue";
import {decodeEmail} from "./utils/email-decode.js";
import BaseSwitch from "./components/BaseSwitch.vue";
import BaseLoading from "./components/BaseLoading.vue";
import NotificationModal from "./components/Modal/NotificationModal.vue";
import BaseButton from "./components/BaseButton.vue";
import {DefaultPost, DefaultVal, functions, getDefaultPost} from "@v2next/core/core.ts";

export default {
  components: {
    BaseButton,
    NotificationModal,
    BaseLoading, BaseSwitch, MsgModal, TagModal, Tooltip, Setting, PostDetail, Base64Tooltip, Msg
  },
  provide() {
    return {
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
      showConfig: this.showConfig
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
      current: window.clone(window.initPost),
      list: [],
      config: window.clone(window.config),
      tags: window.user.tags,
      configModal: {
        show: false
      },
      notificationModal: {
        show: false,
        h: ''
      },
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
        if (window.initConfig) {
          window.parse.editNoteItem(window.user.configPrefix + JSON.stringify(window.config), window.user.configNoteId)
        }
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
  },
  created() {
    let that = this
    this.initEvent()
    window.cb = this.winCb
    if (!window.canParseV2exPage) return

    // fetch(location.origin)

    //A标签的
    $(document).on('click', 'a', this.clickA)
    //主题的
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
            &&
            !e.target.classList.contains('toggle')
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
    //展开或收起的点击事件
    $(document).on('click', '.toggle', (e) => {
      if (this.stopMe) return true
      let id = e.target.dataset['id']
      let itemDom = document.querySelector(`.id_${id}`)
      if (itemDom.classList.contains('preview')) {
        e.target.innerText = '预览'
        itemDom.classList.remove('preview')
      } else {
        if (this.config.viewType !== 'card') {
          let index = this.list.findIndex(v => v.id == id)
          if (index > -1) {
            e.target.innerText = '收起'
            itemDom.classList.add('preview')
          } else {
            e.target.innerText = '加载中'
            functions.getPostDetailByApi(id).then(res => {
              if (res.content_rendered) {
                res.href = itemDom.dataset['href']
                this.list.push(getDefaultPost(res))
                itemDom.classList.add('preview')
                e.target.innerText = '收起'
                functions.appendPostContent(res, itemDom)
              } else {
                e.target.innerText = '预览'
                eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '主题暂无正文！'})
              }
            })
          }
        } else {
          e.target.innerText = '收起'
          itemDom.classList.add('preview')
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
    $(document).off('click', 'a', this.clickA)
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
      let that = this
      //有script表示是脚本生成的a标签用于新开页面的
      if (e.currentTarget.getAttribute('script')) return
      if (that.stopMe) return true

      let {pageType} = functions.checkPageType(e.currentTarget)
      // console.log('click-a', e.currentTarget.pathname)
      // console.log('pageType', pageType)
      switch (pageType) {
        case PageType.Post:
          let {href, id, title} = functions.parseA(e.currentTarget)
          if (id) {
            that.clickPost(e, id, href, title)
          }
          break
        case PageType.Node:
        case PageType.Home:
        case PageType.Changes:
          return
        default:
          //夜间模式切换
          if (e.currentTarget.href.includes('/settings/night/toggle')) return
          //清除最近记录
          if (e.currentTarget.href === location.origin + '/#;') return
          //未读提醒
          if (e.currentTarget.href.includes('/notifications')) {
            // this.notificationModal.show = true
            //
            // let clientWidth = window.document.body.clientWidth
            // let windowWidth = 1200
            // let left = clientWidth / 2 - windowWidth / 2
            // // let newWin = window.open("https://v2ex.com/notifications", "hello", `width=${windowWidth},height=600,left=${left},top=100`);
            // // newWin.document.write('123');
            //
            // fetch(href).then(async r => {
            //   let htmlText = await r.text()
            //   let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g)
            //   let res = htmlText.match(/var notificationBottom = ([\d]+);/)
            //   if (res && res[1]) {
            //     window.notificationBottom = Number(res[1])
            //     console.log(' window.notificationBottom', window.notificationBottom)
            //   }
            //
            //   let body = $(bodyText[0])
            //   let h = body.find('#notifications').parent().html()
            //   this.notificationModal.h = h
            //
            // })
            // that.stopEvent(e)
          }

          if (that.config.newTabOpen) {
            that.stopEvent(e)
            functions.openNewTab(e.currentTarget.href, that.config.newTabOpenActive)
          }
          return
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
          let postItem = getDefaultPost()
          let index = this.list.findIndex(v => v.id == id)
          if (index > -1) {
            postItem = this.list[index]
          }
          if (!postItem.title) postItem.title = title ?? '加载中'
          // console.log('postItem', JSON.stringify(postItem))
          postItem.id = id
          postItem.href = href
          this.getPostDetail(postItem)
          return
        }
        if (this.config.newTabOpen) {
          this.stopEvent(e)
          functions.openNewTab(`https://www.v2ex.com/t/${id}?p=1`, this.config.newTabOpenActive)
        }
      }
    },
    showPost() {
      this.show = true
      $(`#Wrapper #Main .box:lt(3)`).each(function () {
        $(this).hide()
      })
    },
    showConfig() {
      this.configModal.show = true
    },
    async winCb({type, value}) {
      // console.log('回调的类型', type, value)
      if (type === 'openSetting') {
        this.showConfig()
      }
      if (type === 'syncData') {
        this.list = Object.assign(this.list, window.postList)
        this.config = window.config
        this.stopMe = window.stopMe
        this.tags = window.user.tags
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
        if (this.config.autoOpenDetail) {
          this.showPost()
        }
      }

      if (type === 'postReplies') {
        this.current = Object.assign(this.current, value)
        // console.log('当前主题', this.current)
        this.list.push(this.clone(this.current))
        this.loading = false
      }
    },
    clone(val) {
      return window.clone(val)
    },
    regenerateReplyList() {
      // console.log('重新生成列表')
      if (this.current.replyList.length) {
        this.current.replyCount = this.current.replyList.length
        this.current.topReplyList = window.clone(this.current.replyList)
            .filter(v => v.thankCount >= this.config.topReplyLoveMinCount)
            .sort((a, b) => b.thankCount - a.thankCount)
            .slice(0, this.config.topReplyCount)
        let res = functions.createNestedList(window.clone(this.current.replyList), this.current.topReplyList)
        if (res) {
          this.current.nestedReplies = res
        }
        let dup_res = functions.createNestedRedundantList(window.clone(this.current.replyList), this.current.topReplyList)
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
        this.current = this.clone(window.initPost)
      })
      eventBus.on(CMD.MERGE, (val) => {
        this.current = Object.assign(this.current, val)
        let rIndex = this.list.findIndex(i => i.id === this.current.id)
        if (rIndex > -1) {
          this.list[rIndex] = this.clone(this.current)
        }
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
      // console.log('getPostDetail')
      this.current = post
      this.show = true
      let url = window.baseUrl + '/t/' + this.current.id
      this.current.url = url

      let alreadyHasReply = this.current.replyList.length
      //如果有数据，显示右侧的loading
      if (alreadyHasReply) {
        this.refreshLoading = true
      } else {
        this.loading = true

        functions.getPostDetailByApi(this.current.id).then(d => {
          d.replyCount = d.replies
          this.current = Object.assign(this.current, d)
          if (this.current.replyCount > MAX_REPLY_LIMIT) {
            functions.openNewTab(`${location.origin}/t/${this.current.id}?p=1&script=1`, true)
            eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '由于回复数量较多，已为您单独打开此主题'})
            this.loading = this.show = false
            return
          } else {
            this.current.jsonContent = `
            <div class="cell">
              <div class="topic_content">
                <div class="markdown_body">
                 ${d?.content_rendered ?? ''}
                </div>
              </div>
            </div>`
          }
        })
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
        functions.openNewTab(`${location.origin}/t/${post.id}?p=1&script=0`, true)
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

      await window.parse.parseOp(this.current)
      // console.log('当前主题', this.current)
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
  <Setting v-model="config" v-model:show="configModal.show"/>
  <TagModal v-model:tags="tags"/>
  <PostDetail v-model="show"
              ref="postDetail"
              v-model:displayType="config.commentDisplayType"
              @refresh="getPostDetail(current)"
              :loading="loading"
              :refreshLoading="refreshLoading"
  />
  <Base64Tooltip/>
  <MsgModal/>

  <NotificationModal
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
    <div v-if="isPost && !show " class="my-box p2" style="margin-top: 2rem;margin-bottom: 0;">
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
@import "assets/less/index";
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
  color: var(--color-font-pure);
}
</style>

