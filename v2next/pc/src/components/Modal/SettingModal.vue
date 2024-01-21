<template>
  <Transition>
    <div v-if="show" class="setting-modal modal">
      <div class="mask" @click="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            脚本设置
          </div>
          <i class="fa fa-times" @click="close"/>
        </div>
        <div class="body">
          <div class="left">
            <div class="tabs">
              <div class="tab" :class="tabIndex === 0 && 'active'" @click="tabIndex = 0">
                <span>列表设置</span>
              </div>
              <div class="tab" :class="tabIndex === 1 && 'active'" @click="tabIndex = 1">
                <span>帖子设置</span>
              </div>
              <div class="tab" :class="tabIndex === 2 && 'active'" @click="tabIndex = 2">
                <span>其他设置</span>
              </div>
              <div class="tab" :class="tabIndex === 3 && 'active'" @click="tabIndex = 3">
                <span>关于脚本</span>
              </div>
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
                           @click="config.viewType = 'card'"
                           :class="config.viewType === 'card'?'active':''">卡片
                      </div>
                    </div>
                  </div>
                </div>
                <div class="desc danger">
                  提示：此项需要刷新页面才能生效
                </div>
                <div class="row">
                  <label class="item-title">列表hover时显示预览按钮</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showPreviewBtn"/>
                  </div>
                </div>
                <div class="desc danger">
                  提示：此项需要刷新页面才能生效
                </div>

                <div class="row">
                  <label class="item-title">帖子弹框显示</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.clickPostItemOpenDetail"/>
                  </div>
                </div>
                <div class="desc">
                  开启此选项后，帖子始终会以弹框的方式显示。优先级大于“新标签页打开链接”
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
              </div>
              <div v-if="tabIndex === 1">
                <div class="row">
                  <label class="item-title">显示回复展示方式</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.showToolbar"/>
                  </div>
                </div>

                <div class="row">
                  <label class="item-title">回复展示方式</label>
                  <div class="wrapper">
                    <div class="radio-group2">
                      <Tooltip title="不隐藏@用户">
                        <div class="radio"
                             @click="config.commentDisplayType = CommentDisplayType.FloorInFloor"
                             :class="config.commentDisplayType === CommentDisplayType.FloorInFloor?'active':''">楼中楼(@)
                        </div>
                      </Tooltip>
                      <Tooltip title="隐藏第一个@用户，双击内容可显示原文">
                        <div class="radio"
                             @click="config.commentDisplayType = CommentDisplayType.FloorInFloorNoCallUser"
                             :class="config.commentDisplayType === CommentDisplayType.FloorInFloorNoCallUser?'active':''">
                          楼中楼
                        </div>
                      </Tooltip>
                      <Tooltip title="重复显示楼中楼的回复">
                        <div class="radio"
                             @click="config.commentDisplayType = CommentDisplayType.FloorInFloorNested"
                             :class="config.commentDisplayType === CommentDisplayType.FloorInFloorNested?'active':''">
                          冗余楼中楼
                        </div>
                      </Tooltip>
                      <div class="radio"
                           @click="config.commentDisplayType = CommentDisplayType.Like"
                           :class="config.commentDisplayType === CommentDisplayType.Like?'active':''">感谢
                      </div>
                      <div class="radio"
                           @click="config.commentDisplayType = CommentDisplayType.OnlyOp"
                           :class="config.commentDisplayType === CommentDisplayType.OnlyOp?'active':''">只看楼主
                      </div>
                      <div class="radio"
                           @click="config.commentDisplayType = CommentDisplayType.V2exOrigin"
                           :class="config.commentDisplayType === CommentDisplayType.V2exOrigin?'active':''">V2原版
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">单独打开帖子时默认显示楼中楼</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.autoOpenDetail"/>
                  </div>
                </div>
                <div class="desc">
                  单独打开这种地址 https://v2ex.com/t/xxxx 时，是否默认显示楼中楼
                </div>
                <div class="row">
                  <label class="item-title">点击左右两侧透明处关闭帖子详情弹框</label>
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
                  <label class="item-title">帖子宽度</label>
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
                  提示：此项设置以后，单独打开详情页时会出现帖子突然变宽（窄）的问题，暂时无解
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
                  <label class="item-title">最多显示多少个高赞回复</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyCount">
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">最少需要多少赞才能被判定为高赞</label>
                  <div class="wrapper">
                    <input type="number" min="1" v-model="config.topReplyLoveMinCount">
                  </div>
                </div>
                <div class="row">
                  <label class="main-title">记忆阅读</label>
                </div>
                <div class="row">
                  <label class="item-title">记录上次阅读楼层（误差1层左右）：</label>
                  <div class="wrapper">
                    <BaseSwitch :model-value="config.rememberLastReadFloor"
                                @update:modelValue="config.rememberLastReadFloor = !config.rememberLastReadFloor;
                                config.autoJumpLastReadFloor = false"
                    />
                  </div>
                </div>
                <div class="row">
                  <label class="item-title">打开帖子自动跳转到上次阅读楼层</label>
                  <div class="wrapper">
                    <BaseSwitch v-model="config.autoJumpLastReadFloor"/>
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
                  未设定此值时，则背景颜色默认为 #e2e2e2。接受一个合法的css color值：例如<a
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
              </div>
              <div v-if="tabIndex === 3">
                <h1>V2EX Next</h1>
                <div class="project-desc">
                  <div>
                    本项目完全开源，项目地址：<a :href="windowConst.git" target="_blank">{{ windowConst.git }}</a>，目前由我一个人维护，如果您觉得好用，<b>请帮我点一个Star，您的Star是对我最大的鼓励</b>
                  </div>
                  <div>
                    <h2>为什么选择这个，而不是其他？</h2>
                    <h3>其他脚本：</h3>
                    大多只是对V2EX修修补补、美化UI，在使用体验上依旧是10年前的网站，太多脚本年久失修无人维护。楼中楼只能解析当前页，如果有多页回复，楼中楼就会前言不搭后语莫名其妙的
                    <h3>本脚本：</h3>
                    <b>最好用的楼中楼、查看回复上下文、高赞回复、简洁模式等特色功能。</b>
                    对V2EX进行了整体改造，如预览、点赞、回复、屏蔽等等都走异步请求，使用体验上已和现代网站无异，同时也集成了市面上常见的增强（辅助）功能，

                    <h2>特色功能</h2>
                    <ul>
                      <li>楼中楼
                        <ol>
                          <li>可按高赞排序显示</li>
                          <li>可只看楼主</li>
                        </ol>
                      </li>
                      <li>简洁模式</li>
                      <li>查看回复上下文</li>
                      <li>高赞回复</li>
                    </ul>

                    <h2>增强（辅助）功能</h2>
                    <ul>
                      <li>预览帖子正文</li>
                      <li>弹框显示帖子正文和回复</li>
                      <li>帖子显示OP注册时间</li>
                      <li>链接自动转图片</li>
                      <li>快捷发送贴吧表情、emoji、图片</li>
                      <li>新标签页打开链接，默认打开，可单独关闭</li>
                      <li>对用户打标签</li>
                      <li>划词 base64 解码，支持解码中文</li>
                      <li>一键@所有人，@管理员：回复时，可一键@所有人和@管理员</li>
                      <li>自适应屏幕宽度，支持黑暗模式</li>
                      <li>记忆上次阅读位置</li>
                      <li>按钮异步请求：操作按钮（感谢、收藏、回复、隐藏）异步请求，不会刷新页面</li>
                      <li>收藏时提醒添加到浏览器书签，防止账号被封无法查看收藏</li>
                      <li>自动签到</li>
                      <li>正文超长自动折叠</li>
                    </ul>


                    <h2>如何帮助我</h2>
                    这个项目花了我很多精力，如果对您有用：
                    点个 <a :href="windowConst.git">Star ⭐️</a> 或分享给他人，让更多的人知道我的存在。
                    <div>提供反馈，帮助我改进，以持续完善脚本。在 <a :href="windowConst.issue">这里</a> 提出。</div>
                    <div>
                      更新日志：<a href="https://greasyfork.org/zh-CN/scripts/458024/versions" target="_blank">https://greasyfork.org/zh-CN/scripts/458024/versions</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Tooltip from "../Tooltip.vue";
import {CommentDisplayType} from "@v2next/core/types.ts";
import BaseSwitch from "../BaseSwitch.vue";

export default {
  name: "Setting",
  components: {
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
      config: window.clone(this.modelValue),
    }
  },
  computed: {
    windowConst() {
      return window.const
    },
    CommentDisplayType() {
      return CommentDisplayType
    },
    isNew() {
      return this.config.version < window.currentVersion
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
    }
  },
  methods: {
    close() {
      this.config.version = window.currentVersion
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
    border-radius: 1.6rem;
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

      i {
        cursor: pointer;
        font-size: 2.2rem;
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
      }

      .modal-content {
        background: var(--color-second-bg);
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem 2rem;
        padding-right: 1rem;
        @d: 1.6rem;
        border-radius: 1.6rem;
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

</style>