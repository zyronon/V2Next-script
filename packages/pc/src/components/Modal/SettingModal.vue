<template>
  <Transition>
    <div v-if="show" class="setting-modal modal">
      <div class="mask" @click="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            脚本设置
          </div>
          <Icon icon="ic:round-close" @click="close"/>
        </div>
        <div class="log" v-if="isNew">
          <a @click="goPost">New：手机App现已发布，支持楼中楼！PC脚本新增历史最热数据、imgur换源功能！点击查看详细介绍</a>
          <div class="new"></div>
        </div>
        <div class="body">
          <div class="left">
            <div class="tabs">
              <div class="tab" :class="tabIndex === 0 && 'active'" @click="tabIndex = 0">
                <Icon icon="weui:setting-outlined"/>
                <span>列表</span>
              </div>
              <div class="tab" :class="tabIndex === 1 && 'active'" @click="tabIndex = 1">
                <Icon icon="stash:article-alt-light"/>
                <span>主题</span>
              </div>
              <div class="tab" :class="tabIndex === 2 && 'active'" @click="tabIndex = 2">
                <Icon icon="fluent:more-circle-20-regular"/>
                <span>其他</span>
              </div>
              <div class="tab" :class="tabIndex === 3 && 'active'" @click="tabIndex = 3">
                <Icon icon="ix:about"/>
                <span>关于</span>
              </div>
              <div class="tab" :class="tabIndex === 4 && 'active'" @click="tabIndex = 4">
                <Icon icon="ix:about"/>
                <span>插件</span>
              </div>
            </div>
            <div class="bottom">
              <div class="tip">
                如果可以的话欢迎点个star支持一下~
              </div>
              <div class="icons">
                <a :href="DefaultVal.git" target="_blank">
                  <Icon icon="mdi:github"/>
                </a>
                <a :href="DefaultVal.homeUrl" target="_blank">
                  <Icon icon="iconamoon:home-light"/>
                </a>
              </div>
            </div>

          </div>
          <div class="modal-content">
            <div class="scroll">
              <div v-if="tabIndex === 0">
                <div class="border">
                  <div class="row">
                    <label class="item-title">列表展示方式</label>
                    <div class="wrapper">
                      <div class="radio-group2">
                        <div class="radio"
                             @click="config.viewType = 'simple'"
                             :class="config.viewType === 'simple'?'active':''">简洁
                        </div>
                        <div class="radio"
                             @click="config.viewType = 'table'"
                             :class="config.viewType === 'table'?'active':''">表格
                        </div>
                        <div class="radio"
                             @click="showNotice = true"
                             :class="config.viewType === 'card'?'active':''">卡片
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="desc danger">
                    提示：此项需要刷新页面才能生效
                  </div>
                </div>


                <div class="border">
                  <div class="row">
                    <label class="item-title">主题弹框显示</label>
                    <div class="wrapper">
                      <BaseSwitch v-model="config.clickPostItemOpenDetail"/>
                    </div>
                  </div>
                  <div class="desc">
                    开启此选项后，主题会<span class="danger">始终</span>以弹框的方式显示。优先级大于“新标签页打开链接”
                  </div>
                </div>

                <div class="border">
                  <div class="row">
                    <label class="item-title">新标签页打开链接</label>
                    <div class="wrapper">
                      <BaseSwitch v-model="config.newTabOpen"/>
                    </div>
                  </div>
                  <div class="desc">
                    网页上所有链接通过新标签页打开
                  </div>
                </div>

                <div class="row">
                  <label class="item-title">打开新标签页时立即切换过去</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.newTabOpenActive"/>
                  </div>
                </div>
              </div>
              <div v-if="tabIndex === 1">
                <div class="row border">
                  <label class="item-title">回复类型</label>
                  <div class="wrapper">
                    <BaseSelect v-model:display-type="config.commentDisplayType"/>
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">详情页中显示“回复类型”</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showToolbar"/>
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">替换Imgur源</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.replaceImgur"/>
                  </div>
                </div>
                <div class="border">
                  <div class="row">
                    <label class="item-title">单独打开主题时默认显示楼中楼</label>
                    <div class="wrapper">
                      <BaseSwitch v-model="config.autoOpenDetail"/>
                    </div>
                  </div>
                  <div class="desc">
                    单独打开这种地址 https://v2ex.com/t/xxxx 时，是否默认显示楼中楼
                  </div>
                </div>

                <div class="row border">
                  <label class="item-title">点击左右两侧透明处关闭主题详情弹框</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.closePostDetailBySpace"/>
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">正文超长自动折叠</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.contentAutoCollapse"/>
                  </div>
                </div>
                <div class="border">
                  <div class="row ">
                    <label class="item-title">主题宽度</label>
                    <div class="wrapper">
                      <input type="text" v-model="config.postWidth">
                    </div>
                  </div>
                  <div class="desc">
                    未设定此值时，则默认宽度为77rem。接受合法的width值：
                    <a style="color: #40a9ff;text-decoration: underline;"
                       href="https://vue3js.cn/interview/css/em_px_rem_vh_vw.html#%E4%BA%8C%E3%80%81%E5%8D%95%E4%BD%8D"
                       target="_blank">rem、px、vw、vh(点此查看)</a>。
                    vw代表屏幕百分比，如想要屏幕的66%，请填写66vw
                  </div>
                  <div class="desc">
                    提示：此项设置以后，单独打开详情页时会出现主题突然变宽（窄）的问题，暂时无解
                  </div>
                  <div class="desc danger">
                    提示：此项需要刷新页面才能生效
                  </div>
                </div>

                <div class="row">
                  <label class="main-title">高赞回复</label>
                </div>
                <div class="row border">
                  <label class="item-title">显示高赞回复</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showTopReply"/>
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">最多显示{{ config.topReplyCount }}个高赞回复</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyCount">
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">最少需要{{ config.topReplyLoveMinCount }}个赞才能被判定为高赞</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyLoveMinCount">
                  </div>
                </div>
              </div>
              <div v-if="tabIndex === 2">
                <div class="row">
                  <label class="main-title">收藏列表</label>
                </div>
                <div class="border">
                  <div class="row">
                    <div>
                      <BaseButton @click="exportCollectList" :loading="exportLoading">导出</BaseButton>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <div style="display:inline-flex;overflow:hidden;position:relative;">
                        <BaseButton :loading="importLoading">导入，并收藏</BaseButton>
                        <input v-if="showInput" type="file"
                               style="position: absolute;width: 100%;height: 100px;opacity: 0;"
                               @change="importCollectList">
                      </div>
                      <div style="display:inline;margin-left: 10px;font-size: 18px;" v-if="importLoading">
                        导入中：{{ index }}/{{ total }} ，大约需要{{ endTime }}分钟，导入完成前请勿关闭和刷新本页面
                      </div>
                      <div style="display:inline;margin-left: 10px;" v-if="importOk">
                        导入完成
                      </div>
                    </div>
                  </div>
                  <div class="desc">
                    默认导出为 json 文件，如需其他格式，请使用 ChatGpt/Deepseek 转换
                  </div>
                </div>

                <div class="row">
                  <label class="item-title">收藏时提醒添加到书签</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.collectBrowserNotice"/>
                  </div>
                </div>
                <div class="desc">
                  解释：V站帐号一旦被封禁，则无法登录，无法查看账号收藏了
                </div>

                <div class="row border">
                  <label class="main-title">其他</label>
                </div>
                <div class="row border">
                  <label class="item-title">用户打标签(跨平台，数据保存在自己的记事本)：</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.openTag"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">划词显示Base64解码框</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.base64"/>
                  </div>
                </div>
                <div class="row border">
                  <label class="item-title">自动签到</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.autoSignin"/>
                  </div>
                </div>
                <div class="border">
                  <div class="row ">
                    <label class="item-title">自定义背景</label>
                    <div class="wrapper">
                      <input type="text" v-model="config.customBgColor">
                    </div>
                  </div>
                  <div class="desc">
                    未设定此值时，则脚本就什么都不做，V站大部分页面背景颜色默认为 #e2e2e2，少部分页面有特定背景。接受一个合法的css
                    color值：例如<a
                    href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value"
                    target="_blank">red、#ffffff、rgb(222,222,22)(点此查看)</a>等等。
                  </div>
                  <div class="desc danger">
                    提示：此项需要刷新页面才能生效
                  </div>
                </div>

                <div class="row">
                  <label class="main-title">消息通知</label>
                </div>
                <div class="row border">
                  <label class="item-title">接管未读提醒页面</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.notice.takeOverNoticePage"/>
                  </div>
                </div>

                <div class="row">
                  <label class="item-title">定时查询未读提醒</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.notice.loopCheckNotice"/>
                  </div>
                </div>
                <div class="desc">
                  开启此功能会带来以下影响：
                  1、你的IP可能会被封禁
                  2、消耗更多流量，给服务器带来更大的负担
                  3、你的V站浏览进度条会变快
                </div>
                <div v-if="config.notice.loopCheckNotice" class="sub-content">
                  <div class="row">
                    <label class="item-title">查询间隔</label>
                    <div class="wrapper">
                      <input type="number"
                             :value="config.notice.loopCheckNoticeInterval"
                             @blur="e=>config.notice.loopCheckNoticeInterval = e.target.value"
                             style="margin-right: 1rem">分钟
                    </div>
                  </div>
                  <div class="desc">
                    设置值太小，会导致频繁请求，你的IP可能会被封禁，建议设置为5，即每次5分钟查询一次
                  </div>
                  <div class="row">
                    <label class="item-title">当有新未读提醒时，网页标题闪烁</label>
                    <div class="wrapper">
                      <BaseSwitch v-model="config.notice.whenNewNoticeGlimmer"/>
                    </div>
                  </div>
                  <div class="row">
                    <label class="item-title">钉钉Webhook地址</label>
                  </div>
                  <div class="desc">
                    <input type="text" :value="config.notice.ddWebhook"
                           @blur="e=>config.notice.ddWebhook = e.target.value"
                           style="width: 100%;">
                  </div>
                </div>
                <div class="desc danger">
                  提示：此项需要刷新页面才能生效
                </div>
              </div>
              <div v-if="tabIndex === 3">
                <h1>V2EX Next</h1>
                <div class="project-desc">
                  <div style="line-height: 2;">
                    <div>官网：<a :href="DefaultVal.homeUrl" target="_blank">{{ DefaultVal.homeUrl }}</a></div>
                    <div>GitHub地址：<a :href="DefaultVal.git" target="_blank">{{ DefaultVal.git }}</a></div>
                    <div>PC脚本地址：<a :href="DefaultVal.pcScript" target="_blank">{{ DefaultVal.pcScript }}</a></div>
                    <div>App地址：<a :href="DefaultVal.mobileScript" target="_blank">{{ DefaultVal.mobileScript }}</a>
                    </div>
                    <div>反馈: <a :href="DefaultVal.issue" target="_blank">{{ DefaultVal.issue }}</a></div>
                    <div>更新日志：<a :href="DefaultVal.pcLog" target="_blank">{{ DefaultVal.pcLog }}</a></div>
                  </div>
                </div>
                <div class="tips2">
                  <Icon icon="icon-park-outline:tips"/>
                  <span>代码完全开源，greasyfork上的脚本代码与github上的代码打包后是一样的，不放心也可自行打包~</span>
                </div>
              </div>
              <div v-if="tabIndex === 4">
                <div class="row ">
                  <label class="item-title">主题宽度</label>
                  <div class="wrapper">
                    <input type="text" v-model="config.postWidth">
                    <BaseButton @click="exportCollectList" :loading="exportLoading">导出</BaseButton>
                  </div>
                </div>
                <div class="border">
                  <div class="row ">
                    <label class="item-title">v2新帖挂件</label>
                    <div class="wrapper">
                      <BaseSwitch v-model="config.notice.loopCheckNotice"/>
                    </div>
                  </div>
                  <div class="desc">
                    脚本地址：https://greasyfork.org/zh-CN/scripts/448472
                    加载版本号： 0.11
                    加载地址：https://update.greasyfork.org/scripts/448472/1074290/v2%E6%96%B0%E5%B8%96%E6%8C%82%E4%BB%B6.user.js
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <NoticeModal v-model:show="showNotice" @confirm="config.viewType = 'card'"/>
    </div>
  </Transition>
