<template>
  <Transition>
    <div v-if="show" class="setting-modal modal">
      <div class="mask" @click="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            脚本设置
            <div  style="font-size: 20px;text-decoration: underline" ><a :href="DefaultVal.mobileScript" target="_blank">(手机App已发布，支持楼中楼！)</a></div>
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
                <span>列表设置</span>
              </div>
              <div class="tab" :class="tabIndex === 1 && 'active'" @click="tabIndex = 1">
                <span>主题设置</span>
              </div>
              <div class="tab" :class="tabIndex === 2 && 'active'" @click="tabIndex = 2">
                <span>其他设置</span>
              </div>
              <div class="tab" :class="tabIndex === 3 && 'active'" @click="tabIndex = 3">
                <span>关于脚本</span>
              </div>
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
          <div class="modal-content">
            <div class="scroll">
              <div v-if="tabIndex === 0">
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

                <div class="row">
                  <label class="item-title">主题弹框显示</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.clickPostItemOpenDetail"/>
                  </div>
                </div>
                <div class="desc">
                  开启此选项后，主题会<span class="danger">始终</span>以弹框的方式显示。优先级大于“新标签页打开链接”
                </div>
                <div class="row">
                  <label class="item-title">新标签页打开链接</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.newTabOpen"/>
                  </div>
                </div>
                <div class="desc">
                  网页上所有链接通过新标签页打开
                </div>
                <div class="row">
                  <label class="item-title">打开新标签页时立即切换过去</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.newTabOpenActive"/>
                  </div>
                </div>
              </div>
              <div v-if="tabIndex === 1">
                <div class="row">
                  <label class="item-title">回复类型</label>
                  <div class="wrapper">
                    <BaseSelect v-model:display-type="config.commentDisplayType"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">详情页中显示“回复类型”</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showToolbar"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">替换Imgur源</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.replaceImgur"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">单独打开主题时默认显示楼中楼</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.autoOpenDetail"/>
                  </div>
                </div>
                <div class="desc">
                  单独打开这种地址 https://v2ex.com/t/xxxx 时，是否默认显示楼中楼
                </div>
                <div class="row">
                  <label class="item-title">点击左右两侧透明处关闭主题详情弹框</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.closePostDetailBySpace"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">正文超长自动折叠</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.contentAutoCollapse"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">主题宽度</label>
                  <div class="wrapper">
                    <input type="text" v-model="config.postWidth">
                  </div>
                </div>
                <div class="desc">
                  未设定此值时，则默认宽度为77rem。接受合法的width值：
                  <a href="https://vue3js.cn/interview/css/em_px_rem_vh_vw.html#%E4%BA%8C%E3%80%81%E5%8D%95%E4%BD%8D"
                     target="_blank">rem、px、vw、vh(点此查看)</a>。
                  vw代表屏幕百分比，如想要屏幕的66%，请填写66vw
                </div>
                <div class="desc">
                  提示：此项设置以后，单独打开详情页时会出现主题突然变宽（窄）的问题，暂时无解
                </div>
                <div class="desc danger">
                  提示：此项需要刷新页面才能生效
                </div>

                <div class="row">
                  <label class="main-title">高赞回复</label>
                </div>
                <div class="row">
                  <label class="item-title">显示高赞回复</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showTopReply"/>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">最多显示{{ config.topReplyCount }}个高赞回复</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyCount">
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">最少需要{{ config.topReplyLoveMinCount }}个赞才能被判定为高赞</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyLoveMinCount">
                  </div>
                </div>
              </div>
              <div v-if="tabIndex === 2">
                <div class="row">
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


                <div class="row">
                  <label class="item-title">自动签到</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.autoSignin"/>
                  </div>
                </div>
                <div class="row">
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
                <div class="row">
                  <label class="item-title">收藏时提醒添加到书签</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.collectBrowserNotice"/>
                  </div>
                </div>
                <div class="desc">
                  V站帐号一旦被封禁，则无法登录，无法查看账号收藏了
                </div>
                <div class="row">
                  <label class="main-title">消息通知</label>
                </div>
                <div class="row">
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
                    <div>App地址：<a :href="DefaultVal.mobileScript" target="_blank">{{ DefaultVal.mobileScript }}</a></div>
                    <div>反馈: <a :href="DefaultVal.issue" target="_blank">{{ DefaultVal.issue }}</a></div>
                    <div>更新日志：<a :href="DefaultVal.pcLog" target="_blank">{{ DefaultVal.pcLog }}</a></div>
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

export default {
  name: "Setting",
  components: {
    NoticeModal,
    PopConfirm,
    Icon,
    BaseSelect,
    BaseSwitch,
    Tooltip
  },
  inject: ['isNight'],
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
      showNotice: false
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
    }
  }
}
</script>

<style scoped lang="less">
.setting-modal {
  .modal-root {
    z-index: 9;
    background: var(--color-main-bg);
    border-radius: 1rem;
    font-size: 1.4rem;
    overflow: hidden;
    //box-shadow: 0 0 6px 4px gainsboro;
    color: var(--color-font-pure);

    .modal-header {
      padding: 2.4rem;
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 2.6rem;
        font-weight: bold;
        text-align: left;
        margin-bottom: 0;
      }

      svg {
        cursor: pointer;
        font-size: 2.6rem;
      }
    }

    .body {
      width: 45vw;
      height: 70vh;
      display: flex;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;

        .tabs {
          padding: 1rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;

          .tab {
            cursor: pointer;
            padding: 1rem 1.5rem;
            border-radius: .8rem;
            display: flex;
            align-items: center;
            gap: 1rem;

            &.active {
              background: var(--color-item-bg);
            }
          }
        }

        .icons {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          font-size: 2.4rem;
        }
      }

      .modal-content {
        background: var(--color-second-bg);
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem 2rem;
        padding-right: 1rem;
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
              font-size: 2.2rem;
              font-weight: bold;
              color: var(--color-font-8);
            }

            .item-title {
              font-size: 1.8rem;
            }
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
            padding-bottom: 10rem;
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

</style>