</template>

<script>
import Tooltip from "../Tooltip.vue";
import {CommentDisplayType} from "@v2next/core/types.ts";
import BaseSwitch from "../BaseSwitch.vue";
import {DefaultVal, functions} from "@v2next/core/core.ts";
import BaseSelect from "@/components/BaseSelect.vue";
import {Icon} from "@iconify/vue";
import PopConfirm from "@/components/PopConfirm.vue";
import NoticeModal from "@/components/Modal/NoticeModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import eventBus from "@/utils/eventBus.js";
import {CMD} from "@/utils/type.js";

export default {
  name: "Setting",
  components: {
    BaseButton,
    NoticeModal,
    PopConfirm,
    Icon,
    BaseSelect,
    BaseSwitch,
    Tooltip
  },
  inject: ['isNight', 'isLogin'],
  props: {
    modelValue: {
      type: Object,
      default() {
        return {}
      }
    },
    show: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      tabIndex: 0,
      config: functions.clone(this.modelValue),
      showNotice: false,
      exportLoading: false,
      importLoading: false,
      importOk: false,
      showInput: true,
      total: 0,
      index: 0,
      endTime: '0',
    }
  },
  computed: {
    DefaultVal() {
      return DefaultVal
    },
    CommentDisplayType() {
      return CommentDisplayType
    },
    isNew() {
      return this.config.version < DefaultVal.currentVersion && window.isDeadline
    }
  },
  watch: {
    config: {
      handler(n) {
        n.topReplyLoveMinCount = Math.trunc(n.topReplyLoveMinCount)
        if (n.topReplyLoveMinCount < 0) {
          n.topReplyLoveMinCount = 1
        }
        this.$emit('update:modelValue', n)
      },
      deep: true
    },
    'config.loopCheckNotice'(n) {
      if (n) {
        this.config.loopCheckNoticeInterval = 5
        this.config.whenNewNoticeGlimmer = false
      } else {
        this.config.loopCheckNoticeInterval = 0
        this.config.whenNewNoticeGlimmer = false
        this.config.ddWebhook = ''
      }
    },
    show(n) {
      if (n) {
        if (this.config.version < DefaultVal.currentVersion) {
          $('.v2next-new').remove()
        }
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
    }
  },
  methods: {
    goPost() {
      fetch(DefaultVal.hotUrl + 'new.txt').then(async r => {
        let r2 = await r.text()
        if (r2) {
          functions.openNewTab(r2, true)
        } else {
          functions.openNewTab(DefaultVal.git, true)
        }
      }).catch(() => functions.openNewTab(DefaultVal.git, true))
    },
    close() {
      if (window.isDeadline) {
        this.config.version = DefaultVal.currentVersion
      }
      this.$emit('update:show', false)
    },
    exportCollectList() {
      if (!this.isLogin) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
      }
      try {
        let allList = []
        this.exportLoading = true

        function run(i) {
          return new Promise(resolve => {
            $.get(`/my/topics?p=${i}`).then(res => {
              let body = $(functions.genDomFromHtmlString(res))
              let total = body.find('.page_normal').last().text()
              if (typeof total === 'string') {
                total = Number(total)
              }
              let list = []
              body.find('.topic-link').each(function () {
                let a = functions.parseA(this)
                list.push({
                  title: a.title,
                  url: location.origin + '/t/' + a.id
                })
              })
              resolve({list, total})
            })
          })
        }

        run(1).then(async r => {
          allList = allList.concat(r.list)
          if (r.total > 1) {
            let getList = []
            for (let i = 2; i <= r.total; i++) {
              getList.push(run(i))
            }
            let b = await Promise.allSettled(getList)
            allList = allList.concat(b.map(v => v.value.list).flat())
          }
          console.log('all', allList)
          let pom = document.createElement('a');
          pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(allList, null, 2)));
          pom.setAttribute('download', 'V2EX-收藏.json');
          if (document.createEvent) {
            let event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
          } else {
            pom.click();
          }
          this.exportLoading = false
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '收藏列表导出成功！'})
        })
      } catch (e) {
        this.exportLoading = false
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '收藏列表导出失败！'})
      }
    },
    importCollectList(e) {
      if (!this.isLogin) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
      }
      let file = e.target.files[0]
      let fileName = file.name.split('.').pop().toLowerCase()
      console.log('e', file, fileName)
      if (fileName !== 'json') {
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '请导入 json 格式文件！'})
      }

      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = async () => {
        if (reader.result) {
          try {
            let list = JSON.parse(reader.result)
            console.log(list)
            this.importLoading = true
            this.total = list.length
            for (let i = 0; i < list.length; i++) {
              this.endTime = Math.floor((list.length - i) * 10 / 60)
              // for (let i = 0; i < 10; i++) {
              this.index = i
              let v = list[i]
              // let v = {url:'https://www.v2ex.com/t/489267'}
              // let v = {url: 'https://www.v2ex.com/t/395121'}
              let a = document.createElement('a')
              a.href = v.url
              let {id} = functions.parseA(a)
              a.remove()
              let apiRes = await fetch(v.url)
              let htmlText = await apiRes.text()
              let hasPermission = htmlText.search('你要查看的页面需要先登录')
              if (hasPermission > -1 || apiRes.status === 404 || apiRes.status === 404 || apiRes.redirected) {
                console.log('无权限', v.url, v.title)
                continue
              }
              if (htmlText.search('加入收藏') > -1) {
                console.log('未收藏========>>', v.url, v.title)
                let once = await window.fetchOnce()
                let url = `${location.origin}/favorite/topic/${id}?once=${once}`
                await fetch(url)
                await functions.sleep(10000)
              } else {
                console.log('已收藏', v.url, v.title)
              }
              await functions.sleep(1000)
            }
            this.importLoading = false
            this.importOk = true
          } catch (e) {
            eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '数据解析失败！'})
          }
        } else {
          eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '数据为空！'})
        }
      }

      this.showInput = false
      setTimeout(() => {
        this.showInput = true
      }, 200)
    }
  }
}
</script>

<style scoped lang="less">
.setting-modal {
  .modal-root {
    z-index: 9;
    //background: var(--color-main-bg);
    background: white;
    border-radius: 2rem;
    font-size: 1.6rem;
    overflow: hidden;
    //box-shadow: 0 0 6px 4px gainsboro;
    color: var(--color-font-pure);

    .modal-header {
      padding: 2rem;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-input-border);

      .title {
        font-size: 2rem;
        text-align: left;
        margin-bottom: 0;
      }

      svg {
        cursor: pointer;
        font-size: 2.6rem;
      }
    }

    .body {
      width: 65rem;
      height: 45rem;
      display: flex;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding:0 1.4rem;

        .tabs {
          padding: 1rem 0rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;

          .tab {
            cursor: pointer;
            padding: 0.8rem 1.5rem;
            width: 10rem;
            border-radius: .8rem;
            text-align: start;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.6rem;

            svg {
              font-size: 1.8rem;
            }

            &.active {
              background: var(--color-active);
              background: #E6F4FF;
              color: var(--color-font-pure);
            }
          }
        }

        .bottom {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          .tip {
            width: 12rem;
            font-size: 1.2rem;
            color: var(--color-font);
          }

          .icons {
            display: flex;
            gap: 1rem;
            font-size: 2.4rem;
          }
        }
      }

      .modal-content {
        background: var(--color-second-bg);
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding-right: 1rem;
        padding-left: 0;
        @d: 1.6rem;
        border-radius: 1rem;
        display: flex;

        .scroll {
          flex: 1;
          padding-right: 1rem;
          overflow: auto;

          .row {
            min-height: 5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .wrapper {
              height: 3rem;
              flex: 1;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              gap: var(--space);

              span {
                text-align: right;
                //width: 30rem;
                font-size: 1.4rem;
                color: gray;
              }

              .set-key {
                align-items: center;

                input {
                  width: 15rem;
                  box-sizing: border-box;
                  margin-right: 1rem;
                  height: 2.8rem;
                  outline: none;
                  font-size: 1.6rem;
                  border: 1px solid gray;
                  border-radius: .3rem;
                  padding: 0 .5rem;
                  background: var(--color-second-bg);
                  color: var(--color-font-1);
                }
              }
            }

            .main-title {
              font-size: 1.8rem;
              font-weight: bold;
              color: var(--color-font-8);
            }
          }

          .border {
            border-bottom: 1px solid var(--color-input-border);
          }

          .desc {
            margin-bottom: 1rem;
            font-size: 1.4rem;
            text-align: left;
            color: var(--color-font);
          }

          .project-desc {
            text-align: start;
            font-size: 1.6rem;
            padding-bottom: 1rem;
          }

          .line {
            border-bottom: 1px solid #c4c3c3;
          }
        }
      }
    }
  }
}

.sub-content {
  padding: 0 2rem;
  padding-bottom: 1rem;
  border-radius: 1rem;
  background: #f3f3f3;
  margin-bottom: 1rem;
}

.log {
  position: relative;
  text-align: left;
  margin-bottom: 20px;
  padding-left: 20px;
  font-size: 16px;
  color: cornflowerblue;
  text-decoration: underline;
}

.tips2 {
  text-align: left;
  color: var(--color-font);
  svg {
    transform: translateY(0.3rem);
    margin-right: 0.6rem;
  }

}

</style>