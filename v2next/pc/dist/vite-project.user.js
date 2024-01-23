// ==UserScript==
// @name         V2Next
// @namespace    http://tampermonkey.net/
// @version      7.9.5
// @author       zyronon
// @description  楼中楼、简洁模式、高赞回复排序、查看回复上下文、发送图片和表情、UI美化、base64 解码等功能
// @license      GPL License
// @icon         https://v2next.netlify.app/favicon.ico
// @homepage     https://github.com/zyronon/web-scripts
// @homepageURL  https://github.com/zyronon/web-scripts
// @supportURL   https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @downloadURL  https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @updateURL    https://update.greasyfork.org/scripts/458024/V2Next.user.js
// @match        https://v2ex.com/
// @match        https://v2ex.com/?tab=*
// @match        https://v2ex.com/t/*
// @match        https://v2ex.com/recent*
// @match        https://v2ex.com/go/*
// @match        https://v2ex.com/member/*
// @match        https://*.v2ex.com/
// @match        https://*.v2ex.com/?tab=*
// @match        https://*.v2ex.com/t/*
// @match        https://*.v2ex.com/recent*
// @match        https://*.v2ex.com/go/*
// @match        https://*.v2ex.com/member/*
// @require      https://cdn.jsdelivr.net/npm/vue@3.4.14/dist/vue.global.prod.js
// @grant        GM_addStyle
// @grant        GM_notification
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// ==/UserScript==


(function (vue) {
  'use strict';

  var PageType = /* @__PURE__ */ ((PageType2) => {
    PageType2["Home"] = "Home";
    PageType2["Node"] = "Node";
    PageType2["Post"] = "Post";
    PageType2["Member"] = "Member";
    PageType2["Changes"] = "Changes";
    return PageType2;
  })(PageType || {});
  var CommentDisplayType = /* @__PURE__ */ ((CommentDisplayType2) => {
    CommentDisplayType2[CommentDisplayType2["FloorInFloor"] = 0] = "FloorInFloor";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNoCallUser"] = 4] = "FloorInFloorNoCallUser";
    CommentDisplayType2[CommentDisplayType2["FloorInFloorNested"] = 5] = "FloorInFloorNested";
    CommentDisplayType2[CommentDisplayType2["Like"] = 1] = "Like";
    CommentDisplayType2[CommentDisplayType2["V2exOrigin"] = 2] = "V2exOrigin";
    CommentDisplayType2[CommentDisplayType2["OnlyOp"] = 3] = "OnlyOp";
    CommentDisplayType2[CommentDisplayType2["New"] = 6] = "New";
    return CommentDisplayType2;
  })(CommentDisplayType || {});
  const MAX_REPLY_LIMIT = 400;
  const _sfc_main$j = {
    name: "Tooltip",
    props: {
      title: {
        type: String,
        default() {
          return "";
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      showPop(e2) {
        if (this.disabled)
          return;
        if (!this.title)
          return;
        e2.stopPropagation();
        let rect = e2.target.getBoundingClientRect();
        this.show = true;
        vue.nextTick(() => {
          var _a, _b;
          let tip = (_b = (_a = this.$refs) == null ? void 0 : _a.tip) == null ? void 0 : _b.getBoundingClientRect();
          if (!tip)
            return;
          if (rect.top < 50) {
            this.$refs.tip.style.top = rect.top + rect.height + 10 + "px";
          } else {
            this.$refs.tip.style.top = rect.top - tip.height - 10 + "px";
          }
          let tipWidth = tip.width;
          let rectWidth = rect.width;
          this.$refs.tip.style.left = rect.left - (tipWidth - rectWidth) / 2 + "px";
        });
      }
    },
    render() {
      let Vnode = this.$slots.default()[0];
      return vue.createVNode(vue.Fragment, null, [this.show && this.title && vue.createVNode(vue.Teleport, {
        "to": "body"
      }, {
        default: () => [vue.createVNode(vue.Transition, {
          "name": "fade"
        }, {
          default: () => [vue.createVNode("div", {
            "ref": "tip",
            "className": "tip"
          }, [this.title])]
        })]
      }), vue.createVNode(Vnode, {
        "onClick": () => this.show = false,
        "onmouseenter": (e2) => this.showPop(e2),
        "onmouseleave": () => this.show = false
      }, null)]);
    }
  };
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-ee672411"]]);
  const _sfc_main$i = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseSwitch",
    props: {
      modelValue: { type: Boolean }
    },
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["switch", { active: _ctx.modelValue }]),
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", !_ctx.modelValue))
        }, null, 2);
      };
    }
  });
  const BaseSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-e7c0fbef"]]);
  const _sfc_main$h = {
    name: "Setting",
    components: {
      BaseSwitch,
      Tooltip
    },
    inject: ["isNight"],
    props: {
      modelValue: {
        type: Object,
        default() {
          return {};
        }
      },
      show: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        tabIndex: 0,
        config: window.clone(this.modelValue)
      };
    },
    computed: {
      windowConst() {
        return window.const;
      },
      CommentDisplayType() {
        return CommentDisplayType;
      },
      isNew() {
        return this.config.version < window.currentVersion;
      }
    },
    watch: {
      config: {
        handler(n2) {
          n2.topReplyLoveMinCount = Math.trunc(n2.topReplyLoveMinCount);
          if (n2.topReplyLoveMinCount < 0) {
            n2.topReplyLoveMinCount = 1;
          }
          this.$emit("update:modelValue", n2);
        },
        deep: true
      }
    },
    methods: {
      close() {
        this.config.version = window.currentVersion;
        this.$emit("update:show", false);
      }
    }
  };
  const _withScopeId$b = (n2) => (vue.pushScopeId("data-v-0c0fac4f"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$g = {
    key: 0,
    class: "setting-modal modal"
  };
  const _hoisted_2$f = { class: "modal-root" };
  const _hoisted_3$b = { class: "modal-header" };
  const _hoisted_4$b = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 脚本设置 ", -1));
  const _hoisted_5$8 = { class: "body" };
  const _hoisted_6$8 = { class: "left" };
  const _hoisted_7$7 = { class: "tabs" };
  const _hoisted_8$7 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("span", null, "列表设置", -1));
  const _hoisted_9$7 = [
    _hoisted_8$7
  ];
  const _hoisted_10$6 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("span", null, "帖子设置", -1));
  const _hoisted_11$6 = [
    _hoisted_10$6
  ];
  const _hoisted_12$6 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("span", null, "其他设置", -1));
  const _hoisted_13$6 = [
    _hoisted_12$6
  ];
  const _hoisted_14$6 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("span", null, "关于脚本", -1));
  const _hoisted_15$6 = [
    _hoisted_14$6
  ];
  const _hoisted_16$6 = { class: "modal-content" };
  const _hoisted_17$5 = { class: "scroll" };
  const _hoisted_18$5 = { key: 0 };
  const _hoisted_19$4 = { class: "row" };
  const _hoisted_20$4 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "列表展示方式", -1));
  const _hoisted_21$4 = { class: "wrapper" };
  const _hoisted_22$3 = { class: "radio-group2" };
  const _hoisted_23$3 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_24$2 = { class: "row" };
  const _hoisted_25$3 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "列表hover时显示预览按钮", -1));
  const _hoisted_26$2 = { class: "wrapper" };
  const _hoisted_27$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_28$1 = { class: "row" };
  const _hoisted_29$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "帖子弹框显示", -1));
  const _hoisted_30$1 = { class: "wrapper" };
  const _hoisted_31$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 开启此选项后，帖子始终会以弹框的方式显示。优先级大于“新标签页打开链接” ", -1));
  const _hoisted_32$1 = { class: "row" };
  const _hoisted_33$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "新标签页打开链接", -1));
  const _hoisted_34$1 = { class: "wrapper" };
  const _hoisted_35$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 网页上所有链接通过新标签页打开 ", -1));
  const _hoisted_36$1 = { key: 1 };
  const _hoisted_37$1 = { class: "row" };
  const _hoisted_38$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "显示回复展示方式", -1));
  const _hoisted_39$1 = { class: "wrapper" };
  const _hoisted_40$1 = { class: "row" };
  const _hoisted_41$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "回复展示方式", -1));
  const _hoisted_42$1 = { class: "wrapper" };
  const _hoisted_43$1 = { class: "radio-group2" };
  const _hoisted_44$1 = { class: "row" };
  const _hoisted_45$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "单独打开帖子时默认显示楼中楼", -1));
  const _hoisted_46$1 = { class: "wrapper" };
  const _hoisted_47$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 单独打开这种地址 https://v2ex.com/t/xxxx 时，是否默认显示楼中楼 ", -1));
  const _hoisted_48$1 = { class: "row" };
  const _hoisted_49$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "点击左右两侧透明处关闭帖子详情弹框", -1));
  const _hoisted_50$1 = { class: "wrapper" };
  const _hoisted_51$1 = { class: "row" };
  const _hoisted_52$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "正文超长自动折叠", -1));
  const _hoisted_53$1 = { class: "wrapper" };
  const _hoisted_54$1 = { class: "row" };
  const _hoisted_55$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "帖子宽度", -1));
  const _hoisted_56$1 = { class: "wrapper" };
  const _hoisted_57$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, [
    /* @__PURE__ */ vue.createTextVNode(" 未设定此值时，则默认宽度为77rem。接受合法的width值： "),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://vue3js.cn/interview/css/em_px_rem_vh_vw.html#%E4%BA%8C%E3%80%81%E5%8D%95%E4%BD%8D",
      target: "_blank"
    }, "rem、px、vw、vh(点此查看)"),
    /* @__PURE__ */ vue.createTextVNode("。 vw代表屏幕百分比，如想要屏幕的66%，请填写66vw ")
  ], -1));
  const _hoisted_58$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " 提示：此项设置以后，单独打开详情页时会出现帖子突然变宽（窄）的问题，暂时无解 ", -1));
  const _hoisted_59$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_60$1 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "row" }, [
    /* @__PURE__ */ vue.createElementVNode("label", { class: "main-title" }, "高赞回复")
  ], -1));
  const _hoisted_61$1 = { class: "row" };
  const _hoisted_62 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "显示高赞回复", -1));
  const _hoisted_63 = { class: "wrapper" };
  const _hoisted_64 = { class: "row" };
  const _hoisted_65 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "最多显示多少个高赞回复", -1));
  const _hoisted_66 = { class: "wrapper" };
  const _hoisted_67 = { class: "row" };
  const _hoisted_68 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "最少需要多少赞才能被判定为高赞", -1));
  const _hoisted_69 = { class: "wrapper" };
  const _hoisted_70 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "row" }, [
    /* @__PURE__ */ vue.createElementVNode("label", { class: "main-title" }, "记忆阅读")
  ], -1));
  const _hoisted_71 = { class: "row" };
  const _hoisted_72 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "记录上次阅读楼层（误差1层左右）：", -1));
  const _hoisted_73 = { class: "wrapper" };
  const _hoisted_74 = { class: "row" };
  const _hoisted_75 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "打开帖子自动跳转到上次阅读楼层", -1));
  const _hoisted_76 = { class: "wrapper" };
  const _hoisted_77 = { key: 2 };
  const _hoisted_78 = { class: "row" };
  const _hoisted_79 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "用户打标签(跨平台，数据保存在自己的记事本)：", -1));
  const _hoisted_80 = { class: "wrapper" };
  const _hoisted_81 = { class: "row" };
  const _hoisted_82 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "划词显示Base64解码框", -1));
  const _hoisted_83 = { class: "wrapper" };
  const _hoisted_84 = { class: "row" };
  const _hoisted_85 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "自动签到", -1));
  const _hoisted_86 = { class: "wrapper" };
  const _hoisted_87 = { class: "row" };
  const _hoisted_88 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "自定义背景", -1));
  const _hoisted_89 = { class: "wrapper" };
  const _hoisted_90 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, [
    /* @__PURE__ */ vue.createTextVNode(" 未设定此值时，则背景颜色默认为 #e2e2e2。接受一个合法的css color值：例如"),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value",
      target: "_blank"
    }, "red、#ffffff、rgb(222,222,22)(点此查看)"),
    /* @__PURE__ */ vue.createTextVNode("等等。 ")
  ], -1));
  const _hoisted_91 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc danger" }, " 提示：此项需要刷新页面才能生效 ", -1));
  const _hoisted_92 = { class: "row" };
  const _hoisted_93 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("label", { class: "item-title" }, "收藏时提醒添加到书签", -1));
  const _hoisted_94 = { class: "wrapper" };
  const _hoisted_95 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "desc" }, " V站帐号一旦被封禁，则无法登录，无法查看账号收藏了 ", -1));
  const _hoisted_96 = { key: 3 };
  const _hoisted_97 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h1", null, "V2EX Next", -1));
  const _hoisted_98 = { class: "project-desc" };
  const _hoisted_99 = ["href"];
  const _hoisted_100 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("b", null, "请帮我点一个Star，您的Star是对我最大的鼓励", -1));
  const _hoisted_101 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "为什么选择这个，而不是其他？", -1));
  const _hoisted_102 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h3", null, "其他脚本：", -1));
  const _hoisted_103 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h3", null, "本脚本：", -1));
  const _hoisted_104 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("b", null, "最好用的楼中楼、查看回复上下文、高赞回复、简洁模式等特色功能。", -1));
  const _hoisted_105 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "特色功能", -1));
  const _hoisted_106 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("ul", null, [
    /* @__PURE__ */ vue.createElementVNode("li", null, [
      /* @__PURE__ */ vue.createTextVNode("楼中楼 "),
      /* @__PURE__ */ vue.createElementVNode("ol", null, [
        /* @__PURE__ */ vue.createElementVNode("li", null, "可按高赞排序显示"),
        /* @__PURE__ */ vue.createElementVNode("li", null, "可只看楼主")
      ])
    ]),
    /* @__PURE__ */ vue.createElementVNode("li", null, "简洁模式"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "查看回复上下文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "高赞回复")
  ], -1));
  const _hoisted_107 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "增强（辅助）功能", -1));
  const _hoisted_108 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("ul", null, [
    /* @__PURE__ */ vue.createElementVNode("li", null, "预览帖子正文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "弹框显示帖子正文和回复"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "帖子显示OP注册时间"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "链接自动转图片"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "快捷发送贴吧表情、emoji、图片"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "新标签页打开链接，默认打开，可单独关闭"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "对用户打标签"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "划词 base64 解码，支持解码中文"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "一键@所有人，@管理员：回复时，可一键@所有人和@管理员"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "自适应屏幕宽度，支持黑暗模式"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "记忆上次阅读位置"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "按钮异步请求：操作按钮（感谢、收藏、回复、隐藏）异步请求，不会刷新页面"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "收藏时提醒添加到浏览器书签，防止账号被封无法查看收藏"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "自动签到"),
    /* @__PURE__ */ vue.createElementVNode("li", null, "正文超长自动折叠")
  ], -1));
  const _hoisted_109 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("h2", null, "如何帮助我", -1));
  const _hoisted_110 = ["href"];
  const _hoisted_111 = ["href"];
  const _hoisted_112 = /* @__PURE__ */ _withScopeId$b(() => /* @__PURE__ */ vue.createElementVNode("div", null, [
    /* @__PURE__ */ vue.createTextVNode(" 更新日志："),
    /* @__PURE__ */ vue.createElementVNode("a", {
      href: "https://greasyfork.org/zh-CN/scripts/458024/versions",
      target: "_blank"
    }, "https://greasyfork.org/zh-CN/scripts/458024/versions")
  ], -1));
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseSwitch = vue.resolveComponent("BaseSwitch");
    const _component_Tooltip = vue.resolveComponent("Tooltip");
    return vue.openBlock(), vue.createBlock(vue.Transition, null, {
      default: vue.withCtx(() => [
        $props.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$g, [
          vue.createElementVNode("div", {
            class: "mask",
            onClick: _cache[0] || (_cache[0] = (...args) => $options.close && $options.close(...args))
          }),
          vue.createElementVNode("div", _hoisted_2$f, [
            vue.createElementVNode("div", _hoisted_3$b, [
              _hoisted_4$b,
              vue.createElementVNode("i", {
                class: "fa fa-times",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.close && $options.close(...args))
              })
            ]),
            vue.createElementVNode("div", _hoisted_5$8, [
              vue.createElementVNode("div", _hoisted_6$8, [
                vue.createElementVNode("div", _hoisted_7$7, [
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 0 && "active"]),
                    onClick: _cache[2] || (_cache[2] = ($event) => $data.tabIndex = 0)
                  }, _hoisted_9$7, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 1 && "active"]),
                    onClick: _cache[3] || (_cache[3] = ($event) => $data.tabIndex = 1)
                  }, _hoisted_11$6, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 2 && "active"]),
                    onClick: _cache[4] || (_cache[4] = ($event) => $data.tabIndex = 2)
                  }, _hoisted_13$6, 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["tab", $data.tabIndex === 3 && "active"]),
                    onClick: _cache[5] || (_cache[5] = ($event) => $data.tabIndex = 3)
                  }, _hoisted_15$6, 2)
                ])
              ]),
              vue.createElementVNode("div", _hoisted_16$6, [
                vue.createElementVNode("div", _hoisted_17$5, [
                  $data.tabIndex === 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$5, [
                    vue.createElementVNode("div", _hoisted_19$4, [
                      _hoisted_20$4,
                      vue.createElementVNode("div", _hoisted_21$4, [
                        vue.createElementVNode("div", _hoisted_22$3, [
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "simple" ? "active" : ""]),
                            onClick: _cache[6] || (_cache[6] = ($event) => $data.config.viewType = "simple")
                          }, "简洁 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "table" ? "active" : ""]),
                            onClick: _cache[7] || (_cache[7] = ($event) => $data.config.viewType = "table")
                          }, "表格 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.viewType === "card" ? "active" : ""]),
                            onClick: _cache[8] || (_cache[8] = ($event) => $data.config.viewType = "card")
                          }, "卡片 ", 2)
                        ])
                      ])
                    ]),
                    _hoisted_23$3,
                    vue.createElementVNode("div", _hoisted_24$2, [
                      _hoisted_25$3,
                      vue.createElementVNode("div", _hoisted_26$2, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showPreviewBtn,
                          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.config.showPreviewBtn = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_27$1,
                    vue.createElementVNode("div", _hoisted_28$1, [
                      _hoisted_29$1,
                      vue.createElementVNode("div", _hoisted_30$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.clickPostItemOpenDetail,
                          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.config.clickPostItemOpenDetail = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_31$1,
                    vue.createElementVNode("div", _hoisted_32$1, [
                      _hoisted_33$1,
                      vue.createElementVNode("div", _hoisted_34$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.newTabOpen,
                          "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.config.newTabOpen = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_35$1
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 1 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_36$1, [
                    vue.createElementVNode("div", _hoisted_37$1, [
                      _hoisted_38$1,
                      vue.createElementVNode("div", _hoisted_39$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showToolbar,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.config.showToolbar = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_40$1, [
                      _hoisted_41$1,
                      vue.createElementVNode("div", _hoisted_42$1, [
                        vue.createElementVNode("div", _hoisted_43$1, [
                          vue.createVNode(_component_Tooltip, { title: "不隐藏@用户" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloor ? "active" : ""]),
                                onClick: _cache[13] || (_cache[13] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloor)
                              }, "楼中楼(@) ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_Tooltip, { title: "隐藏第一个@用户，双击内容可显示原文" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNoCallUser ? "active" : ""]),
                                onClick: _cache[14] || (_cache[14] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloorNoCallUser)
                              }, " 楼中楼 ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createVNode(_component_Tooltip, { title: "重复显示楼中楼的回复" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("div", {
                                class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNested ? "active" : ""]),
                                onClick: _cache[15] || (_cache[15] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.FloorInFloorNested)
                              }, " 冗余楼中楼 ", 2)
                            ]),
                            _: 1
                          }),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.Like ? "active" : ""]),
                            onClick: _cache[16] || (_cache[16] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.Like)
                          }, "感谢 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.OnlyOp ? "active" : ""]),
                            onClick: _cache[17] || (_cache[17] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.OnlyOp)
                          }, "只看楼主 ", 2),
                          vue.createElementVNode("div", {
                            class: vue.normalizeClass(["radio", $data.config.commentDisplayType === $options.CommentDisplayType.V2exOrigin ? "active" : ""]),
                            onClick: _cache[18] || (_cache[18] = ($event) => $data.config.commentDisplayType = $options.CommentDisplayType.V2exOrigin)
                          }, "V2原版 ", 2)
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_44$1, [
                      _hoisted_45$1,
                      vue.createElementVNode("div", _hoisted_46$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoOpenDetail,
                          "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => $data.config.autoOpenDetail = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_47$1,
                    vue.createElementVNode("div", _hoisted_48$1, [
                      _hoisted_49$1,
                      vue.createElementVNode("div", _hoisted_50$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.closePostDetailBySpace,
                          "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => $data.config.closePostDetailBySpace = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_51$1, [
                      _hoisted_52$1,
                      vue.createElementVNode("div", _hoisted_53$1, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.contentAutoCollapse,
                          "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.config.contentAutoCollapse = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_54$1, [
                      _hoisted_55$1,
                      vue.createElementVNode("div", _hoisted_56$1, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[22] || (_cache[22] = ($event) => $data.config.postWidth = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.postWidth]
                        ])
                      ])
                    ]),
                    _hoisted_57$1,
                    _hoisted_58$1,
                    _hoisted_59$1,
                    _hoisted_60$1,
                    vue.createElementVNode("div", _hoisted_61$1, [
                      _hoisted_62,
                      vue.createElementVNode("div", _hoisted_63, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.showTopReply,
                          "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => $data.config.showTopReply = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_64, [
                      _hoisted_65,
                      vue.createElementVNode("div", _hoisted_66, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "number",
                          min: "1",
                          "onUpdate:modelValue": _cache[24] || (_cache[24] = ($event) => $data.config.topReplyCount = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.topReplyCount]
                        ])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_67, [
                      _hoisted_68,
                      vue.createElementVNode("div", _hoisted_69, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "number",
                          min: "1",
                          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => $data.config.topReplyLoveMinCount = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.topReplyLoveMinCount]
                        ])
                      ])
                    ]),
                    _hoisted_70,
                    vue.createElementVNode("div", _hoisted_71, [
                      _hoisted_72,
                      vue.createElementVNode("div", _hoisted_73, [
                        vue.createVNode(_component_BaseSwitch, {
                          "model-value": $data.config.rememberLastReadFloor,
                          "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => {
                            $data.config.rememberLastReadFloor = !$data.config.rememberLastReadFloor;
                            $data.config.autoJumpLastReadFloor = false;
                          })
                        }, null, 8, ["model-value"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_74, [
                      _hoisted_75,
                      vue.createElementVNode("div", _hoisted_76, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoJumpLastReadFloor,
                          "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => $data.config.autoJumpLastReadFloor = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ])
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 2 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_77, [
                    vue.createElementVNode("div", _hoisted_78, [
                      _hoisted_79,
                      vue.createElementVNode("div", _hoisted_80, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.openTag,
                          "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => $data.config.openTag = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_81, [
                      _hoisted_82,
                      vue.createElementVNode("div", _hoisted_83, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.base64,
                          "onUpdate:modelValue": _cache[29] || (_cache[29] = ($event) => $data.config.base64 = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_84, [
                      _hoisted_85,
                      vue.createElementVNode("div", _hoisted_86, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.autoSignin,
                          "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => $data.config.autoSignin = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    vue.createElementVNode("div", _hoisted_87, [
                      _hoisted_88,
                      vue.createElementVNode("div", _hoisted_89, [
                        vue.withDirectives(vue.createElementVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => $data.config.customBgColor = $event)
                        }, null, 512), [
                          [vue.vModelText, $data.config.customBgColor]
                        ])
                      ])
                    ]),
                    _hoisted_90,
                    _hoisted_91,
                    vue.createElementVNode("div", _hoisted_92, [
                      _hoisted_93,
                      vue.createElementVNode("div", _hoisted_94, [
                        vue.createVNode(_component_BaseSwitch, {
                          modelValue: $data.config.collectBrowserNotice,
                          "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => $data.config.collectBrowserNotice = $event)
                        }, null, 8, ["modelValue"])
                      ])
                    ]),
                    _hoisted_95
                  ])) : vue.createCommentVNode("", true),
                  $data.tabIndex === 3 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_96, [
                    _hoisted_97,
                    vue.createElementVNode("div", _hoisted_98, [
                      vue.createElementVNode("div", null, [
                        vue.createTextVNode(" 本项目完全开源，项目地址："),
                        vue.createElementVNode("a", {
                          href: $options.windowConst.git,
                          target: "_blank"
                        }, vue.toDisplayString($options.windowConst.git), 9, _hoisted_99),
                        vue.createTextVNode("，目前由我一个人维护，如果您觉得好用，"),
                        _hoisted_100
                      ]),
                      vue.createElementVNode("div", null, [
                        _hoisted_101,
                        _hoisted_102,
                        vue.createTextVNode(" 大多只是对V2EX修修补补、美化UI，在使用体验上依旧是10年前的网站，太多脚本年久失修无人维护。楼中楼只能解析当前页，如果有多页回复，楼中楼就会前言不搭后语莫名其妙的 "),
                        _hoisted_103,
                        _hoisted_104,
                        vue.createTextVNode(" 对V2EX进行了整体改造，如预览、点赞、回复、屏蔽等等都走异步请求，使用体验上已和现代网站无异，同时也集成了市面上常见的增强（辅助）功能， "),
                        _hoisted_105,
                        _hoisted_106,
                        _hoisted_107,
                        _hoisted_108,
                        _hoisted_109,
                        vue.createTextVNode(" 这个项目花了我很多精力，如果对您有用： 点个 "),
                        vue.createElementVNode("a", {
                          href: $options.windowConst.git
                        }, "Star ⭐️", 8, _hoisted_110),
                        vue.createTextVNode(" 或分享给他人，让更多的人知道我的存在。 "),
                        vue.createElementVNode("div", null, [
                          vue.createTextVNode("提供反馈，帮助我改进，以持续完善脚本。在 "),
                          vue.createElementVNode("a", {
                            href: $options.windowConst.issue
                          }, "这里", 8, _hoisted_111),
                          vue.createTextVNode(" 提出。")
                        ]),
                        _hoisted_112
                      ])
                    ])
                  ])) : vue.createCommentVNode("", true)
                ])
              ])
            ])
          ])
        ])) : vue.createCommentVNode("", true)
      ]),
      _: 1
    });
  }
  const Setting = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$8], ["__scopeId", "data-v-0c0fac4f"]]);
  const eventBus = {
    eventMap: /* @__PURE__ */ new Map(),
    on(eventType, cb) {
      let cbs = this.eventMap.get(eventType);
      if (cbs) {
        cbs.push(cb);
      } else {
        cbs = [cb];
      }
      this.eventMap.set(eventType, cbs);
    },
    emit(eventType, val) {
      let cbs = this.eventMap.get(eventType);
      if (cbs) {
        cbs.map((cb) => cb(val));
      }
    },
    off(eventType) {
      let cbs = this.eventMap.has(eventType);
      if (cbs) {
        this.eventMap.delete(eventType);
      }
    },
    clear() {
      this.eventMap = /* @__PURE__ */ new Map();
    }
  };
  const CMD = {
    SHOW_TOOLTIP: "SHOW_TOOLTIP",
    SHOW_MSG: "SHOW_MSG",
    SET_CALL: "SET_CALL",
    SHOW_CALL: "SHOW_CALL",
    REFRESH_ONCE: "REFRESH_ONCE",
    ADD_REPLY: "ADD_REPLY",
    IGNORE: "IGNORE",
    MERGE: "MERGE",
    REMOVE: "REMOVE",
    CHANGE_COMMENT_THANK: "CHANGE_COMMENT_THANK",
    CHANGE_POST_THANK: "CHANGE_POST_THANK",
    ADD_TAG: "ADD_TAG",
    REMOVE_TAG: "REMOVE_TAG",
    RELATION_REPLY: "RELATION_REPLY",
    JUMP: "JUMP",
    ADD_READ: "ADD_READ",
    REFRESH_POST: "REFRESH_POST"
  };
  const _sfc_main$g = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseLoading",
    props: {
      size: { default: "normal" }
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["loading", [_ctx.size]])
        }, null, 2);
      };
    }
  });
  const BaseLoading = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-2697baa2"]]);
  const _hoisted_1$f = {
    key: 1,
    class: "key-notice"
  };
  const _hoisted_2$e = { class: "key" };
  const _sfc_main$f = /* @__PURE__ */ vue.defineComponent({
    __name: "BaseButton",
    props: {
      keyboard: {},
      active: { type: Boolean },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      size: { default: "normal" },
      type: { default: "primary" }
    },
    emits: ["click"],
    setup(__props) {
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(Tooltip, {
          disabled: !_ctx.keyboard,
          title: `快捷键: ${_ctx.keyboard}`
        }, {
          default: vue.withCtx(() => [
            vue.createElementVNode("div", vue.mergeProps({ class: "base-button" }, _ctx.$attrs, {
              onClick: _cache[0] || (_cache[0] = (e2) => !_ctx.disabled && !_ctx.loading && _ctx.$emit("click", e2)),
              class: [
                _ctx.active && "active",
                _ctx.size,
                _ctx.type,
                (_ctx.disabled || _ctx.loading) && "disabled",
                !_ctx.disabled && "hvr-grow"
              ]
            }), [
              vue.createElementVNode("span", {
                style: vue.normalizeStyle({ opacity: _ctx.loading ? 0 : 1 })
              }, [
                vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
              ], 4),
              _ctx.loading ? (vue.openBlock(), vue.createBlock(BaseLoading, {
                key: 0,
                size: "small"
              })) : vue.createCommentVNode("", true),
              _ctx.keyboard ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$f, [
                vue.createElementVNode("span", _hoisted_2$e, vue.toDisplayString(_ctx.keyboard), 1)
              ])) : vue.createCommentVNode("", true)
            ], 16)
          ]),
          _: 3
        }, 8, ["disabled", "title"]);
      };
    }
  });
  const BaseButton = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-5a7d79ba"]]);
  const _sfc_main$e = {
    name: "PopConfirm",
    components: { BaseButton },
    props: {
      title: {
        type: String,
        default() {
          return "";
        }
      },
      disabled: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        show: false
      };
    },
    methods: {
      showPop(e2) {
        if (this.disabled)
          return;
        let rect = e2.target.getBoundingClientRect();
        this.show = true;
        vue.nextTick(() => {
          this.$refs.tip.style.top = rect.top + "px";
          this.$refs.tip.style.left = rect.left + rect.width / 2 - 50 + "px";
        });
      },
      confirm() {
        this.show = false;
        this.$emit("confirm");
      }
    }
  };
  const _hoisted_1$e = { class: "pop-confirm" };
  const _hoisted_2$d = {
    key: 0,
    ref: "tip",
    class: "pop-confirm-content"
  };
  const _hoisted_3$a = { class: "text" };
  const _hoisted_4$a = { class: "options" };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseButton = vue.resolveComponent("BaseButton");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$e, [
      (vue.openBlock(), vue.createBlock(vue.Teleport, { to: "body" }, [
        vue.createVNode(vue.Transition, null, {
          default: vue.withCtx(() => [
            $data.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$d, [
              vue.createElementVNode("div", _hoisted_3$a, vue.toDisplayString($props.title), 1),
              vue.createElementVNode("div", _hoisted_4$a, [
                vue.createVNode(_component_BaseButton, {
                  type: "link",
                  size: "small",
                  onClick: _cache[0] || (_cache[0] = ($event) => $data.show = false)
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("取消")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_BaseButton, {
                  size: "small",
                  onClick: $options.confirm
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("确认")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ], 512)) : vue.createCommentVNode("", true)
          ]),
          _: 1
        })
      ])),
      vue.createElementVNode("span", {
        onClick: _cache[1] || (_cache[1] = (...args) => $options.showPop && $options.showPop(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])
    ]);
  }
  const PopConfirm = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$7], ["__scopeId", "data-v-05424197"]]);
  const loveColor = "rgb(224,42,42)";
  const _sfc_main$d = {
    name: "Point",
    components: { PopConfirm },
    inject: ["post", "isLogin"],
    props: {
      item: {
        type: Object,
        default() {
          return {};
        }
      },
      full: {
        type: Boolean,
        default() {
          return true;
        }
      },
      apiUrl: ""
    },
    computed: {
      disabled() {
        return this.item.username === window.user.username || this.item.isThanked || !this.isLogin;
      }
    },
    methods: {
      getColor() {
        if (this.item.isThanked)
          return loveColor;
        return this.full ? loveColor : "#929596";
      },
      getIsFull() {
        if (this.item.isThanked)
          return loveColor;
        return this.full ? loveColor : "none";
      },
      thankError() {
        if (!this.isLogin) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
        }
        if (this.item.username === window.user.username) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "不能感谢自己" });
        }
        if (this.item.isThanked) {
          return eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "已经感谢过了" });
        }
      },
      async thank() {
        this.$emit("addThank");
        let url = `${window.baseUrl}/thank/${this.apiUrl}?once=${this.post.once}`;
        $.post(url).then((res) => {
          if (!res.success) {
            this.$emit("recallThank");
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: res.message });
          }
          eventBus.emit(CMD.REFRESH_ONCE, res.once);
        }, (err) => {
          this.$emit("recallThank");
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "感谢失败" });
          eventBus.emit(CMD.REFRESH_ONCE);
        });
      }
    }
  };
  const _hoisted_1$d = {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_2$c = ["fill", "stroke"];
  const _hoisted_3$9 = {
    key: 0,
    class: "link-num"
  };
  const _hoisted_4$9 = { key: 1 };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PopConfirm = vue.resolveComponent("PopConfirm");
    return vue.openBlock(), vue.createBlock(_component_PopConfirm, {
      disabled: $options.disabled,
      title: `确认花费 10 个铜币向 @${$props.item.username} 的这条回复发送感谢？`,
      onConfirm: $options.thank
    }, {
      default: vue.withCtx(() => [
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["tool", $options.disabled ? "disabled" : ""]),
          onClick: _cache[0] || (_cache[0] = (...args) => $options.thankError && $options.thankError(...args))
        }, [
          (vue.openBlock(), vue.createElementBlock("svg", _hoisted_1$d, [
            vue.createElementVNode("path", {
              d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
              fill: $options.getIsFull(),
              stroke: $options.getColor(),
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, 8, _hoisted_2$c)
          ])),
          $props.item.thankCount ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_3$9, vue.toDisplayString($props.item.thankCount), 1)) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$9, "感谢"))
        ], 2)
      ]),
      _: 1
    }, 8, ["disabled", "title", "onConfirm"]);
  }
  const Point = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$6]]);
  const _sfc_main$c = {
    name: "Author",
    components: { PopConfirm, Point },
    inject: ["isLogin", "tags", "config", "isNight"],
    props: {
      modelValue: false,
      comment: {
        type: Object,
        default() {
          return {};
        }
      },
      type: {
        type: String,
        default() {
          return "list";
        }
      }
    },
    computed: {
      isDev() {
        return false;
      },
      pointInfo() {
        return {
          isThanked: this.comment.isThanked,
          thankCount: this.comment.thankCount,
          username: this.comment.username
        };
      },
      myTags() {
        return this.tags[this.comment.username] ?? [];
      },
      context() {
        return this.comment.replyUsers.length;
      }
    },
    methods: {
      jump() {
        eventBus.emit(CMD.JUMP, this.comment.floor);
      },
      showRelationReply() {
        if (!this.comment.replyUsers.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "该回复无上下文" });
          return;
        }
        eventBus.emit(CMD.RELATION_REPLY, {
          left: this.comment.replyUsers,
          right: this.comment.username,
          rightFloor: this.comment.floor
        });
      },
      addTag() {
        eventBus.emit(CMD.ADD_TAG, this.comment.username);
      },
      removeTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: this.comment.username, tag });
      },
      checkIsLogin(emitName = "") {
        if (!this.isLogin) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
          return false;
        }
        this.$emit(emitName);
        return true;
      },
      addThank() {
        eventBus.emit(CMD.CHANGE_COMMENT_THANK, { id: this.comment.id, type: "add" });
      },
      recallThank() {
        eventBus.emit(CMD.CHANGE_COMMENT_THANK, { id: this.comment.id, type: "recall" });
      }
    }
  };
  const _withScopeId$a = (n2) => (vue.pushScopeId("data-v-c450f45f"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$c = { class: "Author-left" };
  const _hoisted_2$b = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M22 42H6V26",
    stroke: "#177EC9",
    "stroke-width": "4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_3$8 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M26 6H42V22",
    stroke: "#177EC9",
    "stroke-width": "4",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_4$8 = [
    _hoisted_2$b,
    _hoisted_3$8
  ];
  const _hoisted_5$7 = ["href"];
  const _hoisted_6$7 = ["src"];
  const _hoisted_7$6 = { class: "texts" };
  const _hoisted_8$6 = ["href"];
  const _hoisted_9$6 = {
    key: 0,
    class: "owner"
  };
  const _hoisted_10$5 = {
    key: 1,
    class: "dup"
  };
  const _hoisted_11$5 = {
    key: 2,
    class: "mod"
  };
  const _hoisted_12$5 = { class: "ago" };
  const _hoisted_13$5 = { class: "my-tag" };
  const _hoisted_14$5 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_15$5 = ["onClick"];
  const _hoisted_16$5 = { class: "Author-right" };
  const _hoisted_17$4 = {
    key: 0,
    class: "toolbar"
  };
  const _hoisted_18$4 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "tool" }, [
    /* @__PURE__ */ vue.createElementVNode("span", null, "隐藏")
  ], -1));
  const _hoisted_19$3 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("span", null, "上下文", -1));
  const _hoisted_20$3 = [
    _hoisted_19$3
  ];
  const _hoisted_21$3 = /* @__PURE__ */ _withScopeId$a(() => /* @__PURE__ */ vue.createElementVNode("span", null, "跳转", -1));
  const _hoisted_22$2 = [
    _hoisted_21$3
  ];
  const _hoisted_23$2 = /* @__PURE__ */ vue.createStaticVNode('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c450f45f><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="#929596" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c450f45f></path><path d="M23 21H25.0025" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c450f45f></path><path d="M33.001 21H34.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c450f45f></path><path d="M13.001 21H14.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c450f45f></path></svg><span data-v-c450f45f>回复</span>', 2);
  const _hoisted_25$2 = [
    _hoisted_23$2
  ];
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_PopConfirm = vue.resolveComponent("PopConfirm");
    const _component_Point = vue.resolveComponent("Point");
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["Author", { expand: !$props.modelValue }])
    }, [
      vue.createElementVNode("div", _hoisted_1$c, [
        !$props.modelValue ? (vue.openBlock(), vue.createElementBlock("svg", {
          key: 0,
          class: "expand-icon",
          onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", true)),
          width: "24",
          height: "24",
          viewBox: "0 0 48 48",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, _hoisted_4$8)) : vue.createCommentVNode("", true),
        $options.config.viewType !== "simple" ? (vue.openBlock(), vue.createElementBlock("a", {
          key: 1,
          class: "avatar",
          href: `/member/${$props.comment.username}`
        }, [
          vue.createElementVNode("img", {
            src: $props.comment.avatar,
            alt: ""
          }, null, 8, _hoisted_6$7)
        ], 8, _hoisted_5$7)) : vue.createCommentVNode("", true),
        vue.createElementVNode("span", _hoisted_7$6, [
          vue.createElementVNode("strong", null, [
            vue.createElementVNode("a", {
              href: `/member/${$props.comment.username}`,
              class: vue.normalizeClass(["username", { "dark": $options.isNight }])
            }, vue.toDisplayString($props.comment.username), 11, _hoisted_8$6)
          ]),
          $props.comment.isOp ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$6, "OP")) : vue.createCommentVNode("", true),
          $props.comment.isDup ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$5, "DUP")) : vue.createCommentVNode("", true),
          $props.comment.isMod ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$5, "MOD")) : vue.createCommentVNode("", true),
          vue.createElementVNode("span", _hoisted_12$5, vue.toDisplayString($props.comment.date), 1),
          $options.isLogin && $options.config.openTag ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.myTags, (i) => {
              return vue.openBlock(), vue.createElementBlock("span", _hoisted_13$5, [
                _hoisted_14$5,
                vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
                vue.createElementVNode("i", {
                  class: "fa fa-trash-o remove",
                  onClick: ($event) => $options.removeTag(i)
                }, null, 8, _hoisted_15$5)
              ]);
            }), 256)),
            vue.createElementVNode("span", {
              class: "add-tag ago",
              onClick: _cache[1] || (_cache[1] = (...args) => $options.addTag && $options.addTag(...args)),
              title: "添加标签"
            }, "+")
          ], 64)) : vue.createCommentVNode("", true)
        ])
      ]),
      vue.createElementVNode("div", _hoisted_16$5, [
        $options.isLogin ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_17$4, [
          vue.createVNode(_component_PopConfirm, {
            title: "确认隐藏这条回复?",
            onConfirm: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("hide"))
          }, {
            default: vue.withCtx(() => [
              _hoisted_18$4
            ]),
            _: 1
          }),
          $options.context ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "tool",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.showRelationReply && $options.showRelationReply(...args))
          }, _hoisted_20$3)) : vue.createCommentVNode("", true),
          $props.type === "top" ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: "tool",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.jump && $options.jump(...args))
          }, _hoisted_22$2)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: "tool",
            onClick: _cache[5] || (_cache[5] = ($event) => $options.checkIsLogin("reply"))
          }, _hoisted_25$2),
          vue.withDirectives(vue.createVNode(_component_Point, {
            item: $options.pointInfo,
            onAddThank: $options.addThank,
            onRecallThank: $options.recallThank,
            "api-url": "reply/" + $props.comment.id
          }, null, 8, ["item", "onAddThank", "onRecallThank", "api-url"]), [
            [vue.vShow, !$props.comment.thankCount]
          ])
        ])) : vue.createCommentVNode("", true),
        vue.withDirectives(vue.createVNode(_component_Point, {
          style: { "margin-left": "1rem" },
          item: $options.pointInfo,
          onAddThank: $options.addThank,
          onRecallThank: $options.recallThank,
          "api-url": "reply/" + $props.comment.id
        }, null, 8, ["item", "onAddThank", "onRecallThank", "api-url"]), [
          [vue.vShow, $props.comment.thankCount]
        ]),
        vue.createElementVNode("div", {
          class: vue.normalizeClass(["floor", { isDev: $options.isDev }])
        }, vue.toDisplayString($props.comment.floor), 3)
      ])
    ], 2);
  }
  const Author = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$5], ["__scopeId", "data-v-c450f45f"]]);
  const _withScopeId$9 = (n2) => (vue.pushScopeId("data-v-fb753464"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$b = { class: "get-cursor" };
  const _hoisted_2$a = ["innerHTML"];
  const _hoisted_3$7 = { class: "toolbar" };
  const _hoisted_4$7 = { class: "left" };
  const _hoisted_5$6 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z",
    fill: "none",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_6$6 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M24 35C29 35 31 31 31 31H17C17 31 19 35 24 35Z",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_7$5 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M31 18V22",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_8$5 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("path", {
    d: "M17 18V22",
    stroke: "#929596",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round"
  }, null, -1));
  const _hoisted_9$5 = [
    _hoisted_5$6,
    _hoisted_6$6,
    _hoisted_7$5,
    _hoisted_8$5
  ];
  const _hoisted_10$4 = { class: "upload" };
  const _hoisted_11$4 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M5 10C5 8.89543 5.89543 8 7 8L41 8C42.1046 8 43 8.89543 43 10V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V10Z",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 24L20 28L26 21L43 34V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V34L15 24Z",
      fill: "none",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_12$4 = {
    key: 0,
    style: { "color": "black", "font-size": "1.4rem" }
  };
  const _hoisted_13$4 = { class: "right" };
  const _hoisted_14$4 = /* @__PURE__ */ _withScopeId$9(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, "经典表情", -1));
  const _hoisted_15$4 = { class: "list" };
  const _hoisted_16$4 = ["src", "onClick"];
  const _hoisted_17$3 = { class: "emoji" };
  const _hoisted_18$3 = { class: "title" };
  const _hoisted_19$2 = { class: "list" };
  const _hoisted_20$2 = ["onClick"];
  const _sfc_main$b = {
    __name: "PostEditor",
    props: {
      replyUser: null,
      replyFloor: null,
      useType: {
        type: String,
        default() {
          return "reply-comment";
        }
      }
    },
    emits: ["close"],
    setup(__props, { expose: __expose, emit: __emit }) {
      const props = __props;
      const { replyUser, replyFloor, useType } = props;
      const replyInfo = replyUser ? `@${replyUser} #${replyFloor} ` : "";
      const emits = __emit;
      const post = vue.inject("post");
      const show = vue.inject("show");
      const isNight = vue.inject("isNight");
      vue.inject("pageType");
      const allReplyUsers = vue.inject("allReplyUsers");
      let isFocus = vue.ref(false);
      const loading = vue.ref(false);
      const uploadLoading = vue.ref(false);
      const isShowEmoticons = vue.ref(false);
      const editorId = vue.ref("editorId_" + Date.now());
      const content = vue.ref(replyInfo);
      const txtRef = vue.ref(null);
      const cursorRef = vue.ref(null);
      const emoticonsRef = vue.ref(null);
      const none = vue.ref('<span style="white-space:pre-wrap;"> </span>');
      const emojiEmoticons = [
        {
          title: "小黄脸",
          list: [
            "😀",
            "😁",
            "😂",
            "🤣",
            "😅",
            "😊",
            "😋",
            "😘",
            "🥰",
            "😗",
            "🤩",
            "🤔",
            "🤨",
            "😐",
            "😑",
            "🙄",
            "😏",
            "😪",
            "😫",
            "🥱",
            "😜",
            "😒",
            "😔",
            "😨",
            "😰",
            "😱",
            "🥵",
            "😡",
            "🥳",
            "🥺",
            "🤭",
            "🧐",
            "😎",
            "🤓",
            "😭",
            "🤑",
            "🤮"
          ]
        },
        {
          title: "手势",
          list: [
            "🙋",
            "🙎",
            "🙅",
            "🙇",
            "🤷",
            "🤏",
            "👉",
            "✌️",
            "🤘",
            "🤙",
            "👌",
            "🤌",
            "👍",
            "👎",
            "👋",
            "🤝",
            "🙏",
            "👏"
          ]
        },
        {
          title: "庆祝",
          list: ["✨", "🎉", "🎊"]
        },
        {
          title: "其他",
          list: ["👻", "🤡", "🐔", "👀", "💩", "🐴", "🦄", "🐧", "🐶", "🐒", "🙈", "🙉", "🙊", "🐵"]
        }
      ];
      const classicsEmoticons = [
        {
          name: "[狗头]",
          low: "https://i.imgur.com/io2SM1h.png",
          high: "https://i.imgur.com/0icl60r.png"
        },
        {
          name: "[马]",
          low: "https://i.imgur.com/8EKZv7I.png",
          high: "https://i.imgur.com/ANFUX52.png"
        },
        {
          name: "[不高兴]",
          low: "https://i.imgur.com/huX6coX.png",
          high: "https://i.imgur.com/N7JEuvc.png"
        },
        {
          name: "[呵呵]",
          low: "https://i.imgur.com/RvoLAbX.png",
          high: "https://i.imgur.com/xSzIqrK.png"
        },
        {
          name: "[真棒]",
          low: "https://i.imgur.com/xr1UOz1.png",
          high: "https://i.imgur.com/w8YEw9Q.png"
        },
        {
          name: "[鄙视]",
          low: "https://i.imgur.com/u6jlqVq.png",
          high: "https://i.imgur.com/8JFNANq.png"
        },
        {
          name: "[疑问]",
          low: "https://i.imgur.com/F29pmQ6.png",
          high: "https://i.imgur.com/EbbTQAR.png"
        },
        {
          name: "[吐舌]",
          low: "https://i.imgur.com/InmIzl9.png",
          high: "https://i.imgur.com/Ovj56Cd.png"
        },
        // {
        //   name: '[嘲笑]',
        //   low: 'https://i.imgur.com/BaWcsMR.png',
        //   high: 'https://i.imgur.com/0OGfJw4.png'
        // },
        // {
        //   name: '[滑稽]',
        //   low: 'https://i.imgur.com/lmbN0yI.png',
        //   high: 'https://i.imgur.com/Pc0wH85.png'
        // },
        {
          name: "[笑眼]",
          low: "https://i.imgur.com/ZveiiGy.png",
          high: "https://i.imgur.com/PI1CfEr.png"
        },
        {
          name: "[狂汗]",
          low: "https://i.imgur.com/veWihk6.png",
          high: "https://i.imgur.com/3LtHdQv.png"
        },
        {
          name: "[大哭]",
          low: "https://i.imgur.com/hu4oR6C.png",
          high: "https://i.imgur.com/b4X9XLE.png"
        },
        {
          name: "[喷]",
          low: "https://i.imgur.com/bkw3VRr.png",
          high: "https://i.imgur.com/wnZL13L.png"
        },
        {
          name: "[苦笑]",
          low: "https://i.imgur.com/VUWFktU.png",
          high: "https://i.imgur.com/NAfspZ1.png"
        },
        {
          name: "[喝酒]",
          low: "https://i.imgur.com/2ZZSapE.png",
          high: "https://i.imgur.com/rVbSVak.png"
        },
        {
          name: "[吃瓜]",
          low: "https://i.imgur.com/ee8Lq7H.png",
          high: "https://i.imgur.com/0L26og9.png"
        },
        {
          name: "[捂脸]",
          low: "https://i.imgur.com/krir4IG.png",
          high: "https://i.imgur.com/qqBqgVm.png"
        },
        {
          name: "[呕]",
          low: "https://i.imgur.com/6CUiUxv.png",
          high: "https://i.imgur.com/kgdxRsG.png"
        },
        {
          name: "[阴险]",
          low: "https://i.imgur.com/MA8YqTP.png",
          high: "https://i.imgur.com/e94jbaT.png"
        },
        {
          name: "[怒]",
          low: "https://i.imgur.com/n4kWfGB.png",
          high: "https://i.imgur.com/iMXxNxh.png"
        },
        {
          name: "[衰]",
          low: "https://i.imgur.com/voHFDyQ.png",
          high: "https://i.imgur.com/XffE6gu.png"
        },
        {
          name: "[合十]",
          low: "https://i.imgur.com/I8x3ang.png",
          high: "https://i.imgur.com/T4rJVee.png"
        },
        {
          name: "[赞]",
          low: "https://i.imgur.com/lG44yUl.png",
          high: "https://i.imgur.com/AoF5PLp.png"
        },
        {
          name: "[踩]",
          low: "https://i.imgur.com/cJp0uKZ.png",
          high: "https://i.imgur.com/1XYGfXj.png"
        },
        {
          name: "[爱心]",
          low: "https://i.imgur.com/sLENaF5.png",
          high: "https://i.imgur.com/dND56oX.png"
        },
        {
          name: "[心碎]",
          low: "https://i.imgur.com/AZxJzve.png",
          high: "https://i.imgur.com/RiUsPci.png"
        }
      ];
      const imgurClientIdPool = [
        "3107b9ef8b316f3",
        "442b04f26eefc8a",
        "59cfebe717c09e4",
        "60605aad4a62882",
        "6c65ab1d3f5452a",
        "83e123737849aa9",
        "9311f6be1c10160",
        "c4a4a563f698595",
        "81be04b9e4a08ce"
      ];
      __expose({ content, isFocus: () => isFocus.value });
      const editorClass = vue.computed(() => {
        return [useType, isFocus.value ? "isFocus" : "", isNight.value ? "isNight" : ""];
      });
      const cursorHtml = vue.computed(() => {
        var _a;
        if (!txtRef.value || !content.value)
          return "";
        let index = ((_a = txtRef.value) == null ? void 0 : _a.selectionStart) || 0;
        return content.value.substring(0, index).replace(/</g, "<").replace(/>/g, ">").replace(/\n/g, "<br/>").replace(/\s/g, none.value);
      });
      const disabled = vue.computed(() => {
        if (content.value) {
          return content.value === replyInfo;
        } else {
          return true;
        }
      });
      function drop(e2) {
        e2.preventDefault();
        upload(e2.dataTransfer.files[0]);
      }
      async function upload(file) {
        if (!file)
          return;
        if (uploadLoading.value)
          return;
        uploadLoading.value = true;
        const formData = new FormData();
        formData.append("image", file);
        const randomIndex = Math.floor(Math.random() * imgurClientIdPool.length);
        const clidenId = imgurClientIdPool[randomIndex];
        const res = await fetch("https://api.imgur.com/3/upload", {
          method: "POST",
          headers: { Authorization: `Client-ID ${clidenId}` },
          body: formData
        });
        uploadLoading.value = false;
        if (res.ok) {
          const resData = await res.json();
          if (resData.success) {
            return insert(" " + resData.data.link + " ");
          }
        }
        eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "上传失败" });
      }
      async function submit() {
        if (disabled.value || loading.value)
          return;
        loading.value = true;
        let submit_content = content.value.replace(/\[((?!\[).)+\]/g, function(match) {
          let item2 = classicsEmoticons.find((v) => v.name === match);
          if (item2) {
            return item2.low + " ";
          }
          return match;
        });
        let show_content = content.value.replace(/https?:\/\/(i\.)?imgur\.com\/((?!http).)+\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG)/g, function(match) {
          return `<img src="${match}" data-originUrl="${match}" data-notice="这个img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`;
        });
        show_content = show_content.replace(/\[((?!\[).)+\]/g, function(match) {
          let item2 = classicsEmoticons.find((v) => v.name === match);
          if (item2) {
            return `<a target="_blank" href="${item2.low}" rel="nofollow noopener"><img src="${item2.low}" class="embedded_image" rel="noreferrer"></a> `;
          }
          return match;
        });
        let matchUsers = show_content.match(/@([\w]+?[\s])/g);
        if (matchUsers) {
          matchUsers.map((i) => {
            let username = i.replace("@", "").replace(" ", "");
            show_content = show_content.replace(username, `<a href="/member/${username}">${username}</a>`);
          });
        }
        show_content = show_content.replaceAll("\n", "<br/>");
        let item = {
          thankCount: 0,
          isThanked: false,
          isOp: post.value.username === window.user.username,
          isDup: false,
          id: Date.now(),
          username: window.user.username,
          avatar: window.user.avatar,
          date: "几秒前",
          floor: post.value.replyCount + 1,
          reply_content: show_content ?? "",
          children: [],
          replyUsers: replyUser ? [replyUser] : [],
          replyFloor: replyFloor || -1,
          level: useType === "reply-comment" ? 1 : 0
        };
        item.hideCallUserReplyContent = item.reply_content;
        if (item.replyUsers.length === 1) {
          item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => "");
        }
        console.log("回复", item);
        let url = `${window.baseUrl}/t/${post.value.id}`;
        $.post(url, { content: submit_content, once: post.value.once }).then(
          // $.post(url, {content: submit_content, once: 123}).then(
          (res) => {
            loading.value = false;
            let r2 = res.search("你上一条回复的内容和这条相同");
            if (r2 > -1)
              return eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "你上一条回复的内容和这条相同" });
            r2 = res.search("请不要在每一个回复中都包括外链，这看起来像是在 spamming");
            if (r2 > -1)
              return eventBus.emit(CMD.SHOW_MSG, {
                type: "error",
                text: "请不要在每一个回复中都包括外链，这看起来像是在 spamming"
              });
            let r22 = res.search("创建新回复");
            if (r22 > -1) {
              eventBus.emit(CMD.REFRESH_ONCE, res);
              eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "回复出现了问题，请使用原版进行回复" });
              let clientWidth = window.document.body.clientWidth;
              let windowWidth = 1200;
              let left = clientWidth / 2 - windowWidth / 2;
              let newWin = window.open("创建新回复", "", `width=${windowWidth},height=600,left=${left},top=100`);
              newWin.document.write(res);
              let loop = setInterval(function() {
                if (newWin.closed) {
                  clearInterval(loop);
                  eventBus.emit(CMD.REFRESH_POST);
                }
              }, 1e3);
              return;
            }
            content.value = replyInfo;
            emits("close");
            eventBus.emit(CMD.REFRESH_ONCE, res);
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "回复成功" });
            eventBus.emit(CMD.ADD_REPLY, item);
          },
          (err) => {
            console.log("err", err);
            loading.value = false;
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "回复失败" });
          }
        ).catch((r2) => {
          console.log("catch", r2);
        });
      }
      function showEmoticons(e2) {
        if (isShowEmoticons.value) {
          return isShowEmoticons.value = false;
        }
        let rect = e2.currentTarget.getBoundingClientRect();
        emoticonsRef.value.style.left = rect.left + 30 + "px";
        emoticonsRef.value.style.bottom = window.innerHeight - rect.top - 20 + "px";
        isShowEmoticons.value = true;
      }
      function off() {
        eventBus.emit(CMD.SHOW_CALL, { show: false });
        eventBus.off(CMD.SET_CALL);
      }
      function checkHeight2() {
        txtRef.value.style.height = 0;
        txtRef.value.style.height = txtRef.value.scrollHeight + "px";
      }
      function insert(str) {
        let cursorPos = txtRef.value.selectionStart;
        let start = content.value.slice(0, cursorPos);
        let end = content.value.slice(cursorPos, content.value.length);
        content.value = start + str + end;
        let moveCursorPos = start.length + str.length;
        setTimeout(() => {
          txtRef.value.focus();
          txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
          checkHeight2();
        });
      }
      function showCallPopover(text) {
        let r2 = cursorRef.value.getBoundingClientRect();
        eventBus.emit(CMD.SHOW_CALL, { show: true, top: r2.top, left: r2.left, text });
        eventBus.off(CMD.SET_CALL);
        eventBus.on(CMD.SET_CALL, (e2) => {
          let cursorPos = txtRef.value.selectionStart;
          let start = content.value.slice(0, cursorPos);
          let end = content.value.slice(cursorPos, content.value.length);
          let lastCallPos = start.lastIndexOf("@");
          start = content.value.slice(0, lastCallPos + 1);
          if (e2 === "管理员") {
            e2 = "Livid @Kai @Olivia @GordianZ @sparanoid";
          }
          if (e2 === "所有人") {
            e2 = allReplyUsers.value.map((v, i) => {
              if (i)
                return "@" + v;
              else
                return v;
            }).join(" ");
          }
          content.value = start + e2 + " " + end;
          let moveCursorPos = start.length + e2.length + 1;
          setTimeout(() => {
            txtRef.value.setSelectionRange(moveCursorPos, moveCursorPos);
            checkHeight2();
          });
          eventBus.off(CMD.SET_CALL);
        });
      }
      function onKeydown(e2) {
        let code = e2.keyCode;
        switch (code) {
          case 8:
            if (content.value === "@") {
              off();
            }
            break;
          case 37:
          case 38:
          case 39:
          case 40:
            setTimeout(() => onInput({ data: "" }), 100);
            break;
          case 27:
            e2.preventDefault();
            e2.stopPropagation();
            e2.stopImmediatePropagation();
            return false;
          case 13:
            if (e2.ctrlKey)
              submit();
            if (e2.metaKey)
              submit();
            break;
        }
      }
      function onInput(e2) {
        let cursorPos = txtRef.value.selectionStart;
        if (!content.value)
          return;
        if (e2.data === " ") {
          return off();
        }
        if (e2.data === "@") {
          if (content.value.length !== 1) {
            if (content.value[cursorPos - 2] === " " || content.value[cursorPos - 2] === "\n") {
              return showCallPopover("");
            }
          } else {
            return showCallPopover("");
          }
          off();
        } else {
          let judgeStr = content.value.slice(0, cursorPos);
          let lastCallPos = judgeStr.lastIndexOf("@");
          if (lastCallPos === -1) {
            return off();
          }
          let callStr = judgeStr.slice(lastCallPos, cursorPos);
          let hasSpace = callStr.includes(" ");
          if (hasSpace) {
            off();
          } else {
            if (lastCallPos === 0) {
              return showCallPopover(callStr.replace("@", ""));
            }
            if (content.value.length !== 1) {
              if (content.value[lastCallPos - 1] === " " || content.value[lastCallPos - 1] === "\n") {
                return showCallPopover(callStr.replace("@", ""));
              }
            } else {
              return showCallPopover(callStr.replace("@", ""));
            }
            off();
          }
        }
      }
      function onPaste(e2) {
        const dataTransferItemList = e2.clipboardData.items;
        const items = [].slice.call(dataTransferItemList).filter(function(item) {
          return item.type.indexOf("image") !== -1;
        });
        if (items.length === 0) {
          return;
        }
        const dataTransferItem = items[0];
        const blob = dataTransferItem.getAsFile();
        upload(blob);
      }
      function onBlur() {
        document.removeEventListener("paste", onPaste);
        isFocus.value = false;
      }
      function onFocusin() {
        document.addEventListener("paste", onPaste);
      }
      vue.watch(() => show, (n2) => {
        if (n2.value)
          isShowEmoticons.value = false;
      }, { deep: true });
      vue.onMounted(() => {
        $(`.${editorId.value}`).each(function() {
          this.setAttribute("style", "height:" + this.scrollHeight + "px;overflow-y:hidden;");
        }).on("input", function() {
          this.style.height = 0;
          this.style.height = this.scrollHeight + "px";
        });
        if (useType === "reply-comment") {
          txtRef.value && txtRef.value.focus();
        }
      });
      vue.onBeforeUnmount(() => {
        $(`.${editorId.value}`).off();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["post-editor-wrapper", editorClass.value])
        }, [
          vue.withDirectives(vue.createElementVNode("textarea", {
            class: vue.normalizeClass(["post-editor", editorId.value]),
            ref_key: "txtRef",
            ref: txtRef,
            onFocus: _cache[0] || (_cache[0] = ($event) => vue.isRef(isFocus) ? isFocus.value = true : isFocus = true),
            onBlur,
            onFocusin,
            placeholder: "请尽量让自己的回复能够对别人有帮助",
            onInput,
            onKeydown,
            onDrop: drop,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => content.value = $event)
          }, null, 34), [
            [vue.vModelText, content.value]
          ]),
          vue.createElementVNode("div", _hoisted_1$b, [
            vue.createElementVNode("span", { innerHTML: cursorHtml.value }, null, 8, _hoisted_2$a),
            vue.createElementVNode("span", {
              class: "cursor",
              ref_key: "cursorRef",
              ref: cursorRef
            }, "|", 512)
          ]),
          vue.createElementVNode("div", _hoisted_3$7, [
            vue.createElementVNode("div", _hoisted_4$7, [
              (vue.openBlock(), vue.createElementBlock("svg", {
                onClick: showEmoticons,
                width: "20",
                height: "20",
                viewBox: "0 0 48 48",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg"
              }, _hoisted_9$5)),
              vue.createElementVNode("div", _hoisted_10$4, [
                vue.createElementVNode("input", {
                  type: "file",
                  accept: "image/*",
                  onChange: _cache[2] || (_cache[2] = (e2) => upload(e2.currentTarget.files[0]))
                }, null, 32),
                _hoisted_11$4
              ]),
              uploadLoading.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_12$4, "上传中.....")) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", _hoisted_13$4, [
              vue.unref(useType) === "reply-comment" ? (vue.openBlock(), vue.createBlock(BaseButton, {
                key: 0,
                type: "link",
                size: "small",
                style: { "margin-right": "1rem", "cursor": "pointer" },
                onClick: _cache[3] || (_cache[3] = ($event) => emits("close"))
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" 关闭 ")
                ]),
                _: 1
              })) : vue.createCommentVNode("", true),
              vue.createVNode(BaseButton, {
                size: "small",
                disabled: disabled.value,
                loading: loading.value,
                onClick: submit
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("回复 ")
                ]),
                _: 1
              }, 8, ["disabled", "loading"])
            ])
          ]),
          vue.withDirectives(vue.createElementVNode("div", {
            class: "emoticon-pack",
            ref_key: "emoticonsRef",
            ref: emoticonsRef
          }, [
            vue.createElementVNode("i", {
              class: "fa fa-times",
              "aria-hidden": "true",
              onClick: _cache[4] || (_cache[4] = ($event) => isShowEmoticons.value = false)
            }),
            _hoisted_14$4,
            vue.createElementVNode("div", _hoisted_15$4, [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(classicsEmoticons, (item) => {
                return vue.createElementVNode("img", {
                  src: item.high,
                  onClick: ($event) => {
                    insert(item.name);
                    isShowEmoticons.value = false;
                  }
                }, null, 8, _hoisted_16$4);
              }), 64))
            ]),
            vue.createElementVNode("div", _hoisted_17$3, [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(emojiEmoticons, (item) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
                  vue.createElementVNode("div", _hoisted_18$3, vue.toDisplayString(item.title), 1),
                  vue.createElementVNode("div", _hoisted_19$2, [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(item.list, (emoji) => {
                      return vue.openBlock(), vue.createElementBlock("span", {
                        onClick: ($event) => {
                          insert(emoji);
                          isShowEmoticons.value = false;
                        }
                      }, vue.toDisplayString(emoji), 9, _hoisted_20$2);
                    }), 256))
                  ])
                ], 64);
              }), 64))
            ])
          ], 512), [
            [vue.vShow, isShowEmoticons.value]
          ])
        ], 2);
      };
    }
  };
  const PostEditor = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-fb753464"]]);
  const _hoisted_1$a = {
    key: 0,
    class: "html-wrapper"
  };
  const _hoisted_2$9 = ["innerHTML"];
  const checkHeight = 900;
  const _sfc_main$a = {
    __name: "BaseHtmlRender",
    props: ["html"],
    setup(__props) {
      const config2 = vue.inject("config");
      const props = __props;
      const contentRef = vue.ref(null);
      const mask = vue.ref(false);
      const handOpen = vue.ref(false);
      function mouseup(e2) {
        if (!config2.value.base64)
          return;
        let selectionText = window.win().getSelection().toString();
        if (selectionText) {
          let r2 = selectionText.match(/([A-Za-z0-9+/=]+)/g);
          if (r2) {
            if (r2[0].length < 4)
              return;
            eventBus.emit(CMD.SHOW_TOOLTIP, { text: r2[0], e: e2 });
          }
        }
      }
      vue.watch(config2.value, (newVale) => {
        if (!newVale.contentAutoCollapse) {
          mask.value = false;
        }
      });
      vue.watch([() => contentRef.value, () => props.html], () => {
        if (!contentRef.value || !props.html)
          return;
        if (!config2.value.contentAutoCollapse)
          return;
        contentRef.value.querySelectorAll("img").forEach((item) => {
          item.removeEventListener("load", checkContentHeight);
          item.addEventListener("load", checkContentHeight);
        });
        checkContentHeight();
      }, { immediate: true, flush: "post" });
      function checkContentHeight() {
        if (handOpen.value)
          return;
        let rect = contentRef.value.getBoundingClientRect();
        mask.value = rect.height >= checkHeight;
      }
      return (_ctx, _cache) => {
        return props.html ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$a, [
          vue.createElementVNode("div", {
            class: vue.normalizeClass({ mask: mask.value })
          }, [
            vue.createElementVNode("div", {
              ref_key: "contentRef",
              ref: contentRef,
              innerHTML: props.html,
              onMouseup: mouseup
            }, null, 40, _hoisted_2$9)
          ], 2),
          mask.value ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "expand",
            onClick: _cache[0] || (_cache[0] = ($event) => {
              mask.value = false;
              handOpen.value = true;
            })
          }, "展开")) : vue.createCommentVNode("", true)
        ])) : vue.createCommentVNode("", true);
      };
    }
  };
  const BaseHtmlRender = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-2c9a538c"]]);
  const _sfc_main$9 = {
    name: "Comment",
    components: { BaseHtmlRender, Author, PostEditor, Point },
    inject: ["post", "postDetailWidth", "show", "isNight", "config"],
    props: {
      modelValue: {
        reply_content: ""
      },
      type: {
        type: String,
        default() {
          return "list";
        }
      }
    },
    data() {
      return {
        showOrigin: false,
        edit: false,
        ding: false,
        expand: true,
        expandWrong: false,
        replyInfo: `@${this.modelValue.username} #${this.modelValue.floor} `,
        cssStyle: null,
        floor: this.modelValue.floor
      };
    },
    watch: {
      show(e2) {
        if (e2) {
          this.edit = false;
        }
      },
      postDetailWidth(n2, o) {
        this.checkIsTooLong(n2);
      }
    },
    computed: {
      CommentDisplayType() {
        return CommentDisplayType;
      },
      myClass() {
        return {
          isOp: this.modelValue.isOp,
          isSimple: this.config.viewType === "simple",
          ding: this.ding,
          isLevelOne: this.modelValue.level === 0,
          ["c_" + this.floor]: this.type !== "top"
        };
      }
    },
    mounted() {
      this.checkIsTooLong(this.postDetailWidth);
    },
    methods: {
      checkIsTooLong(postDetailWidth) {
        if (postDetailWidth !== 0) {
          let rect = this.$refs.comment.getBoundingClientRect();
          let ban = postDetailWidth / 2;
          if (ban < rect.width && rect.width < ban + 25 && this.modelValue.children.length) {
            this.expand = false;
            let padding = 2;
            this.cssStyle = {
              padding: "1rem 0",
              width: `calc(${postDetailWidth}px - ${padding}rem)`,
              transform: `translateX(calc(${rect.width - postDetailWidth}px + ${padding}rem))`,
              background: this.isNight ? "#18222d" : "white"
            };
          }
        }
      },
      //高亮一下
      showDing() {
        this.ding = true;
        setTimeout(() => {
          this.ding = false;
        }, 2e3);
      },
      hide() {
        let url = `${window.baseUrl}/ignore/reply/${this.modelValue.id}?once=${this.post.once}`;
        eventBus.emit(CMD.REMOVE, this.modelValue.floor);
        $.post(url).then((res) => {
          eventBus.emit(CMD.REFRESH_ONCE);
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "隐藏成功" });
        }, (err) => {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "隐藏成功,仅本次有效（接口调用失败！）" });
        });
      },
      toggle() {
        this.expand = !this.expand;
      },
      toggleContent() {
        if (this.modelValue.level === 0 && this.modelValue.replyUsers.length === 0)
          return;
        this.showOrigin = !this.showOrigin;
      }
    }
  };
  const _withScopeId$8 = (n2) => (vue.pushScopeId("data-v-888958af"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$9 = ["data-floor"];
  const _hoisted_2$8 = { class: "comment-content" };
  const _hoisted_3$6 = { class: "right" };
  const _hoisted_4$6 = { class: "w" };
  const _hoisted_5$5 = {
    key: 0,
    class: "wrong-wrapper"
  };
  const _hoisted_6$5 = ["href"];
  const _hoisted_7$4 = { class: "del-line" };
  const _hoisted_8$4 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("i", {
    class: "fa fa-question-circle-o wrong-icon",
    "aria-hidden": "true"
  }, null, -1));
  const _hoisted_9$4 = {
    key: 0,
    class: "warning"
  };
  const _hoisted_10$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_11$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_12$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_13$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_14$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("br", null, null, -1));
  const _hoisted_15$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("a", {
    href: "https://github.com/zyronon/web-scripts/issues",
    target: "_blank"
  }, "这里", -1));
  const _hoisted_16$3 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("p", null, "---原文---", -1));
  const _hoisted_17$2 = /* @__PURE__ */ _withScopeId$8(() => /* @__PURE__ */ vue.createElementVNode("p", null, "-----------", -1));
  const _hoisted_18$2 = { class: "simple-wrapper" };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Author = vue.resolveComponent("Author");
    const _component_BaseHtmlRender = vue.resolveComponent("BaseHtmlRender");
    const _component_PostEditor = vue.resolveComponent("PostEditor");
    const _component_Comment = vue.resolveComponent("Comment", true);
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["comment", $options.myClass]),
      ref: "comment",
      "data-floor": $data.floor
    }, [
      vue.createVNode(_component_Author, {
        modelValue: $data.expand,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.expand = $event),
        comment: $props.modelValue,
        onReply: _cache[1] || (_cache[1] = ($event) => $data.edit = !$data.edit),
        type: $props.type,
        onHide: $options.hide
      }, null, 8, ["modelValue", "comment", "type", "onHide"]),
      $data.cssStyle && !$data.expand ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: "more ago",
        onClick: _cache[2] || (_cache[2] = ($event) => $data.expand = !$data.expand)
      }, " 由于嵌套回复层级太深，自动将后续回复隐藏 ")) : vue.createCommentVNode("", true),
      $data.expand ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 1,
        class: "comment-content-w",
        style: vue.normalizeStyle($data.cssStyle)
      }, [
        $data.cssStyle ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "more ago",
          onClick: _cache[3] || (_cache[3] = ($event) => $data.expand = !$data.expand)
        }, " 由于嵌套回复层级太深，自动将以下回复移至可见范围 ")) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", _hoisted_2$8, [
          vue.createElementVNode("div", {
            class: "left expand-line",
            onClick: _cache[4] || (_cache[4] = (...args) => $options.toggle && $options.toggle(...args))
          }),
          vue.createElementVNode("div", _hoisted_3$6, [
            vue.createElementVNode("div", _hoisted_4$6, [
              $props.modelValue.isWrong ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_5$5, [
                vue.createElementVNode("span", {
                  onClick: _cache[5] || (_cache[5] = ($event) => $data.expandWrong = !$data.expandWrong),
                  title: "点击楼层号查看提示"
                }, [
                  vue.createElementVNode("a", {
                    href: "/member/" + $props.modelValue.replyUsers[0]
                  }, "@" + vue.toDisplayString($props.modelValue.replyUsers[0]) + "  ", 9, _hoisted_6$5),
                  vue.createElementVNode("span", _hoisted_7$4, "#" + vue.toDisplayString($props.modelValue.replyFloor), 1),
                  _hoisted_8$4
                ]),
                $data.expandWrong ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_9$4, [
                  vue.createTextVNode(" 这条回复似乎有点问题，指定的楼层号与@的人对应不上 "),
                  _hoisted_10$3,
                  vue.createTextVNode(" 原因可能有下面几种： "),
                  _hoisted_11$3,
                  vue.createTextVNode(" 一、屏蔽用户导致楼层塌陷：你屏蔽了A，自A以后的回复的楼层号都会减1 "),
                  _hoisted_12$3,
                  vue.createTextVNode(" 二、忽略回复导致楼层塌陷：原理同上 "),
                  _hoisted_13$3,
                  vue.createTextVNode(" 三、层主回复时指定错了楼层号（同一，层主屏蔽了别人，导致楼层塌陷） "),
                  _hoisted_14$3,
                  vue.createTextVNode(" 四、脚本解析错误，请在 "),
                  _hoisted_15$3,
                  vue.createTextVNode("反馈 ")
                ])) : vue.createCommentVNode("", true)
              ])) : vue.createCommentVNode("", true),
              $options.config.commentDisplayType === $options.CommentDisplayType.FloorInFloorNoCallUser && this.type !== "top" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                $data.showOrigin ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  onDblclick: _cache[6] || (_cache[6] = (...args) => $options.toggleContent && $options.toggleContent(...args))
                }, [
                  _hoisted_16$3,
                  vue.createVNode(_component_BaseHtmlRender, {
                    class: "reply_content",
                    html: $props.modelValue.reply_content
                  }, null, 8, ["html"]),
                  _hoisted_17$2
                ], 32)) : vue.createCommentVNode("", true),
                vue.createVNode(_component_BaseHtmlRender, {
                  class: "reply_content",
                  onDblclick: $options.toggleContent,
                  html: $props.modelValue.hideCallUserReplyContent
                }, null, 8, ["onDblclick", "html"])
              ], 64)) : (vue.openBlock(), vue.createBlock(_component_BaseHtmlRender, {
                key: 2,
                class: "reply_content",
                html: $props.modelValue.reply_content
              }, null, 8, ["html"])),
              $data.edit ? (vue.openBlock(), vue.createBlock(_component_PostEditor, {
                key: 3,
                onClose: _cache[7] || (_cache[7] = ($event) => $data.edit = false),
                replyInfo: $data.replyInfo,
                replyUser: $props.modelValue.username,
                replyFloor: $props.modelValue.floor
              }, null, 8, ["replyInfo", "replyUser", "replyFloor"])) : vue.createCommentVNode("", true)
            ]),
            vue.createElementVNode("div", _hoisted_18$2, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($props.modelValue.children, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_Comment, {
                  modelValue: $props.modelValue.children[index],
                  "onUpdate:modelValue": ($event) => $props.modelValue.children[index] = $event,
                  key: index
                }, null, 8, ["modelValue", "onUpdate:modelValue"]);
              }), 128))
            ])
          ])
        ]),
        $data.cssStyle ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "more ago",
          onClick: _cache[8] || (_cache[8] = ($event) => $data.expand = !$data.expand)
        }, " 由于嵌套回复层级太深，自动将以上回复移至可见范围 ")) : vue.createCommentVNode("", true)
      ], 4)) : vue.createCommentVNode("", true)
    ], 10, _hoisted_1$9);
  }
  const Comment = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$4], ["__scopeId", "data-v-888958af"]]);
  const _sfc_main$8 = {
    name: "Toolbar",
    components: { BaseLoading },
    inject: [
      "isLogin",
      "post",
      "pageType"
    ],
    data() {
      return {
        timer: null,
        loading: false,
        loading2: false,
        loading3: false
      };
    },
    methods: {
      checkIsLogin(emitName = "") {
        if (!this.isLogin) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请先登录！" });
          return false;
        }
        this.$emit(emitName);
        return true;
      },
      getColor(val) {
        return val ? "#ff4500" : "#929596";
      },
      getIsFull(val) {
        return val ? "#ff4500" : "none";
      },
      tweet() {
        if (!this.checkIsLogin())
          return;
        let username = window.user.username;
        let url = `https://twitter.com/intent/tweet?url=${window.baseUrl}/t/${this.post.id}?r=${username}&related=v2ex&text=${this.post.title}`;
        window.win().open(url, "_blank", "width=550,height=370");
      },
      report() {
        if (!this.checkIsLogin())
          return;
        if (!this.isLogin)
          return;
        if (this.post.isReport)
          return;
        let username = window.user.username;
        let url = `https://twitter.com/share?url=${window.baseUrl}/t/${this.post.id}?r=${username}&amp;related=v2ex&amp;hashtags=apple&amp;text=${this.post.title}`;
        window.win().open(url, "_blank", "width=550,height=370");
      },
      async toggleIgnore() {
        if (!this.checkIsLogin())
          return;
        let url = `${window.baseUrl}/${this.post.isIgnore ? "unignore" : "ignore"}/topic/${this.post.id}?once=${this.post.once}`;
        if (this.pageType === PageType.Post) {
          this.loading2 = true;
          let apiRes = await window.win().fetch(url);
          if (apiRes.redirected) {
            if (!this.post.isIgnore) {
              window.win().location = window.baseUrl;
            }
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isIgnore ? "取消成功" : "忽略成功" });
            eventBus.emit(CMD.MERGE, { isIgnore: !this.post.isIgnore });
          } else {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "忽略失败" });
          }
          this.loading2 = false;
        } else {
          if (this.post.isIgnore) {
            this.loading2 = true;
          } else {
            eventBus.emit(CMD.IGNORE);
          }
          let apiRes = await window.win().fetch(url);
          if (apiRes.redirected) {
            if (this.post.isIgnore) {
              eventBus.emit(CMD.REFRESH_ONCE);
            }
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isIgnore ? "取消成功" : "忽略成功" });
            eventBus.emit(CMD.MERGE, { isIgnore: !this.post.isIgnore });
          } else {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "忽略成功,仅本次有效（接口调用失败！）" });
          }
          this.loading2 = false;
        }
      },
      async toggleFavorite() {
        if (!this.post.isFavorite && config.collectBrowserNotice) {
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "别忘记按Command/Cmd/CTRL + D添加到书签哦" });
        }
        if (!this.checkIsLogin())
          return;
        this.loading = true;
        let url = `${window.baseUrl}/${this.post.isFavorite ? "unfavorite" : "favorite"}/topic/${this.post.id}?once=${this.post.once}`;
        let apiRes = await window.win().fetch(url);
        this.loading = false;
        if (apiRes.redirected) {
          let htmlText = await apiRes.text();
          if (htmlText.search(this.post.isFavorite ? "加入收藏" : "取消收藏")) {
            eventBus.emit(CMD.MERGE, { collectCount: this.post.isFavorite ? this.post.collectCount - 1 : this.post.collectCount + 1 });
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: this.post.isFavorite ? "取消成功" : "收藏成功" });
            eventBus.emit(CMD.REFRESH_ONCE, htmlText);
            eventBus.emit(CMD.MERGE, { isFavorite: !this.post.isFavorite });
            return;
          }
        }
        eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "操作失败" });
      }
    }
  };
  const _withScopeId$7 = (n2) => (vue.pushScopeId("data-v-c98b8c46"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$8 = { class: "toolbar" };
  const _hoisted_2$7 = /* @__PURE__ */ vue.createStaticVNode('<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-c98b8c46><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="#929596" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c98b8c46></path><path d="M23 21H25.0025" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c98b8c46></path><path d="M33.001 21H34.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c98b8c46></path><path d="M13.001 21H14.9999" stroke="#929596" stroke-width="2" stroke-linecap="round" data-v-c98b8c46></path></svg><span data-v-c98b8c46>回复</span>', 2);
  const _hoisted_4$5 = [
    _hoisted_2$7
  ];
  const _hoisted_5$4 = {
    key: 1,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_6$4 = ["fill", "stroke"];
  const _hoisted_7$3 = {
    key: 1,
    class: "tool no-hover"
  };
  const _hoisted_8$3 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M28 6H42V20",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M42 29.4737V39C42 40.6569 40.6569 42 39 42H9C7.34315 42 6 40.6569 6 39V9C6 7.34315 7.34315 6 9 6L18 6",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M25.7998 22.1999L41.0998 6.8999",
      stroke: "#929596",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_9$3 = /* @__PURE__ */ _withScopeId$7(() => /* @__PURE__ */ vue.createElementVNode("span", null, "Tweet", -1));
  const _hoisted_10$2 = [
    _hoisted_8$3,
    _hoisted_9$3
  ];
  const _hoisted_11$2 = {
    key: 1,
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_12$2 = ["fill", "stroke"];
  const _hoisted_13$2 = ["fill", "stroke"];
  const _hoisted_14$2 = ["fill", "stroke"];
  const _hoisted_15$2 = {
    key: 1,
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  };
  const _hoisted_16$2 = /* @__PURE__ */ vue.createStaticVNode('<path d="M36 35H12V21C12 14.3726 17.3726 9 24 9C30.6274 9 36 14.3726 36 21V35Z" fill="#929596" stroke="#929596" stroke-width="4" stroke-linejoin="round" data-v-c98b8c46></path><path d="M8 42H40" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-c98b8c46></path><path d="M4 13L7 14" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-c98b8c46></path><path d="M13 3.9999L14 6.9999" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-c98b8c46></path><path d="M10.0001 9.99989L7.00009 6.99989" stroke="#929596" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" data-v-c98b8c46></path>', 5);
  const _hoisted_21$2 = [
    _hoisted_16$2
  ];
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$8, [
      vue.renderSlot(_ctx.$slots, "default", {}, void 0, true),
      vue.createElementVNode("div", {
        class: "tool",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.checkIsLogin("reply"))
      }, _hoisted_4$5),
      $options.post.once ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 0,
        class: vue.normalizeClass(["tool", { disabled: $data.loading }]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.toggleFavorite && $options.toggleFavorite(...args))
      }, [
        $data.loading ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
          key: 0,
          size: "small"
        })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_5$4, [
          vue.createElementVNode("path", {
            d: "M23.9986 5L17.8856 17.4776L4 19.4911L14.0589 29.3251L11.6544 43L23.9986 36.4192L36.3454 43L33.9586 29.3251L44 19.4911L30.1913 17.4776L23.9986 5Z",
            fill: $options.getIsFull($options.post.isFavorite),
            stroke: $options.getColor($options.post.isFavorite),
            "stroke-width": "2",
            "stroke-linejoin": "round"
          }, null, 8, _hoisted_6$4)
        ])),
        vue.createElementVNode("span", null, vue.toDisplayString($options.post.isFavorite ? "取消收藏" : "加入收藏"), 1)
      ], 2)) : vue.createCommentVNode("", true),
      $options.post.once && $options.post.collectCount !== 0 ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7$3, [
        vue.createElementVNode("span", null, vue.toDisplayString($options.post.collectCount + "人收藏"), 1)
      ])) : vue.createCommentVNode("", true),
      vue.createElementVNode("div", {
        class: "tool",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.tweet && $options.tweet(...args))
      }, _hoisted_10$2),
      $options.post.once ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 2,
        class: vue.normalizeClass(["tool", { "disabled": $data.loading2 }]),
        onClick: _cache[3] || (_cache[3] = (...args) => $options.toggleIgnore && $options.toggleIgnore(...args))
      }, [
        $data.loading2 ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
          key: 0,
          size: "small"
        })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_11$2, [
          vue.createElementVNode("path", {
            fill: $options.getIsFull($options.post.isIgnore),
            stroke: $options.getColor($options.post.isIgnore),
            d: "M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, 8, _hoisted_12$2),
          vue.createElementVNode("path", {
            fill: $options.getIsFull($options.post.isIgnore),
            d: "M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705",
            stroke: $options.getColor($options.post.isIgnore),
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, 8, _hoisted_13$2),
          vue.createElementVNode("path", {
            d: "M42 42L6 6",
            fill: $options.getIsFull($options.post.isIgnore),
            stroke: $options.getColor($options.post.isIgnore),
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, 8, _hoisted_14$2)
        ])),
        vue.createElementVNode("span", null, vue.toDisplayString($options.post.isIgnore ? "取消忽略" : "忽略主题"), 1)
      ], 2)) : vue.createCommentVNode("", true),
      $options.post.once && $options.isLogin && false ? (vue.openBlock(), vue.createElementBlock("div", {
        key: 3,
        class: vue.normalizeClass(["tool", { "disabled": $data.loading3, "no-hover": $options.post.isLogin }]),
        onClick: _cache[4] || (_cache[4] = (...args) => $options.report && $options.report(...args))
      }, [
        $data.loading3 ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, {
          key: 0,
          size: "small"
        })) : (vue.openBlock(), vue.createElementBlock("svg", _hoisted_15$2, _hoisted_21$2)),
        vue.createElementVNode("span", null, vue.toDisplayString($options.post.isReport ? "你已对本主题进行了报告" : "报告这个主题"), 1)
      ], 2)) : vue.createCommentVNode("", true)
    ]);
  }
  const Toolbar = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$3], ["__scopeId", "data-v-c98b8c46"]]);
  const _withScopeId$6 = (n2) => (vue.pushScopeId("data-v-953d8ab1"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$7 = ["href"];
  const _hoisted_2$6 = ["src"];
  const _hoisted_3$5 = { class: "texts" };
  const _hoisted_4$4 = {
    key: 0,
    class: "point"
  };
  const _hoisted_5$3 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
      fill: "#E02A2A",
      stroke: "#E02A2A",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_6$3 = { class: "link-num" };
  const _hoisted_7$2 = { class: "my-tag" };
  const _hoisted_8$2 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_9$2 = {
    key: 2,
    class: "ago"
  };
  const _hoisted_10$1 = {
    key: 3,
    class: "mod"
  };
  const _hoisted_11$1 = {
    key: 4,
    class: "owner"
  };
  const _hoisted_12$1 = ["href"];
  const _hoisted_13$1 = {
    key: 5,
    class: "owner"
  };
  const _hoisted_14$1 = {
    key: 6,
    class: "mod"
  };
  const _hoisted_15$1 = {
    key: 7,
    class: "ago"
  };
  const _hoisted_16$1 = { class: "my-tag" };
  const _hoisted_17$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_18$1 = {
    key: 9,
    class: "point"
  };
  const _hoisted_19$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 48 48",
    fill: "none"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z",
      fill: "#E02A2A",
      stroke: "#E02A2A",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_20$1 = { class: "link-num" };
  const _hoisted_21$1 = ["href"];
  const _hoisted_22$1 = ["src"];
  const _hoisted_23$1 = { class: "Author-right" };
  const _hoisted_24$1 = { class: "floor" };
  const _hoisted_25$1 = /* @__PURE__ */ _withScopeId$6(() => /* @__PURE__ */ vue.createElementVNode("span", null, "跳转", -1));
  const _hoisted_26$1 = [
    _hoisted_25$1
  ];
  const _sfc_main$7 = {
    __name: "SingleComment",
    props: {
      comment: {
        reply_content: ""
      },
      isRight: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    setup(__props) {
      const config2 = vue.inject("config");
      const isLogin = vue.inject("isLogin");
      const tags = vue.inject("tags");
      const props = __props;
      const myTags = vue.computed(() => {
        return tags[props.comment.username] ?? [];
      });
      function jump() {
        eventBus.emit(CMD.JUMP, props.comment.floor);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          class: vue.normalizeClass(["comment", { isSimple: vue.unref(config2).viewType === "simple" }]),
          ref: "comment"
        }, [
          !__props.isRight ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 0,
            class: "avatar",
            href: `/member/${__props.comment.username}`
          }, [
            vue.createElementVNode("img", {
              src: __props.comment.avatar,
              alt: ""
            }, null, 8, _hoisted_2$6)
          ], 8, _hoisted_1$7)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", {
            class: vue.normalizeClass(["comment-body", { isRight: __props.isRight }])
          }, [
            vue.createElementVNode("div", _hoisted_3$5, [
              __props.comment.thankCount && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$4, [
                _hoisted_5$3,
                vue.createElementVNode("div", _hoisted_6$3, vue.toDisplayString(__props.comment.thankCount), 1)
              ])) : vue.createCommentVNode("", true),
              vue.unref(isLogin) && vue.unref(config2).openTag && __props.isRight ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(myTags.value, (i) => {
                return vue.openBlock(), vue.createElementBlock("span", _hoisted_7$2, [
                  _hoisted_8$2,
                  vue.createElementVNode("span", null, vue.toDisplayString(i), 1)
                ]);
              }), 256)) : vue.createCommentVNode("", true),
              __props.isRight ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9$2, vue.toDisplayString(__props.comment.date), 1)) : vue.createCommentVNode("", true),
              __props.comment.isMod && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_10$1, "MOD")) : vue.createCommentVNode("", true),
              __props.comment.isOp && __props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11$1, "OP")) : vue.createCommentVNode("", true),
              vue.createElementVNode("a", {
                href: `/member/${__props.comment.username}`,
                class: "username"
              }, vue.toDisplayString(__props.comment.username), 9, _hoisted_12$1),
              __props.comment.isOp && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_13$1, "OP")) : vue.createCommentVNode("", true),
              __props.comment.isMod && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_14$1, "MOD")) : vue.createCommentVNode("", true),
              !__props.isRight ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_15$1, vue.toDisplayString(__props.comment.date), 1)) : vue.createCommentVNode("", true),
              vue.unref(isLogin) && vue.unref(config2).openTag && !__props.isRight ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 8 }, vue.renderList(myTags.value, (i) => {
                return vue.openBlock(), vue.createElementBlock("span", _hoisted_16$1, [
                  _hoisted_17$1,
                  vue.createElementVNode("span", null, vue.toDisplayString(i), 1)
                ]);
              }), 256)) : vue.createCommentVNode("", true),
              __props.comment.thankCount && !__props.isRight ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_18$1, [
                _hoisted_19$1,
                vue.createElementVNode("div", _hoisted_20$1, vue.toDisplayString(__props.comment.thankCount), 1)
              ])) : vue.createCommentVNode("", true)
            ]),
            vue.createVNode(BaseHtmlRender, {
              class: "reply_content",
              html: __props.comment.reply_content
            }, null, 8, ["html"])
          ], 2),
          __props.isRight ? (vue.openBlock(), vue.createElementBlock("a", {
            key: 1,
            class: "avatar",
            href: `/member/${__props.comment.username}`
          }, [
            vue.createElementVNode("img", {
              src: __props.comment.avatar,
              alt: ""
            }, null, 8, _hoisted_22$1)
          ], 8, _hoisted_21$1)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", _hoisted_23$1, [
            vue.createElementVNode("div", _hoisted_24$1, vue.toDisplayString(__props.comment.floor), 1),
            vue.createElementVNode("div", {
              class: "tool jump",
              onClick: jump
            }, _hoisted_26$1)
          ])
        ], 2);
      };
    }
  };
  const SingleComment = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-953d8ab1"]]);
  function debounce(fn, delay, scope) {
    let timer = null;
    return function() {
      let context = scope || this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, delay);
    };
  }
  const _sfc_main$6 = {
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
    inject: ["allReplyUsers", "post", "isMobile", "tags", "isLogin", "config", "pageType", "isNight"],
    provide() {
      return {
        postDetailWidth: vue.computed(() => this.postDetailWidth)
      };
    },
    props: {
      modelValue: {
        type: Boolean,
        default() {
          return false;
        }
      },
      loading: {
        type: Boolean,
        default() {
          return false;
        }
      },
      refreshLoading: {
        type: Boolean,
        default() {
          return false;
        }
      },
      displayType: CommentDisplayType.FloorInFloorNoCallUser
    },
    data() {
      return {
        isSticky: false,
        selectCallIndex: 0,
        postDetailWidth: 0,
        showCallList: false,
        showRelationReply: false,
        replyText: "",
        callStyle: {
          top: 0,
          left: 0
        },
        targetUser: {
          left: [],
          right: "",
          rightFloor: -1
        },
        debounceScroll: () => {
        },
        read: {
          floor: 0,
          total: 0
        },
        currentFloor: "",
        showOpTag: false
      };
    },
    computed: {
      isMy() {
        return this.post.member.username === window.user.username;
      },
      myTags() {
        return this.tags[this.post.member.username] ?? [];
      },
      CommentDisplayType() {
        return CommentDisplayType;
      },
      isPost() {
        return this.pageType === PageType.Post;
      },
      filterCallList() {
        if (this.showCallList) {
          let list = ["管理员", "所有人"].concat(this.allReplyUsers);
          if (this.replyText)
            return list.filter((i) => i.search(this.replyText) > -1);
          return list;
        }
        return [];
      },
      topReply() {
        return this.post.replyList.filter((v) => v.thankCount >= this.config.topReplyLoveMinCount).sort((a, b) => b.thankCount - a.thankCount).slice(0, this.config.topReplyCount);
      },
      replyList() {
        console.log("this.post.nestedReplies", this.post.nestedReplies);
        if ([CommentDisplayType.FloorInFloor, CommentDisplayType.FloorInFloorNoCallUser].includes(this.displayType))
          return this.post.nestedReplies;
        if (this.displayType === CommentDisplayType.Like) {
          return window.clone(this.post.nestedReplies).sort((a, b) => b.thankCount - a.thankCount);
        }
        if (this.displayType === CommentDisplayType.V2exOrigin)
          return this.post.replyList;
        if (this.displayType === CommentDisplayType.FloorInFloorNested)
          return this.post.nestedRedundReplies;
        if (this.displayType === CommentDisplayType.OnlyOp)
          return this.post.replyList.filter((v) => {
            var _a;
            return v.username === ((_a = this.post.member) == null ? void 0 : _a.username);
          });
        return [];
      },
      //关联回复
      relationReply() {
        if (this.targetUser.left.length && this.targetUser.right) {
          return this.post.replyList.filter((v) => {
            if (this.targetUser.left.includes(v.username)) {
              if (v.floor > this.targetUser.rightFloor) {
                if (v.replyUsers.includes(this.targetUser.right)) {
                  return true;
                }
              } else {
                return true;
              }
            }
            if (v.username === this.targetUser.right) {
              for (let i = 0; i < this.targetUser.left.length; i++) {
                if (v.replyUsers.includes(this.targetUser.left[i])) {
                  return true;
                }
              }
            }
          });
        }
        return [];
      }
    },
    watch: {
      "post.id"(n2, o) {
        if (this.$refs["post-editor"]) {
          this.$refs["post-editor"].content = "";
          vue.nextTick(() => {
            var _a, _b;
            (_b = (_a = this.$refs) == null ? void 0 : _a.detail) == null ? void 0 : _b.scrollTo({ top: 0 });
          });
        }
      },
      "post.headerTemplate"(n2, o) {
        let mountEl = document.querySelector(".main-wrapper .post-wrapper .html-wrapper .header");
        if (mountEl) {
          this.showOpTag = true;
        }
      },
      modelValue: {
        handler(newVal) {
          if (this.isPost) {
            return;
          }
          if (newVal) {
            document.body.style.overflow = "hidden";
            if (!window.history.state) {
              window.history.pushState({}, 0, this.post.url);
            }
            this.read = this.post.read;
            this.currentFloor = "";
            vue.nextTick(() => {
              var _a, _b;
              window.document.title = this.post.title ?? "V2EX";
              (_b = (_a = this.$refs) == null ? void 0 : _a.main) == null ? void 0 : _b.focus();
            });
          } else {
            this.$emit("saveReadList");
            document.body.style.overflow = "unset";
            window.document.title = "V2EX";
            this.isSticky = false;
            this.showRelationReply = false;
            if (window.history.state) {
              window.history.back();
            }
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        var _a;
        this.postDetailWidth = ((_a = this.$refs.mainWrapper) == null ? void 0 : _a.getBoundingClientRect().width) || 0;
      });
      this.debounceScroll = debounce(this.scroll, 300, false);
      if (this.isLogin) {
        const observer = new IntersectionObserver(
          ([e2]) => e2.target.toggleAttribute("stuck", e2.intersectionRatio < 1),
          { threshold: [1] }
        );
        observer.observe(this.$refs.replyBox);
        window.addEventListener("keydown", this.onKeyDown);
      }
      eventBus.on(CMD.SHOW_CALL, (val) => {
        if (val.show) {
          this.showCallList = true;
          this.replyText = val.text;
          if (this.isPost) {
            this.callStyle.top = val.top + $(window.win()).scrollTop() + -40 + "px";
          } else {
            this.callStyle.top = val.top + $(".post-detail").scrollTop() + 15 + "px";
          }
          this.callStyle.left = val.left - $(".main")[0].getBoundingClientRect().left + 10 + "px";
          if (this.selectCallIndex >= this.filterCallList.length) {
            this.selectCallIndex = 0;
          }
        } else {
          this.replyText = "";
          this.showCallList = false;
          this.selectCallIndex = 0;
        }
      });
      eventBus.on(CMD.RELATION_REPLY, (val) => {
        this.targetUser = val;
        this.showRelationReply = true;
      });
      eventBus.on(CMD.JUMP, this.jump);
      if (this.isPost) {
        window.addEventListener("scroll", this.debounceScroll);
      }
    },
    beforeUnmount() {
      window.removeEventListener("keydown", this.onKeyDown);
      eventBus.off(CMD.SHOW_CALL);
    },
    methods: {
      addTag() {
        eventBus.emit(CMD.ADD_TAG, this.post.member.username);
      },
      removeTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: this.post.member.username, tag });
      },
      scroll() {
        if (!this.config.rememberLastReadFloor)
          return;
        let height = window.innerHeight * 0.3;
        let comments = $(".comments  .comment");
        let forCount = 0;
        for (let i = 0; i < comments.length; i++) {
          forCount++;
          let ins = comments[i];
          let rect = ins.getBoundingClientRect();
          if (rect.top > height) {
            let lastReadFloor = Number(ins.dataset["floor"]);
            console.log("当前阅读楼层", lastReadFloor);
            eventBus.emit(CMD.ADD_READ, {
              floor: lastReadFloor > 3 ? lastReadFloor : 0,
              total: this.post.replyList.length
            });
            if (lastReadFloor > 3) {
              this.read.floor = 0;
            }
            break;
          }
        }
        if (forCount === comments.length) {
          console.log("看到最后了");
          eventBus.emit(CMD.ADD_READ, {
            floor: forCount,
            total: this.post.replyList.length
          });
        }
      },
      stop(e2) {
      },
      jump(floor) {
        let lastItem = this.replyList[this.replyList.length - 1];
        if (floor === "") {
          floor = lastItem.floor;
        } else {
          try {
            floor = Number(floor);
          } catch (e2) {
            floor = lastItem.floor;
          }
          if (floor === 0) {
            floor = 1;
          }
          if (floor > lastItem.floor)
            floor = lastItem.floor;
        }
        if (!this.post.replyList.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "没有回复可跳转！" });
          this.read.floor = 0;
          return;
        }
        if (floor > this.post.replyList.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有找到对应回复！" });
          this.read.floor = 0;
          return;
        }
        let comment = $(`.c_${floor}`);
        if (!comment.length) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有找到对应回复！" });
          this.read.floor = 0;
          return;
        }
        comment[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        comment.addClass("ding");
        this.read.floor = 0;
        this.currentFloor = floor + 1;
        setTimeout(() => {
          comment.removeClass("ding");
        }, 2e3);
      },
      jumpLastRead(floor) {
        if (this.config.autoJumpLastReadFloor) {
          if (!floor)
            return;
          setTimeout(() => {
            console.log("上次跳转", floor);
            this.jump(floor);
            eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "已跳转到上次阅读位置" });
          }, 300);
        }
      },
      collapseTopReplyList() {
        $(this.$refs.topReply).slideToggle("fast");
      },
      goBottom() {
        this.isSticky = false;
        setTimeout(() => {
          if (this.isPost) {
            let body = $("body , html");
            let scrollHeight = body.prop("scrollHeight");
            body.animate({ scrollTop: scrollHeight - 850 }, 300);
          } else {
            this.$refs.detail.scrollTo({ top: this.$refs.detail.scrollHeight, behavior: "smooth" });
          }
        });
      },
      close(from) {
        if (this.isPost)
          return;
        if (from === "space") {
          if (this.config.closePostDetailBySpace) {
            this.$emit("update:modelValue", false);
          }
        } else {
          this.$emit("update:modelValue", false);
        }
      },
      setCall(e2) {
        eventBus.emit(CMD.SET_CALL, e2);
        this.showCallList = false;
      },
      onKeyDown(e2) {
        if (!this.modelValue)
          return;
        if (!this.showCallList)
          return;
        let length = this.filterCallList.slice(0, 10).length;
        if (e2.keyCode === 13) {
          this.setCall(this.filterCallList[this.selectCallIndex]);
          e2.preventDefault();
        }
        if (e2.keyCode === 38) {
          this.selectCallIndex--;
          if (this.selectCallIndex < 0) {
            this.selectCallIndex = length - 1;
          }
          e2.preventDefault();
        }
        if (e2.keyCode === 40) {
          this.selectCallIndex++;
          if (this.selectCallIndex > length - 1) {
            this.selectCallIndex = 0;
          }
          e2.preventDefault();
        }
      },
      changeOption(item) {
        this.$emit("update:displayType", item);
      },
      addThank() {
        eventBus.emit(CMD.CHANGE_POST_THANK, { id: this.post.id, type: "add" });
      },
      recallThank() {
        eventBus.emit(CMD.CHANGE_POST_THANK, { id: this.post.id, type: "recall" });
      },
      scrollTop() {
        if (this.isPost) {
          $("body , html").animate({ scrollTop: 0 }, 300);
        } else {
          this.$refs.detail.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };
  const _withScopeId$5 = (n2) => (vue.pushScopeId("data-v-7f8ab1e3"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$6 = { class: "my-box post-wrapper" };
  const _hoisted_2$5 = { class: "header" };
  const _hoisted_3$4 = { class: "fr" };
  const _hoisted_4$3 = ["href"];
  const _hoisted_5$2 = ["src", "alt"];
  const _hoisted_6$2 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("a", { href: "/" }, "V2EX", -1));
  const _hoisted_7$1 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "chevron" }, "  ›  ", -1));
  const _hoisted_8$1 = ["href"];
  const _hoisted_9$1 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "sep10" }, null, -1));
  const _hoisted_10 = ["id"];
  const _hoisted_11 = ["onclick"];
  const _hoisted_12 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("li", { class: "fa fa-chevron-up" }, null, -1));
  const _hoisted_13 = ["onclick"];
  const _hoisted_14 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("li", { class: "fa fa-chevron-down" }, null, -1));
  const _hoisted_15 = [
    _hoisted_14
  ];
  const _hoisted_16 = { class: "gray" };
  const _hoisted_17 = ["href"];
  const _hoisted_18 = ["title"];
  const _hoisted_19 = ["href"];
  const _hoisted_20 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("li", { class: "fa fa-info-circle" }, null, -1));
  const _hoisted_21 = [
    _hoisted_20
  ];
  const _hoisted_22 = ["href"];
  const _hoisted_23 = { class: "my-tag" };
  const _hoisted_24 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_25 = ["onClick"];
  const _hoisted_26 = {
    key: 0,
    class: "my-box"
  };
  const _hoisted_27 = { class: "my-cell flex" };
  const _hoisted_28 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "" }, "高赞回复", -1));
  const _hoisted_29 = { class: "top-reply" };
  const _hoisted_30 = { ref: "topReply" };
  const _hoisted_31 = {
    key: 1,
    class: "my-box my-cell"
  };
  const _hoisted_32 = ["innerHTML"];
  const _hoisted_33 = { class: "my-box comment-wrapper" };
  const _hoisted_34 = {
    key: 0,
    class: "my-cell flex"
  };
  const _hoisted_35 = { class: "radio-group2" };
  const _hoisted_36 = {
    key: 0,
    class: "read-notice"
  };
  const _hoisted_37 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", null, "上次打开：", -1));
  const _hoisted_38 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-long-arrow-down" }, null, -1));
  const _hoisted_39 = [
    _hoisted_38
  ];
  const _hoisted_40 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-long-arrow-down" }, null, -1));
  const _hoisted_41 = [
    _hoisted_40
  ];
  const _hoisted_42 = { class: "my-cell flex" };
  const _hoisted_43 = { key: 0 };
  const _hoisted_44 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("strong", { class: "snow" }, "•", -1));
  const _hoisted_45 = ["innerHTML"];
  const _hoisted_46 = {
    key: 0,
    class: "loading-wrapper"
  };
  const _hoisted_47 = {
    key: 1,
    class: "comments"
  };
  const _hoisted_48 = {
    key: 2,
    id: "no-comments-yet"
  };
  const _hoisted_49 = { class: "my-cell flex" };
  const _hoisted_50 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", null, "添加一条新回复", -1));
  const _hoisted_51 = { class: "notice-right gray" };
  const _hoisted_52 = { class: "p1" };
  const _hoisted_53 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("span", { class: "gray" }, "上下文", -1));
  const _hoisted_54 = { class: "top-reply" };
  const _hoisted_55 = ["onClick"];
  const _hoisted_56 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", {
    class: "fa fa-times",
    "aria-hidden": "true"
  }, null, -1));
  const _hoisted_57 = [
    _hoisted_56
  ];
  const _hoisted_58 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", {
    class: "fa fa-long-arrow-up",
    "aria-hidden": "true"
  }, null, -1));
  const _hoisted_59 = [
    _hoisted_58
  ];
  const _hoisted_60 = {
    key: 1,
    class: "fa fa-refresh",
    "aria-hidden": "true"
  };
  const _hoisted_61 = /* @__PURE__ */ _withScopeId$5(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-long-arrow-down" }, null, -1));
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_BaseHtmlRender = vue.resolveComponent("BaseHtmlRender");
    const _component_Point = vue.resolveComponent("Point");
    const _component_Toolbar = vue.resolveComponent("Toolbar");
    const _component_Tooltip = vue.resolveComponent("Tooltip");
    const _component_Comment = vue.resolveComponent("Comment");
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    const _component_PostEditor = vue.resolveComponent("PostEditor");
    const _component_SingleComment = vue.resolveComponent("SingleComment");
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["post-detail", [$options.isNight ? "isNight" : "", $options.pageType, $options.isMobile ? "mobile" : ""]]),
      ref: "detail",
      onKeydown: _cache[26] || (_cache[26] = vue.withKeys(($event) => $options.close(), ["esc"])),
      onScroll: _cache[27] || (_cache[27] = (...args) => $data.debounceScroll && $data.debounceScroll(...args)),
      onClick: _cache[28] || (_cache[28] = ($event) => $options.close("space"))
    }, [
      vue.createElementVNode("div", {
        ref: "main",
        class: "main",
        tabindex: "1",
        onClick: _cache[25] || (_cache[25] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
      }, [
        vue.createElementVNode("div", {
          class: "main-wrapper",
          ref: "mainWrapper",
          style: vue.normalizeStyle({ width: $options.config.postWidth })
        }, [
          vue.createElementVNode("div", _hoisted_1$6, [
            vue.createElementVNode("div", _hoisted_2$5, [
              vue.createElementVNode("div", _hoisted_3$4, [
                $options.post.member.avatar_large ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  href: `/member/${$options.post.member.username}`
                }, [
                  vue.createElementVNode("img", {
                    src: $options.post.member.avatar_large,
                    class: "avatar",
                    style: { "width": "73px", "height": "73px" },
                    border: "0",
                    align: "default",
                    alt: $options.post.member.username
                  }, null, 8, _hoisted_5$2)
                ], 8, _hoisted_4$3)) : vue.createCommentVNode("", true)
              ]),
              _hoisted_6$2,
              _hoisted_7$1,
              vue.createElementVNode("a", {
                href: $options.post.node.url
              }, vue.toDisplayString($options.post.node.title), 9, _hoisted_8$1),
              _hoisted_9$1,
              vue.createElementVNode("h1", null, vue.toDisplayString($options.post.title), 1),
              !$options.isMobile ? (vue.openBlock(), vue.createElementBlock("div", {
                key: 0,
                id: `topic_${$options.post.id}_votes`,
                class: "votes"
              }, [
                vue.createElementVNode("a", {
                  href: "javascript:",
                  onclick: `upVoteTopic(${$options.post.id});`,
                  class: "vote"
                }, [
                  _hoisted_12,
                  vue.createTextVNode("   ")
                ], 8, _hoisted_11),
                vue.createTextVNode("   "),
                vue.createElementVNode("a", {
                  href: "javascript:",
                  onclick: `downVoteTopic(${$options.post.id});`,
                  class: "vote"
                }, _hoisted_15, 8, _hoisted_13)
              ], 8, _hoisted_10)) : vue.createCommentVNode("", true),
              vue.createTextVNode("   "),
              vue.createElementVNode("small", _hoisted_16, [
                vue.createElementVNode("a", {
                  href: `/member/${$options.post.member.username}`
                }, vue.toDisplayString($options.post.member.username), 9, _hoisted_17),
                vue.createTextVNode(" · "),
                $options.post.member.createDate ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass($options.post.member.isNew && "danger")
                  }, vue.toDisplayString($options.post.member.createDate), 3),
                  vue.createTextVNode(" · ")
                ], 64)) : vue.createCommentVNode("", true),
                $options.post.createDateAgo ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                  vue.createElementVNode("span", {
                    title: $options.post.createDate
                  }, vue.toDisplayString($options.post.createDateAgo), 9, _hoisted_18),
                  vue.createTextVNode(" · ")
                ], 64)) : vue.createCommentVNode("", true),
                vue.createTextVNode(" " + vue.toDisplayString($options.post.clickCount) + " 次点击 ", 1),
                $options.isMy ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
                  vue.createTextVNode("   "),
                  vue.createElementVNode("a", {
                    href: `/t/${$options.post.id}/info`
                  }, _hoisted_21, 8, _hoisted_19),
                  vue.createTextVNode("   "),
                  vue.createElementVNode("a", {
                    href: `/append/topic/${$options.post.id}`,
                    class: "op"
                  }, "APPEND", 8, _hoisted_22)
                ], 64)) : vue.createCommentVNode("", true)
              ]),
              $options.isLogin && $options.config.openTag ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.myTags, (i) => {
                  return vue.openBlock(), vue.createElementBlock("span", _hoisted_23, [
                    _hoisted_24,
                    vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
                    vue.createElementVNode("i", {
                      class: "fa fa-trash-o remove",
                      onClick: ($event) => $options.removeTag(i)
                    }, null, 8, _hoisted_25)
                  ]);
                }), 256)),
                vue.createElementVNode("span", {
                  class: "add-tag ago",
                  onClick: _cache[0] || (_cache[0] = (...args) => $options.addTag && $options.addTag(...args)),
                  title: "添加标签"
                }, "+")
              ], 64)) : vue.createCommentVNode("", true)
            ]),
            vue.createVNode(_component_BaseHtmlRender, {
              html: $options.post.headerTemplate
            }, null, 8, ["html"]),
            vue.createVNode(_component_Toolbar, {
              onReply: _cache[1] || (_cache[1] = ($event) => $data.isSticky = !$data.isSticky)
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_Point, {
                  onAddThank: $options.addThank,
                  onRecallThank: $options.recallThank,
                  full: false,
                  item: {
                    isThanked: $options.post.isThanked,
                    thankCount: $options.post.thankCount,
                    username: $options.post.username
                  },
                  "api-url": "topic/" + $options.post.id
                }, null, 8, ["onAddThank", "onRecallThank", "item", "api-url"])
              ]),
              _: 1
            })
          ]),
          $options.topReply.length && $options.config.showTopReply ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_26, [
            vue.createElementVNode("div", _hoisted_27, [
              _hoisted_28,
              vue.createElementVNode("div", _hoisted_29, [
                vue.createVNode(_component_Tooltip, { title: "收起高赞回复" }, {
                  default: vue.withCtx(() => [
                    vue.createElementVNode("i", {
                      class: "fa fa-compress",
                      onClick: _cache[2] || (_cache[2] = (...args) => $options.collapseTopReplyList && $options.collapseTopReplyList(...args))
                    })
                  ]),
                  _: 1
                })
              ])
            ]),
            vue.createElementVNode("div", _hoisted_30, [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.topReply, (item, index) => {
                return vue.openBlock(), vue.createBlock(_component_Comment, {
                  key: item.floor,
                  type: "top",
                  modelValue: $options.topReply[index],
                  "onUpdate:modelValue": ($event) => $options.topReply[index] = $event
                }, null, 8, ["modelValue", "onUpdate:modelValue"]);
              }), 128))
            ], 512)
          ])) : vue.createCommentVNode("", true),
          $options.isMobile ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_31, [
            vue.createElementVNode("div", {
              class: "inner",
              innerHTML: $options.post.fr
            }, null, 8, _hoisted_32)
          ])) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", _hoisted_33, [
            $options.post.replyList.length || $props.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
              $options.config.showToolbar ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_34, [
                vue.createElementVNode("div", _hoisted_35, [
                  vue.createVNode(_component_Tooltip, { title: "不隐藏@用户" }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.FloorInFloor ? "active" : ""]),
                        onClick: _cache[3] || (_cache[3] = ($event) => $options.changeOption($options.CommentDisplayType.FloorInFloor))
                      }, "楼中楼(@) ", 2)
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_Tooltip, { title: "隐藏第一个@用户，双击内容可显示原文" }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.FloorInFloorNoCallUser ? "active" : ""]),
                        onClick: _cache[4] || (_cache[4] = ($event) => $options.changeOption($options.CommentDisplayType.FloorInFloorNoCallUser))
                      }, "楼中楼 ", 2)
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_Tooltip, { title: "重复显示楼中楼的回复" }, {
                    default: vue.withCtx(() => [
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.FloorInFloorNested ? "active" : ""]),
                        onClick: _cache[5] || (_cache[5] = ($event) => $options.changeOption($options.CommentDisplayType.FloorInFloorNested))
                      }, "冗余楼中楼 ", 2)
                    ]),
                    _: 1
                  }),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.Like ? "active" : ""]),
                    onClick: _cache[6] || (_cache[6] = ($event) => $options.changeOption($options.CommentDisplayType.Like))
                  }, "感谢 ", 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.OnlyOp ? "active" : ""]),
                    onClick: _cache[7] || (_cache[7] = ($event) => $options.changeOption($options.CommentDisplayType.OnlyOp))
                  }, "只看楼主 ", 2),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(["radio", $props.displayType === $options.CommentDisplayType.V2exOrigin ? "active" : ""]),
                    onClick: _cache[8] || (_cache[8] = ($event) => $options.changeOption($options.CommentDisplayType.V2exOrigin))
                  }, "V2原版 ", 2)
                ]),
                $data.read.floor || $data.read.total ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_36, [
                  _hoisted_37,
                  $data.read.floor ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    vue.createElementVNode("span", null, [
                      vue.createTextVNode("阅读到"),
                      vue.createElementVNode("b", null, vue.toDisplayString($data.read.floor), 1),
                      vue.createTextVNode("楼")
                    ]),
                    vue.createElementVNode("div", {
                      class: "jump jump1",
                      onClick: _cache[9] || (_cache[9] = ($event) => $options.jump($data.read.floor))
                    }, _hoisted_39)
                  ], 64)) : vue.createCommentVNode("", true),
                  vue.createElementVNode("span", null, [
                    vue.createTextVNode("总楼层"),
                    vue.createElementVNode("b", null, vue.toDisplayString($data.read.total), 1)
                  ]),
                  vue.createElementVNode("div", {
                    class: "jump",
                    onClick: _cache[10] || (_cache[10] = ($event) => $options.jump($data.read.total))
                  }, _hoisted_41)
                ])) : vue.createCommentVNode("", true)
              ])) : vue.createCommentVNode("", true),
              vue.createElementVNode("div", _hoisted_42, [
                vue.createElementVNode("span", null, [
                  vue.createTextVNode(vue.toDisplayString($options.post.replyCount) + " 条回复 ", 1),
                  $options.post.createDate ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_43, [
                    vue.createTextVNode("  "),
                    _hoisted_44,
                    vue.createTextVNode("  " + vue.toDisplayString($options.post.createDate), 1)
                  ])) : vue.createCommentVNode("", true)
                ]),
                !$options.isMobile ? (vue.openBlock(), vue.createElementBlock("div", {
                  key: 0,
                  class: "fr",
                  innerHTML: $options.post.fr
                }, null, 8, _hoisted_45)) : vue.createCommentVNode("", true)
              ])
            ], 64)) : vue.createCommentVNode("", true),
            $options.replyList.length || $props.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
              $props.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_46, [
                vue.createVNode(_component_BaseLoading, { size: "large" })
              ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_47, [
                $props.modelValue ? (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 0 }, vue.renderList($options.replyList, (item, index) => {
                  return vue.openBlock(), vue.createBlock(_component_Comment, {
                    key: item.floor,
                    modelValue: $options.replyList[index],
                    "onUpdate:modelValue": ($event) => $options.replyList[index] = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]);
                }), 128)) : vue.createCommentVNode("", true)
              ]))
            ], 64)) : vue.createCommentVNode("", true)
          ]),
          !($options.replyList.length || $props.loading) ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_48, "目前尚无回复")) : vue.createCommentVNode("", true),
          $options.isLogin ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 3,
            class: vue.normalizeClass(["my-box", { "sticky": $data.isSticky }]),
            ref: "replyBox"
          }, [
            vue.createElementVNode("div", _hoisted_49, [
              _hoisted_50,
              vue.createElementVNode("div", _hoisted_51, [
                $data.isSticky ? (vue.openBlock(), vue.createElementBlock("a", {
                  key: 0,
                  style: { "margin-right": "2rem" },
                  onClick: _cache[11] || (_cache[11] = ($event) => $data.isSticky = false)
                }, "取消回复框停靠")) : vue.createCommentVNode("", true),
                vue.createElementVNode("a", {
                  onClick: _cache[12] || (_cache[12] = (...args) => $options.scrollTop && $options.scrollTop(...args))
                }, "回到顶部")
              ])
            ]),
            vue.createElementVNode("div", _hoisted_52, [
              vue.createVNode(_component_PostEditor, {
                onClose: $options.goBottom,
                ref: "post-editor",
                useType: "reply-post",
                onClick: _cache[13] || (_cache[13] = ($event) => $data.isSticky = true)
              }, null, 8, ["onClose"])
            ])
          ], 2)) : vue.createCommentVNode("", true)
        ], 4),
        $data.showRelationReply ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: "relationReply",
          onClick: _cache[17] || (_cache[17] = ($event) => $options.close("space"))
        }, [
          vue.createElementVNode("div", {
            class: "my-cell flex",
            onClick: _cache[15] || (_cache[15] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
          }, [
            _hoisted_53,
            vue.createElementVNode("div", _hoisted_54, [
              vue.createElementVNode("i", {
                class: "fa fa-times",
                onClick: _cache[14] || (_cache[14] = ($event) => $data.showRelationReply = false)
              })
            ])
          ]),
          vue.createElementVNode("div", {
            class: "comments",
            onClick: _cache[16] || (_cache[16] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"]))
          }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.relationReply, (item, index) => {
              return vue.openBlock(), vue.createBlock(_component_SingleComment, {
                "is-right": item.username === $data.targetUser.right,
                key: item.floor,
                comment: item
              }, null, 8, ["is-right", "comment"]);
            }), 128))
          ])
        ])) : vue.createCommentVNode("", true),
        $data.showCallList && $options.filterCallList.length ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          class: "call-list",
          style: vue.normalizeStyle($data.callStyle)
        }, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.filterCallList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              class: vue.normalizeClass(["call-item", { select: index === $data.selectCallIndex }]),
              onClick: ($event) => $options.setCall(item)
            }, [
              vue.createElementVNode("a", null, vue.toDisplayString(item), 1)
            ], 10, _hoisted_55);
          }), 256))
        ], 4)) : vue.createCommentVNode("", true),
        vue.createElementVNode("div", {
          class: "close-btn",
          onClick: _cache[18] || (_cache[18] = ($event) => $options.close("btn"))
        }, _hoisted_57),
        vue.createElementVNode("div", {
          class: "scroll-top gray",
          onClick: _cache[19] || (_cache[19] = vue.withModifiers((...args) => $options.scrollTop && $options.scrollTop(...args), ["stop"]))
        }, _hoisted_59),
        vue.createElementVNode("div", {
          class: "refresh gray",
          onClick: _cache[20] || (_cache[20] = vue.withModifiers(($event) => _ctx.$emit("refresh"), ["stop"]))
        }, [
          $props.refreshLoading ? (vue.openBlock(), vue.createBlock(_component_BaseLoading, { key: 0 })) : (vue.openBlock(), vue.createElementBlock("i", _hoisted_60))
        ]),
        vue.createElementVNode("div", {
          class: "scroll-to gray",
          onClick: _cache[24] || (_cache[24] = vue.withModifiers(($event) => $options.jump($data.currentFloor), ["stop"]))
        }, [
          _hoisted_61,
          vue.withDirectives(vue.createElementVNode("input", {
            type: "text",
            "onUpdate:modelValue": _cache[21] || (_cache[21] = ($event) => $data.currentFloor = $event),
            onClick: _cache[22] || (_cache[22] = vue.withModifiers((...args) => $options.stop && $options.stop(...args), ["stop"])),
            onKeydown: _cache[23] || (_cache[23] = vue.withKeys(($event) => $options.jump($data.currentFloor), ["enter"]))
          }, null, 544), [
            [vue.vModelText, $data.currentFloor]
          ])
        ])
      ], 512)
    ], 34)), [
      [vue.vShow, $props.modelValue]
    ]);
  }
  const PostDetail = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$2], ["__scopeId", "data-v-7f8ab1e3"]]);
  const _withScopeId$4 = (n2) => (vue.pushScopeId("data-v-618144eb"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$5 = /* @__PURE__ */ _withScopeId$4(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M17 32L19.1875 27M31 32L28.8125 27M19.1875 27L24 16L28.8125 27M19.1875 27H28.8125",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M43.1999 20C41.3468 10.871 33.2758 4 23.5999 4C13.9241 4 5.85308 10.871 4 20L10 18",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M4 28C5.85308 37.129 13.9241 44 23.5999 44C33.2758 44 41.3468 37.129 43.1999 28L38 30",
      stroke: "#929596",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_2$4 = { key: 1 };
  const _sfc_main$5 = {
    __name: "Base64Tooltip",
    setup(__props) {
      const tooltip = vue.ref(null);
      const show = vue.ref(false);
      const originalText = vue.ref("");
      const decodeText = vue.ref("");
      const styleObject = vue.reactive({
        left: "-100vw",
        top: "-100vh"
      });
      vue.onMounted(() => {
        eventBus.on(CMD.SHOW_TOOLTIP, ({ text, e: e2 }) => {
          setTimeout(() => show.value = true);
          originalText.value = text;
          decodeText.value = "";
          styleObject.left = e2.clientX + "px";
          styleObject.top = e2.clientY + 20 + "px";
        });
        window.addEventListener("click", (e2) => {
          if (!tooltip.value)
            return;
          if (!tooltip.value.contains(e2.target) && show.value) {
            show.value = false;
          }
        }, { capture: true });
        const fn = () => show.value && (show.value = false);
        $(".post-detail", window.win().doc).on("scroll", fn);
      });
      function copy() {
        if (window.win().navigator.clipboard) {
          window.win().navigator.clipboard.writeText(decodeText.value);
          eventBus.emit(CMD.SHOW_MSG, { type: "success", text: "复制成功" });
        } else {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "复制失败！浏览器不支持！" });
        }
      }
      function base64ToArrayBuffer(base64) {
        let binary_string = window.atob(base64);
        let len = binary_string.length;
        let bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
      }
      function decode() {
        try {
          new Blob([base64ToArrayBuffer(originalText.value)]).text().then((r2) => {
            decodeText.value = r2;
          });
        } catch (e2) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "Base64解码失败！不是标准数据！" });
        }
      }
      return (_ctx, _cache) => {
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          class: "base64_tooltip",
          style: vue.normalizeStyle(styleObject),
          onClick: decode,
          ref_key: "tooltip",
          ref: tooltip
        }, [
          !decodeText.value ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createTextVNode(" Base64解码：" + vue.toDisplayString(originalText.value) + " ", 1),
            _hoisted_1$5
          ], 64)) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$4, [
            vue.createElementVNode("span", null, vue.toDisplayString(decodeText.value), 1),
            vue.createVNode(BaseButton, {
              class: "btn",
              size: "small",
              onClick: copy
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("点击复制")
              ]),
              _: 1
            })
          ]))
        ], 4)), [
          [vue.vShow, show.value]
        ]);
      };
    }
  };
  const Base64Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-618144eb"]]);
  const _sfc_main$4 = {
    name: "Msg",
    props: {
      type: "",
      text: ""
    },
    created() {
      setTimeout(() => {
        this.$emit("close");
      }, 3e3);
    }
  };
  const _withScopeId$3 = (n2) => (vue.pushScopeId("data-v-defce7f2"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$4 = /* @__PURE__ */ _withScopeId$3(() => /* @__PURE__ */ vue.createElementVNode("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 48 48",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, [
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M14 14L34 34",
      stroke: "#ffffff",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    /* @__PURE__ */ vue.createElementVNode("path", {
      d: "M14 34L34 14",
      stroke: "#ffffff",
      "stroke-width": "4",
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ], -1));
  const _hoisted_2$3 = [
    _hoisted_1$4
  ];
  const _hoisted_3$3 = { class: "right" };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["msg", $props.type])
    }, [
      vue.createElementVNode("div", {
        class: "left",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("close"))
      }, _hoisted_2$3),
      vue.createElementVNode("div", _hoisted_3$3, vue.toDisplayString($props.text), 1)
    ], 2);
  }
  const Msg = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$1], ["__scopeId", "data-v-defce7f2"]]);
  const _withScopeId$2 = (n2) => (vue.pushScopeId("data-v-674b86aa"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$3 = {
    key: 0,
    class: "tag-modal modal"
  };
  const _hoisted_2$2 = { class: "wrapper" };
  const _hoisted_3$2 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 添加标签 ", -1));
  const _hoisted_4$2 = { class: "option" };
  const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$2(() => /* @__PURE__ */ vue.createElementVNode("span", null, "用户：", -1));
  const _hoisted_6$1 = { class: "btns" };
  const _sfc_main$3 = {
    __name: "TagModal",
    props: ["tags"],
    emits: ["update:tags"],
    setup(__props, { emit: __emit }) {
      const tagModal = vue.reactive({
        show: false,
        currentUsername: "",
        tag: ""
      });
      const props = __props;
      const emit = __emit;
      const inputRef = vue.ref();
      vue.onMounted(() => {
        eventBus.on(CMD.ADD_TAG, (username) => {
          tagModal.currentUsername = username;
          tagModal.show = true;
          vue.nextTick(() => {
            inputRef.value.focus();
          });
        });
      });
      async function addTag() {
        if (!tagModal.tag) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "请输入标签" });
          return;
        }
        let oldTag = window.clone(props.tags);
        let tempTag = window.clone(props.tags);
        let userTags = tempTag[tagModal.currentUsername] ?? [];
        let rIndex = userTags.findIndex((v) => v === tagModal.tag);
        if (rIndex > -1) {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "标签已存在！" });
          return;
        } else {
          userTags.push(tagModal.tag);
        }
        tempTag[tagModal.currentUsername] = userTags;
        emit("update:tags", tempTag);
        tagModal.tag = "";
        tagModal.show = false;
        let res = await window.parse.saveTags(tempTag);
        if (!res) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "标签添加失败！" });
          emit("update:tags", oldTag);
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, null, {
          default: vue.withCtx(() => [
            tagModal.show ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
              vue.createElementVNode("div", {
                class: "mask",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers(($event) => tagModal.show = false, ["stop"]))
              }),
              vue.createElementVNode("div", _hoisted_2$2, [
                _hoisted_3$2,
                vue.createElementVNode("div", _hoisted_4$2, [
                  _hoisted_5$1,
                  vue.createElementVNode("div", null, [
                    vue.createElementVNode("b", null, vue.toDisplayString(tagModal.currentUsername), 1)
                  ])
                ]),
                vue.withDirectives(vue.createElementVNode("input", {
                  type: "text",
                  ref_key: "inputRef",
                  ref: inputRef,
                  style: { "width": "100%" },
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => tagModal.tag = $event),
                  onKeydown: vue.withKeys(addTag, ["enter"])
                }, null, 544), [
                  [vue.vModelText, tagModal.tag]
                ]),
                vue.createElementVNode("div", _hoisted_6$1, [
                  vue.createVNode(BaseButton, {
                    type: "link",
                    onClick: _cache[2] || (_cache[2] = ($event) => tagModal.show = false)
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("取消")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(BaseButton, { onClick: addTag }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("确定")
                    ]),
                    _: 1
                  })
                ])
              ])
            ])) : vue.createCommentVNode("", true)
          ]),
          _: 1
        });
      };
    }
  };
  const TagModal = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-674b86aa"]]);
  const _hoisted_1$2 = { class: "msgs" };
  const _sfc_main$2 = {
    __name: "MsgModal",
    setup(__props) {
      const msgList = vue.reactive([
        // {type: 'success', text: '123', id: Date.now()}
      ]);
      vue.onMounted(() => {
        eventBus.on(CMD.SHOW_MSG, (val) => {
          msgList.push({ ...val, id: Date.now() });
        });
      });
      function removeMsg(id) {
        let rIndex = msgList.findIndex((item) => item.id === id);
        if (rIndex > -1) {
          msgList.splice(rIndex, 1);
        }
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(msgList, (v) => {
            return vue.openBlock(), vue.createBlock(Msg, {
              key: v.id,
              type: v.type,
              text: v.text,
              onClose: ($event) => removeMsg(v.id)
            }, null, 8, ["type", "text", "onClose"]);
          }), 128))
        ]);
      };
    }
  };
  const MsgModal = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b73f4332"]]);
  let u = ".__cf_email__", f = "data-cfemail", d = document.createElement("div");
  function e(e2) {
    console.error(e2);
  }
  function r(e2, t) {
    let r2 = e2.substr(t, 2);
    return parseInt(r2, 16);
  }
  function n(href, index) {
    let o = "", a = r(href, index);
    for (let i = index + 2; i < href.length; i += 2) {
      let l = r(href, i) ^ a;
      o += String.fromCharCode(l);
    }
    try {
      o = decodeURIComponent(escape(o));
    } catch (u2) {
      e(u2);
    }
    d.innerHTML = '<a href="' + o.replace(/"/g, "&quot;") + '"></a>';
    return d.childNodes[0].getAttribute("href") || "";
  }
  function decodeEmail(body) {
    try {
      let as = body.find(u);
      as.each(function() {
        try {
          let o = this, a = o.parentNode, i = o.getAttribute(f);
          if (i) {
            let l = n(i, 0), d2 = document.createTextNode(l);
            a.replaceChild(d2, o);
          }
        } catch (h) {
          e(h);
        }
      });
    } catch (s) {
      e(s);
    }
  }
  const _withScopeId$1 = (n2) => (vue.pushScopeId("data-v-882b932b"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1$1 = {
    key: 0,
    class: "tag-modal modal"
  };
  const _hoisted_2$1 = { class: "modal-root" };
  const _hoisted_3$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ vue.createElementVNode("div", { class: "title" }, " 提醒系统 ", -1));
  const _hoisted_4$1 = ["innerHTML"];
  const _sfc_main$1 = {
    __name: "NotificationModal",
    props: ["modelValue", "h"],
    emits: ["update:modelValue"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      vue.onMounted(() => {
      });
      function close() {
        emit("update:modelValue", false);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.Transition, null, {
          default: vue.withCtx(() => [
            __props.modelValue ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
              vue.createElementVNode("div", {
                class: "mask",
                onClick: vue.withModifiers(close, ["stop"])
              }),
              vue.createElementVNode("div", _hoisted_2$1, [
                vue.createElementVNode("div", { class: "modal-header" }, [
                  _hoisted_3$1,
                  vue.createElementVNode("i", {
                    class: "fa fa-times",
                    onClick: close
                  })
                ]),
                vue.createElementVNode("div", {
                  innerHTML: __props.h,
                  class: "modal-body"
                }, null, 8, _hoisted_4$1)
              ])
            ])) : vue.createCommentVNode("", true)
          ]),
          _: 1
        });
      };
    }
  };
  const NotificationModal = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-882b932b"]]);
  var _GM_notification = /* @__PURE__ */ (() => typeof GM_notification != "undefined" ? GM_notification : void 0)();
  var _GM_openInTab = /* @__PURE__ */ (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
  var _GM_registerMenuCommand = /* @__PURE__ */ (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
  const DefaultPost = {
    allReplyUsers: [],
    content_rendered: "",
    createDate: "",
    createDateAgo: "",
    fr: "",
    replyList: [],
    nestedReplies: [],
    nestedRedundReplies: [],
    username: "",
    url: "",
    member: {},
    node: {
      title: "",
      url: ""
    },
    headerTemplate: "",
    title: "",
    id: "",
    type: "post",
    once: "",
    replyCount: 0,
    clickCount: 0,
    thankCount: 0,
    collectCount: 0,
    lastReadFloor: 0,
    isFavorite: false,
    isIgnore: false,
    isThanked: false,
    isReport: false,
    inList: false
  };
  const DefaultUser = {
    tagPrefix: "--用户标签--",
    tags: {},
    tagsId: "",
    username: "",
    avatar: "",
    readPrefix: "--已读楼层--",
    readNoteItemId: "",
    readList: {},
    imgurPrefix: "--imgur图片删除hash--",
    imgurList: {},
    imgurNoteId: ""
  };
  const DefaultConfig = {
    showToolbar: true,
    showPreviewBtn: true,
    autoOpenDetail: true,
    openTag: false,
    //给用户打标签
    clickPostItemOpenDetail: true,
    closePostDetailBySpace: true,
    //点击空白处关闭详情
    contentAutoCollapse: true,
    //正文超长自动折叠
    viewType: "table",
    commentDisplayType: CommentDisplayType.FloorInFloorNoCallUser,
    newTabOpen: false,
    //新标签打开
    base64: true,
    //base功能
    sov2ex: false,
    postWidth: "",
    showTopReply: true,
    topReplyLoveMinCount: 3,
    topReplyCount: 3,
    autoJumpLastReadFloor: false,
    rememberLastReadFloor: false,
    autoSignin: true,
    customBgColor: "",
    version: 1,
    collectBrowserNotice: false,
    fontSizeType: "normal"
  };
  const DefaultVal = {
    pageType: void 0,
    pageData: { pageNo: 1 },
    targetUserName: "",
    currentVersion: 1,
    isNight: false,
    cb: null,
    stopMe: null,
    postList: [],
    git: "https://github.com/zyronon/web-scripts",
    shortGit: "zyronon/web-scripts",
    issue: "https://github.com/zyronon/web-scripts/issues"
  };
  const functions = {
    //获取所有回复
    getAllReply(repliesMap = []) {
      return repliesMap.sort((a, b) => a.i - b.i).reduce((pre, i) => {
        pre = pre.concat(i.replyList);
        return pre;
      }, []);
    },
    //查找子回复
    findChildren(item, endList, all) {
      var _a;
      const fn = (child, endList2, parent) => {
        child.level = parent.level + 1;
        let rIndex = all.findIndex((v) => v.floor === child.floor);
        if (rIndex > -1) {
          all[rIndex].isUse = true;
        }
        parent.children.push(this.findChildren(child, endList2, all));
      };
      item.children = [];
      let floorReplyList = [];
      for (let i = 0; i < endList.length; i++) {
        let currentItem = endList[i];
        if (currentItem.isUse)
          continue;
        if (currentItem.replyFloor === item.floor) {
          if (currentItem.replyUsers.length === 1 && currentItem.replyUsers[0] === item.username) {
            currentItem.isUse = true;
            floorReplyList.push({ endList: endList.slice(i + 1), currentItem });
          } else {
            currentItem.isWrong = true;
          }
        }
      }
      floorReplyList.reverse().map(({ currentItem, endList: endList2 }) => {
        fn(currentItem, endList2, item);
      });
      let nextMeIndex = endList.findIndex((v) => {
        var _a2;
        return v.username === item.username && ((_a2 = v.replyUsers) == null ? void 0 : _a2[0]) !== item.username;
      });
      let findList = nextMeIndex > -1 ? endList.slice(0, nextMeIndex) : endList;
      for (let i = 0; i < findList.length; i++) {
        let currentItem = findList[i];
        if (currentItem.isUse)
          continue;
        if (currentItem.replyUsers.length === 1) {
          if (currentItem.replyFloor !== -1) {
            if (((_a = all[currentItem.replyFloor - 1]) == null ? void 0 : _a.username) === currentItem.replyUsers[0]) {
              continue;
            }
          }
          let endList2 = endList.slice(i + 1);
          if (currentItem.username === item.username) {
            if (currentItem.replyUsers[0] === item.username) {
              fn(currentItem, endList2, item);
            }
            break;
          } else {
            if (currentItem.replyUsers[0] === item.username) {
              fn(currentItem, endList2, item);
            }
          }
        } else {
          if (currentItem.username === item.username)
            break;
        }
      }
      item.children = item.children.sort((a, b) => a.floor - b.floor);
      return item;
    },
    //生成嵌套回复
    createNestedList(allList = []) {
      if (!allList.length)
        return [];
      let list = window.clone(allList);
      let nestedList = [];
      list.map((item, index) => {
        let startList = list.slice(0, index);
        let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
        let endList = list.slice(index + 1);
        if (index === 0) {
          nestedList.push(this.findChildren(item, endList, list));
        } else {
          if (!item.isUse) {
            let isOneLevelReply = false;
            if (item.replyUsers.length) {
              if (item.replyUsers.length > 1) {
                isOneLevelReply = true;
              } else {
                isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
              }
            } else {
              isOneLevelReply = true;
            }
            if (isOneLevelReply) {
              item.level = 0;
              nestedList.push(this.findChildren(item, endList, list));
            }
          }
        }
      });
      return nestedList;
    },
    //生成嵌套冗余回复
    createNestedRedundantList(allList = []) {
      if (!allList.length)
        return [];
      let list = window.clone(allList);
      let nestedList = [];
      list.map((item, index) => {
        let startList = list.slice(0, index);
        let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
        let endList = list.slice(index + 1);
        if (index === 0) {
          nestedList.push(this.findChildren(item, endList, list));
        } else {
          if (!item.isUse) {
            let isOneLevelReply = false;
            if (item.replyUsers.length) {
              if (item.replyUsers.length > 1) {
                isOneLevelReply = true;
              } else {
                isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
              }
            } else {
              isOneLevelReply = true;
            }
            if (isOneLevelReply) {
              item.level = 0;
              nestedList.push(this.findChildren(item, endList, list));
            }
          } else {
            let newItem = window.clone(item);
            newItem.children = [];
            newItem.level = 0;
            newItem.isDup = true;
            nestedList.push(newItem);
          }
        }
      });
      return nestedList;
    },
    //解析A标签
    parseA(a) {
      let href = a.href;
      let id;
      if (href.includes("/t/")) {
        id = a.pathname.substring("/t/".length);
      }
      return { href, id, title: a.innerText };
    },
    //图片链接转Img标签
    checkPhotoLink2Img(str) {
      if (!str)
        return;
      try {
        let imgWebs = [
          /<a((?!<a).)*href="https?:\/\/((?!<a).)*imgur.com((?!<a).)*>(((?!<a).)*)<\/a>/g,
          /<a((?!<a).)*href="https?:\/\/((?!<a).)*\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG) ((?!<a).)*>(((?!<a).)*)<\/a>/g
        ];
        imgWebs.map((v, i) => {
          let has = str.matchAll(v);
          let res2 = [...has];
          res2.map((r2) => {
            let p = i === 0 ? r2[4] : r2[5];
            if (p) {
              let link = p.toLowerCase();
              let src = p;
              if (link.includes(".png") || link.includes(".jpg") || link.includes(".jpeg") || link.includes(".gif")) {
              } else {
                src = p + ".png";
              }
              str = str.replace(r2[0], `<img src="${src}" data-originUrl="${p}" data-notice="此img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`);
            }
          });
        });
      } catch (e2) {
        console.log("正则解析html里面的a标签的图片链接出错了");
      }
      return str;
    },
    //检测帖子回复长度
    async checkPostReplies(id, needOpen = true) {
      return new Promise(async (resolve) => {
        var _a;
        let showJsonUrl = `${location.origin}/api/topics/show.json?id=${id}`;
        let r2 = await fetch(showJsonUrl);
        if (r2) {
          let res = await r2.json();
          if (res) {
            if (((_a = res[0]) == null ? void 0 : _a.replies) > MAX_REPLY_LIMIT) {
              if (needOpen) {
                window.parse.openNewTab(`https://www.v2ex.com/t/${id}?p=1&script=1`);
              }
              return resolve(true);
            }
          }
        }
        resolve(false);
      });
    },
    async sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    },
    //打开新标签页
    openNewTab(href) {
      _GM_openInTab(href, { active: false });
    },
    async cbChecker(val, count = 0) {
      if (window.cb) {
        window.cb(val);
      } else {
        while (!window.cb && count < 30) {
          await functions.sleep(500);
          count++;
        }
        window.cb && window.cb(val);
      }
    },
    //初始化脚本菜单
    initMonkeyMenu() {
      try {
        _GM_registerMenuCommand("脚本设置", () => {
          functions.cbChecker({ type: "openSetting" });
        });
        _GM_registerMenuCommand("仓库地址", () => {
          functions.openNewTab(window.const.git);
        });
        _GM_registerMenuCommand("反馈 & 建议", functions.feedback);
      } catch (e2) {
        console.error("无法使用Tampermonkey");
      }
    },
    clone(val) {
      return JSON.parse(JSON.stringify(val));
    },
    feedback() {
      functions.openNewTab(DefaultVal.issue);
    }
  };
  const _sfc_main = {
    components: {
      BaseButton,
      NotificationModal,
      BaseLoading,
      BaseSwitch,
      MsgModal,
      TagModal,
      Tooltip,
      Setting,
      PostDetail,
      Base64Tooltip,
      Msg
    },
    provide() {
      return {
        isMobile: vue.computed(() => window.vals.isMobile),
        isLogin: vue.computed(() => this.isLogin),
        isNight: vue.computed(() => this.isNight),
        pageType: vue.computed(() => this.pageType),
        tags: vue.computed(() => this.tags),
        show: vue.computed(() => this.show),
        post: vue.computed(() => this.current),
        config: vue.computed(() => this.config),
        allReplyUsers: vue.computed(() => {
          var _a, _b, _c;
          if ((_a = this.current) == null ? void 0 : _a.replyList) {
            return Array.from(new Set(((_c = (_b = this.current) == null ? void 0 : _b.replyList) == null ? void 0 : _c.map((v) => v.username)) ?? []));
          }
          return [];
        }),
        showConfig: this.showConfig
      };
    },
    data() {
      return {
        loading: window.pageType === PageType.Post,
        refreshLoading: false,
        loadMore: false,
        isLogin: !!window.user.username,
        pageType: window.pageType,
        isNight: window.isNight,
        stopMe: window.stopMe,
        //停止使用脚本
        show: false,
        current: window.clone(window.initPost),
        list: [],
        config: window.clone(window.config),
        tags: window.user.tags,
        readList: window.user.readList,
        configModal: {
          show: false
        },
        notificationModal: {
          show: false,
          h: ""
        }
      };
    },
    computed: {
      targetUserTags() {
        return this.tags[window.targetUserName] ?? [];
      },
      isList() {
        return [PageType.Home, PageType.Node].includes(this.pageType);
      },
      isPost() {
        return this.pageType === PageType.Post;
      },
      isMember() {
        return this.pageType === PageType.Member;
      }
    },
    watch: {
      config: {
        handler(newVal) {
          let config2 = { [window.user.username ?? "default"]: newVal };
          localStorage.setItem("v2ex-config", JSON.stringify(config2));
          window.config = newVal;
        },
        deep: true
      },
      tags(newVal) {
        window.user.tags = newVal;
      },
      "config.viewType"(newVal) {
        if (!newVal)
          return;
        if (newVal === "card") {
          $(".post-item").each(function() {
            $(this).addClass("preview");
          });
        } else {
          $(".post-item").each(function() {
            $(this).removeClass("preview");
          });
        }
      }
    },
    created() {
      let that = this;
      this.initEvent();
      window.cb = this.winCb;
      if (!window.canParseV2exPage)
        return;
      $(document).on("click", "a", this.clickA);
      $(document).on("click", ".post-item", function(e2) {
        if (e2.currentTarget.getAttribute("script"))
          return;
        if (that.stopMe)
          return true;
        if (this.classList.contains("preview")) {
          if (e2.target.tagName !== "A" && e2.target.tagName !== "IMG" && !e2.target.classList.contains("toggle")) {
            console.log("点空白处", this);
            let id = this.dataset["id"];
            let href = this.dataset["href"];
            if (id) {
              that.clickPost(e2, id, href);
            } else {
              if (href)
                location.href = href;
            }
          }
        }
      });
      $(document).on("click", ".toggle", (e2) => {
        if (this.stopMe)
          return true;
        let id = e2.currentTarget.dataset["id"];
        let itemDom = window.win().query(`.id_${id}`);
        if (itemDom.classList.contains("preview")) {
          itemDom.classList.remove("preview");
        } else {
          itemDom.classList.add("preview");
        }
      });
      window.onpopstate = (event) => {
        if (event.state) {
          if (!this.show)
            this.show = true;
        } else {
          if (this.show)
            this.show = false;
        }
      };
      window.onbeforeunload = () => {
      };
      window.deleteNotification = (nId, token) => {
        console.log("deleteNotification", nId, token);
        let item = $("#n_" + nId);
        item.slideUp("fast");
        $.post({
          url: "/delete/notification/" + nId + "?once=" + token,
          success() {
            $.get({
              url: "/notifications/below/" + window.notificationBottom,
              success(data, status, request) {
                item.remove();
                $("#notifications").append(data);
                window.notificationBottom = request.getResponseHeader("X-V2EX-New-Notification-Bottom");
              },
              error() {
                item.slideDown("fast");
              }
            });
          },
          error() {
            item.slideDown("fast");
          }
        });
      };
    },
    beforeUnmount() {
      eventBus.clear();
      $(document).off("click", "a", this.clickA);
    },
    methods: {
      async getUnreadMessagesCount() {
        var _a, _b;
        const res = await fetch(`${location.origin}/mission`);
        const htmlText = await res.text();
        const $page = $(htmlText);
        const text = $page.find('#Rightbar a[href^="/notifications"]').text();
        if (text.includes("未读提醒")) {
          const countStr = (_a = text.match(/\d+/)) == null ? void 0 : _a.at(0);
          if (countStr) {
            return Number((_b = text.match(/\d+/)) == null ? void 0 : _b.at(0));
          }
        } else {
          return 0;
        }
        throw new Error("无法获取未读消息数量");
      },
      clickA(e2) {
        let that = this;
        if (e2.currentTarget.getAttribute("script"))
          return;
        if (that.stopMe)
          return true;
        let { href, id, title } = window.parse.parseA(e2.currentTarget);
        console.log("click-a", e2.currentTarget, e2, href, id, title);
        if (href.includes("/settings/night/toggle"))
          return;
        if (href.includes("/?tab="))
          return;
        if (href.includes("/go"))
          return;
        if (href === window.origin + "/#;")
          return;
        if (href === window.origin + "/")
          return;
        if (href.includes("/notifications"))
          ;
        if (id) {
          that.clickPost(e2, id, href, title);
        } else {
          if (that.config.newTabOpen) {
            that.stopEvent(e2);
            functions.openNewTab(href);
          }
        }
      },
      stopEvent(e2) {
        e2.preventDefault();
        e2.stopPropagation();
      },
      saveReadList() {
        if (this.config.rememberLastReadFloor) {
          window.parse.saveReadList(this.readList);
        }
      },
      async clickPost(e2, id, href, title = "") {
        if (id) {
          if (this.config.clickPostItemOpenDetail) {
            this.stopEvent(e2);
            let index = this.list.findIndex((v) => v.id == id);
            let postItem = this.clone(window.initPost);
            if (index > -1) {
              postItem = this.list[index];
            }
            if (!postItem.title) {
              postItem.title = title ?? "加载中";
            }
            postItem.inList = index > -1;
            if (postItem.inList) {
              if (postItem.replyCount > MAX_REPLY_LIMIT) {
                return functions.openNewTab(`${location.origin}/t/${id}?p=1&script=1`);
              }
            }
            postItem.id = id;
            postItem.href = href;
            if (!postItem.headerTemplate) {
              let template = `
            <div class="cell">
              <div class="topic_content">
                <div class="markdown_body">
                 ${(postItem == null ? void 0 : postItem.content_rendered) ?? ""}
                </div>
              </div>
            </div>
            `;
              postItem.headerTemplate = template;
            }
            this.getPostDetail(postItem);
            return;
          }
          if (this.config.newTabOpen) {
            this.stopEvent(e2);
            functions.openNewTab(`https://www.v2ex.com/t/${id}?p=1`);
          }
        }
      },
      showPost() {
        this.show = true;
        $(`#Wrapper #Main .box:lt(3)`).each(function() {
          $(this).hide();
        });
      },
      showConfig() {
        this.configModal.show = true;
      },
      async winCb({ type, value }) {
        if (type === "openSetting") {
          this.showConfig();
        }
        if (type === "syncData") {
          this.list = window.postList;
          this.config = window.config;
          this.stopMe = window.stopMe;
          this.tags = window.user.tags;
          this.readList = window.user.readList;
          this.current.read = this.readList[this.current.id] ?? {};
          if (this.show && this.isPost && this.current.read.floor) {
            this.$refs.postDetail.read = this.current.read;
          }
        }
        if (type === "warningNotice") {
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: value });
        }
        if (this.stopMe)
          return;
        if (type === "restorePost") {
          this.show = false;
          this.loading = false;
          eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "脚本无法查看此页面！" });
          $(`#Wrapper #Main .box:lt(3)`).each(function() {
            $(this).show();
          });
        }
        if (type === "postContent") {
          this.current = Object.assign(this.current, value);
          this.current.inList = true;
          if (this.config.autoOpenDetail) {
            this.showPost();
          }
        }
        if (type === "postReplies") {
          this.current = Object.assign(this.current, value);
          this.list.push(this.clone(this.current));
          this.loading = false;
        }
      },
      clone(val) {
        return window.clone(val);
      },
      regenerateReplyList() {
        if (this.current.replyList.length) {
          this.current.replyCount = this.current.replyList.length;
          let res = window.parse.createNestedList(this.current.replyList);
          if (res) {
            this.current.nestedReplies = res;
          }
          let dup_res = window.parse.createNestedRedundantList(this.current.replyList);
          if (dup_res) {
            this.current.nestedRedundReplies = dup_res;
          }
        } else {
          this.current.replyCount = 0;
          this.current.nestedReplies = [];
          this.current.nestedRedundReplies = [];
        }
        if (this.list.length) {
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list[rIndex] = this.clone(this.current);
          }
        }
      },
      initEvent() {
        eventBus.on(CMD.CHANGE_COMMENT_THANK, (val) => {
          console.log("CHANGE_COMMENT_THANK", val);
          const { id, type } = val;
          let currentI = this.current.replyList.findIndex((i) => i.id === id);
          if (currentI > -1) {
            this.current.replyList[currentI].isThanked = type === "add";
            if (type === "add") {
              this.current.replyList[currentI].thankCount++;
            } else {
              this.current.replyList[currentI].thankCount--;
            }
            this.regenerateReplyList();
          }
        });
        eventBus.on(CMD.CHANGE_POST_THANK, (val) => {
          const { id, type } = val;
          this.current.isThanked = type === "add";
          if (type === "add") {
            this.current.thankCount++;
          } else {
            this.current.thankCount--;
          }
          let currentI = this.list.findIndex((i) => i.id === id);
          if (currentI > -1) {
            this.list[currentI].isThanked = type === "add";
            if (type === "add") {
              this.list[currentI].thankCount++;
            } else {
              this.list[currentI].thankCount++;
            }
          }
        });
        eventBus.on(CMD.REMOVE, (val) => {
          let removeIndex = this.current.replyList.findIndex((i) => i.floor === val);
          if (removeIndex > -1) {
            this.current.replyList.splice(removeIndex, 1);
          }
          this.regenerateReplyList();
        });
        eventBus.on(CMD.IGNORE, () => {
          this.show = false;
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list.splice(rIndex, 1);
          }
          this.current = this.clone(window.initPost);
        });
        eventBus.on(CMD.MERGE, (val) => {
          this.current = Object.assign(this.current, val);
          let rIndex = this.list.findIndex((i) => i.id === this.current.id);
          if (rIndex > -1) {
            this.list[rIndex] = this.clone(this.current);
          }
        });
        eventBus.on(CMD.ADD_READ, (val) => {
          this.readList[this.current.id] = val;
        });
        eventBus.on(CMD.ADD_REPLY, (item) => {
          this.current.replyList.push(item);
          this.regenerateReplyList();
        });
        eventBus.on(CMD.REFRESH_ONCE, async (once) => {
          if (once) {
            if (typeof once === "string") {
              let res = once.match(/var once = "([\d]+)";/);
              if (res && res[1]) {
                this.current.once = Number(res[1]);
                return;
              }
            }
            if (typeof once === "number") {
              this.current.once = once;
              return;
            }
          }
          window.fetchOnce().then((r2) => {
            this.current.once = r2;
          });
        });
        eventBus.on(CMD.REMOVE_TAG, async ({ username, tag }) => {
          let oldTag = this.clone(this.tags);
          let tags = this.tags[username] ?? [];
          let rIndex = tags.findIndex((v) => v === tag);
          if (rIndex > -1) {
            tags.splice(rIndex, 1);
          }
          this.tags[username] = tags;
          let res = await window.parse.saveTags(this.tags);
          if (!res) {
            eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "标签删除失败！" });
            this.tags = oldTag;
          }
        });
        eventBus.on(CMD.REFRESH_POST, () => this.getPostDetail(this.current));
      },
      async getPostDetail(post) {
        this.current = post;
        this.current.read = this.readList[this.current.id] ?? { floor: 0, total: 0 };
        this.show = true;
        if (!this.current.inList) {
          this.loading = true;
          let r2 = await window.parse.checkPostReplies(post.id, true);
          if (r2) {
            eventBus.emit(CMD.SHOW_MSG, { type: "warning", text: "由于回复数量较多，已为您单独打开此主题" });
            this.loading = this.show = false;
            return;
          }
        }
        let url = window.baseUrl + "/t/" + post.id;
        this.current.url = url;
        let alreadyHasReply = this.current.replyList.length;
        if (alreadyHasReply) {
          this.refreshLoading = true;
          this.$refs.postDetail.jumpLastRead(this.current.read.floor);
        } else {
          this.loading = true;
        }
        let apiRes = await window.fetch(url + "?p=1");
        if (apiRes.status === 404) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "主题未找到" });
          return this.refreshLoading = this.loading = false;
        }
        if (apiRes.status === 403) {
          this.refreshLoading = this.show = this.loading = false;
          functions.openNewTab(`${location.origin}/t/${post.id}?p=1&script=0`);
          return;
        }
        if (apiRes.redirected) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "没有权限" });
          return this.refreshLoading = this.loading = false;
        }
        let htmlText = await apiRes.text();
        let hasPermission = htmlText.search("你要查看的页面需要先登录");
        if (hasPermission > -1) {
          eventBus.emit(CMD.SHOW_MSG, { type: "error", text: "你要查看的页面需要先登录" });
          return this.refreshLoading = this.loading = false;
        }
        let bodyText = htmlText.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let body = $(bodyText[0]);
        decodeEmail(body);
        await window.parse.getPostDetail(this.current, body, htmlText);
        let index = this.list.findIndex((v) => v.id == this.current.id);
        if (index > -1) {
          this.list[index] = this.clone(this.current);
        } else {
          this.list.push(this.clone(this.current));
        }
        this.refreshLoading = this.loading = false;
        if (!alreadyHasReply) {
          vue.nextTick(() => {
            this.$refs.postDetail.jumpLastRead(this.current.read.floor);
          });
        }
        await window.parse.parseOp(this.current);
        console.log("当前帖子", this.current);
      },
      addTargetUserTag() {
        eventBus.emit(CMD.ADD_TAG, window.targetUserName);
      },
      removeTargetUserTag(tag) {
        eventBus.emit(CMD.REMOVE_TAG, { username: window.targetUserName, tag });
      }
    }
  };
  const _withScopeId = (n2) => (vue.pushScopeId("data-v-6c0e87a5"), n2 = n2(), vue.popScopeId(), n2);
  const _hoisted_1 = {
    key: 0,
    class: "target-user-tags p1"
  };
  const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "标签：", -1));
  const _hoisted_3 = { class: "my-tag" };
  const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("i", { class: "fa fa-tag" }, null, -1));
  const _hoisted_5 = ["onClick"];
  const _hoisted_6 = {
    key: 1,
    class: "my-box p2",
    style: { "margin-top": "2rem" }
  };
  const _hoisted_7 = {
    key: 0,
    class: "flex flex-center"
  };
  const _hoisted_8 = {
    key: 1,
    class: "loaded"
  };
  const _hoisted_9 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ vue.createElementVNode("span", null, "楼中楼解析完成", -1));
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_Setting = vue.resolveComponent("Setting");
    const _component_TagModal = vue.resolveComponent("TagModal");
    const _component_PostDetail = vue.resolveComponent("PostDetail");
    const _component_Base64Tooltip = vue.resolveComponent("Base64Tooltip");
    const _component_MsgModal = vue.resolveComponent("MsgModal");
    const _component_NotificationModal = vue.resolveComponent("NotificationModal");
    const _component_BaseLoading = vue.resolveComponent("BaseLoading");
    const _component_BaseButton = vue.resolveComponent("BaseButton");
    return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
      vue.createVNode(_component_Setting, {
        modelValue: $data.config,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.config = $event),
        show: $data.configModal.show,
        "onUpdate:show": _cache[1] || (_cache[1] = ($event) => $data.configModal.show = $event)
      }, null, 8, ["modelValue", "show"]),
      vue.createVNode(_component_TagModal, {
        tags: $data.tags,
        "onUpdate:tags": _cache[2] || (_cache[2] = ($event) => $data.tags = $event)
      }, null, 8, ["tags"]),
      vue.createVNode(_component_PostDetail, {
        modelValue: $data.show,
        "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.show = $event),
        ref: "postDetail",
        displayType: $data.config.commentDisplayType,
        "onUpdate:displayType": _cache[4] || (_cache[4] = ($event) => $data.config.commentDisplayType = $event),
        onSaveReadList: $options.saveReadList,
        onRefresh: _cache[5] || (_cache[5] = ($event) => $options.getPostDetail($data.current)),
        loading: $data.loading,
        refreshLoading: $data.refreshLoading
      }, null, 8, ["modelValue", "displayType", "onSaveReadList", "loading", "refreshLoading"]),
      vue.createVNode(_component_Base64Tooltip),
      vue.createVNode(_component_MsgModal),
      vue.createVNode(_component_NotificationModal, {
        modelValue: $data.notificationModal.show,
        "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.notificationModal.show = $event),
        h: $data.notificationModal.h
      }, null, 8, ["modelValue", "h"]),
      !$data.stopMe ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
        $options.isMember && $data.isLogin && $data.config.openTag ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          _hoisted_2,
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.targetUserTags, (i) => {
            return vue.openBlock(), vue.createElementBlock("span", _hoisted_3, [
              _hoisted_4,
              vue.createElementVNode("span", null, vue.toDisplayString(i), 1),
              vue.createElementVNode("i", {
                class: "fa fa-trash-o remove",
                onClick: ($event) => $options.removeTargetUserTag(i)
              }, null, 8, _hoisted_5)
            ]);
          }), 256)),
          vue.createElementVNode("span", {
            class: "add-tag ago",
            onClick: _cache[7] || (_cache[7] = (...args) => $options.addTargetUserTag && $options.addTargetUserTag(...args)),
            title: "添加标签"
          }, "+")
        ])) : vue.createCommentVNode("", true),
        $options.isPost && !$data.show && $data.config.autoOpenDetail ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_6, [
          $data.loading ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_7, [
            vue.createVNode(_component_BaseLoading)
          ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_8, [
            _hoisted_9,
            vue.createVNode(_component_BaseButton, {
              size: "small",
              onClick: $options.showPost
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("点击显示")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]))
        ])) : vue.createCommentVNode("", true)
      ], 64)) : vue.createCommentVNode("", true)
    ], 64);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6c0e87a5"]]);
  let isMobile = !document.querySelector("#Rightbar");
  let $section = document.createElement("section");
  $section.id = "app";
  function run() {
    window.baseUrl = location.origin;
    window.initPost = DefaultPost;
    window.win = function() {
      return window;
    };
    window.win().doc = window.win().document;
    window.win().query = (v) => window.win().document.querySelector(v);
    window.query = (v) => window.win().document.querySelector(v);
    window.clone = (val) => JSON.parse(JSON.stringify(val));
    window.user = DefaultUser;
    window.targetUserName = "";
    window.pageType = void 0;
    window.pageData = { pageNo: 1 };
    window.config = DefaultConfig;
    window.const = {
      git: "https://github.com/zyronon/v2ex-script",
      issue: "https://github.com/zyronon/v2ex-script/issues"
    };
    window.currentVersion = 1;
    window.isNight = $(".Night").length === 1;
    window.cb = null;
    window.stopMe = false;
    window.postList = [];
    window.parse = {
      //解析帖子内容
      async parsePostContent(post, body, htmlText) {
        let once = htmlText.match(/var once = "([\d]+)";/);
        if (once && once[1]) {
          post.once = once[1];
        }
        post.isReport = htmlText.includes("你已对本主题进行了报告");
        let wrapper = body.find("#Main");
        if (!post.title || !post.content_rendered) {
          let h1 = wrapper.find("h1");
          if (h1) {
            post.title = h1[0].innerText;
          }
        }
        let as = wrapper.find(".header > a");
        if (as.length) {
          post.node.title = as[1].innerText;
          post.node.url = as[1].href;
        }
        let aName = wrapper.find(".header small.gray a:nth-child(1)");
        if (aName) {
          post.member.username = aName[0].innerText;
        }
        let spanEl = wrapper.find(".header small.gray span");
        if (spanEl) {
          post.createDateAgo = spanEl[0].innerText;
        }
        let avatarEl = wrapper.find(".header .avatar");
        if (avatarEl) {
          post.member.avatar_large = avatarEl[0].src;
        }
        let topic_buttons = body.find(".topic_buttons");
        if (topic_buttons.length) {
          let favoriteNode = topic_buttons.find(".tb:first");
          if (favoriteNode.length) {
            post.isFavorite = favoriteNode[0].innerText === "取消收藏";
          }
          let ignoreNode = topic_buttons.find(".tb:nth-child(3)");
          if (ignoreNode.length) {
            post.isIgnore = ignoreNode[0].innerText === "取消忽略";
          }
          let thankNode = topic_buttons.find("#topic_thank .tb");
          if (!thankNode.length) {
            post.isThanked = true;
          }
          let topic_stats = topic_buttons.find(".topic_stats");
          if (topic_stats.length) {
            let text = topic_stats[0].innerText;
            let reg1 = text.matchAll(/([\d]+)[\s]*人收藏/g);
            let collectCountReg = [...reg1];
            if (collectCountReg.length) {
              post.collectCount = Number(collectCountReg[0][1]);
            }
            reg1 = text.matchAll(/([\d]+)[\s]*likes/g);
            collectCountReg = [...reg1];
            if (collectCountReg.length) {
              post.collectCount = Number(collectCountReg[0][1]);
            }
            let reg2 = text.matchAll(/([\d]+)[\s]*人感谢/g);
            let thankCountReg = [...reg2];
            if (thankCountReg.length) {
              post.thankCount = Number(thankCountReg[0][1]);
            }
            let reg3 = text.matchAll(/([\d]+)[\s]*次点击/g);
            let clickCountReg = [...reg3];
            if (clickCountReg.length) {
              post.clickCount = Number(clickCountReg[0][1]);
            }
            reg3 = text.matchAll(/([\d]+)[\s]*views/g);
            clickCountReg = [...reg3];
            if (clickCountReg.length) {
              post.clickCount = Number(clickCountReg[0][1]);
            }
          }
        }
        let header = body.find(`#Main .box`).first();
        let temp = header.clone();
        temp.find(".topic_buttons").remove();
        temp.find(".inner").remove();
        temp.find(".header").remove();
        let html = temp.html();
        html = this.checkPhotoLink2Img(html);
        post.headerTemplate = html;
        return post;
      },
      //解析OP信息
      async parseOp(post) {
        if (!post.member.id) {
          let userRes = await fetch(window.baseUrl + "/api/members/show.json?username=" + post.member.username);
          if (userRes.status === 200) {
            post.member = await userRes.json();
          }
        }
        if (post.member.id) {
          let date = new Date(post.member.created * 1e3);
          let createStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          date.setHours(0);
          date.setMinutes(0);
          date.setSeconds(0);
          date.setMilliseconds(0);
          let now = /* @__PURE__ */ new Date();
          now.setHours(0);
          now.setMinutes(0);
          now.setSeconds(0);
          now.setMilliseconds(0);
          let d2 = now.getTime() - date.getTime();
          let isNew = d2 <= 1e3 * 60 * 60 * 24 * 7;
          post.member.createDate = createStr + " 注册";
          post.member.isNew = isNew;
        } else {
          post.member.createDate = "用户已被注销/封禁";
          post.member.isNew = true;
        }
        return post;
      },
      //获取帖子所有回复
      async getPostAllReplies(post, body, htmlText, pageNo = 1) {
        var _a, _b;
        if (body.find("#no-comments-yet").length) {
          return post;
        }
        console.log("body", body);
        let boxs = body.find(`#Main .box`);
        let box = boxs[1];
        console.log("box", box);
        let cells = box.querySelectorAll(".cell");
        if (cells && cells.length) {
          post.fr = cells[0].querySelector(".cell .fr").innerHTML;
          cells = Array.from(cells);
          let snow = cells[0].querySelector(".snow");
          post.createDate = ((_b = (_a = snow == null ? void 0 : snow.nextSibling) == null ? void 0 : _a.nodeValue) == null ? void 0 : _b.trim()) || "";
          let repliesMap = [];
          if (cells[1].id) {
            repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(1)) });
            let replyList = this.getAllReply(repliesMap);
            post.replyList = replyList;
            post.replyCount = replyList.length;
            post.allReplyUsers = Array.from(new Set(replyList.map((v) => v.username)));
            let nestedList = this.createNestedList(replyList);
            let nestedRedundantList = this.createNestedRedundantList(replyList);
            if (nestedList)
              post.nestedReplies = nestedList;
            if (nestedRedundantList)
              post.nestedRedundReplies = nestedRedundantList;
            return post;
          } else {
            let promiseList = [];
            return new Promise((resolve, reject) => {
              repliesMap.push({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) });
              let pages = cells[1].querySelectorAll("a.page_normal");
              pages = Array.from(pages);
              let url = window.baseUrl + "/t/" + post.id;
              for (let i = 0; i < pages.length; i++) {
                let currentPageNo = Number(pages[i].innerText);
                promiseList.push(this.fetchPostOtherPageReplies(url + "?p=" + currentPageNo, currentPageNo));
              }
              Promise.allSettled(promiseList).then(
                (results) => {
                  results.filter((result) => result.status === "fulfilled").map((v) => repliesMap.push(v.value));
                  let replyList = this.getAllReply(repliesMap);
                  post.replyList = replyList;
                  post.replyCount = replyList.length;
                  post.allReplyUsers = Array.from(new Set(replyList.map((v) => v.username)));
                  let nestedList = this.createNestedList(replyList);
                  let nestedRedundantList = this.createNestedRedundantList(replyList);
                  if (nestedList)
                    post.nestedReplies = nestedList;
                  if (nestedRedundantList)
                    post.nestedRedundReplies = nestedRedundantList;
                  resolve(post);
                }
              );
            });
          }
        }
      },
      //请求帖子其他页的回复
      fetchPostOtherPageReplies(href, pageNo) {
        return new Promise((resolve) => {
          $.get(href).then((res) => {
            let s = res.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
            let box = $(s[0]).find("#Main .box")[1];
            let cells = box.querySelectorAll(".cell");
            cells = Array.from(cells);
            resolve({ i: pageNo, replyList: this.parsePageReplies(cells.slice(2, cells.length - 1)) });
          }).catch((r2) => {
            if (r2.status === 403) {
              cbChecker({ type: "restorePost", value: null });
            }
          });
        });
      },
      //解析页面的回复
      parsePageReplies(nodes) {
        let replyList = [];
        nodes.forEach((node, index) => {
          if (!node.id)
            return;
          let item = {
            level: 0,
            thankCount: 0,
            isThanked: false,
            isOp: false,
            isDup: false,
            id: node.id.replace("r_", "")
          };
          let reply_content = node.querySelector(".reply_content");
          item.reply_content = this.checkPhotoLink2Img(reply_content.innerHTML);
          item.reply_text = reply_content.textContent;
          let { users, floor } = this.parseReplyContent(item.reply_content);
          item.hideCallUserReplyContent = item.reply_content;
          if (users.length === 1) {
            item.hideCallUserReplyContent = item.reply_content.replace(/@<a href="\/member\/[\s\S]+?<\/a>(\s#[\d]+)?\s(<br>)?/, () => "");
          }
          item.replyUsers = users;
          item.replyFloor = floor;
          let ago = node.querySelector(".ago");
          item.date = ago.textContent;
          let userNode = node.querySelector("strong a");
          item.username = userNode.textContent;
          let avatar = node.querySelector("td img");
          item.avatar = avatar.src;
          let no = node.querySelector(".no");
          item.floor = Number(no.textContent);
          let thank_area = node.querySelector(".thank_area");
          if (thank_area) {
            item.isThanked = thank_area.classList.contains("thanked");
          }
          let small = node.querySelector(".small");
          if (small) {
            item.thankCount = Number(small.textContent);
          }
          let op = node.querySelector(".op");
          if (op) {
            item.isOp = true;
          }
          let mod = node.querySelector(".mod");
          if (mod) {
            item.isMod = true;
          }
          replyList.push(item);
        });
        return replyList;
      },
      //解析回复内容，解析出@用户，回复楼层。用于后续生成嵌套楼层
      parseReplyContent(str) {
        if (!str)
          return;
        let users = [];
        let getUsername = (userStr) => {
          let endIndex = userStr.indexOf('">');
          if (endIndex > -1) {
            let user = userStr.substring(0, endIndex);
            if (!users.find((i) => i === user)) {
              users.push(user);
            }
          }
        };
        let userReg = /@<a href="\/member\/([\s\S]+?)<\/a>/g;
        let has = str.matchAll(userReg);
        let res2 = [...has];
        if (res2.length > 1) {
          res2.map((item) => {
            getUsername(item[1]);
          });
        }
        if (res2.length === 1) {
          getUsername(res2[0][1]);
        }
        let floor = -1;
        if (users.length === 1) {
          let floorReg = /@<a href="\/member\/[\s\S]+?<\/a>[\s]+#([\d]+)/g;
          let hasFloor = str.matchAll(floorReg);
          let res = [...hasFloor];
          if (res.length) {
            floor = Number(res[0][1]);
          }
        }
        return { users, floor };
      },
      //获取帖子详情
      async getPostDetail(post, body, htmlText, pageNo = 1) {
        post = await this.parsePostContent(post, body, htmlText);
        return await this.getPostAllReplies(post, body, htmlText, pageNo);
      },
      //获取所有回复
      getAllReply(repliesMap = []) {
        return repliesMap.sort((a, b) => a.i - b.i).reduce((pre, i) => {
          pre = pre.concat(i.replyList);
          return pre;
        }, []);
      },
      //生成嵌套回复
      createNestedList(allList = []) {
        if (!allList.length)
          return [];
        let list = window.clone(allList);
        let nestedList = [];
        list.map((item, index) => {
          let startList = list.slice(0, index);
          let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
          let endList = list.slice(index + 1);
          if (index === 0) {
            nestedList.push(this.findChildren(item, endList, list));
          } else {
            if (!item.isUse) {
              let isOneLevelReply = false;
              if (item.replyUsers.length) {
                if (item.replyUsers.length > 1) {
                  isOneLevelReply = true;
                } else {
                  isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
                }
              } else {
                isOneLevelReply = true;
              }
              if (isOneLevelReply) {
                item.level = 0;
                nestedList.push(this.findChildren(item, endList, list));
              }
            }
          }
        });
        return nestedList;
      },
      //生成嵌套冗余回复
      createNestedRedundantList(allList = []) {
        if (!allList.length)
          return [];
        let list = window.clone(allList);
        let nestedList = [];
        list.map((item, index) => {
          let startList = list.slice(0, index);
          let startReplyUsers = Array.from(new Set(startList.map((v) => v.username)));
          let endList = list.slice(index + 1);
          if (index === 0) {
            nestedList.push(this.findChildren(item, endList, list));
          } else {
            if (!item.isUse) {
              let isOneLevelReply = false;
              if (item.replyUsers.length) {
                if (item.replyUsers.length > 1) {
                  isOneLevelReply = true;
                } else {
                  isOneLevelReply = !startReplyUsers.find((v) => v === item.replyUsers[0]);
                }
              } else {
                isOneLevelReply = true;
              }
              if (isOneLevelReply) {
                item.level = 0;
                nestedList.push(this.findChildren(item, endList, list));
              }
            } else {
              let newItem = window.clone(item);
              newItem.children = [];
              newItem.level = 0;
              newItem.isDup = true;
              nestedList.push(newItem);
            }
          }
        });
        return nestedList;
      },
      //查找子回复
      findChildren(item, endList, all) {
        var _a;
        const fn = (child, endList2, parent) => {
          child.level = parent.level + 1;
          let rIndex = all.findIndex((v) => v.floor === child.floor);
          if (rIndex > -1) {
            all[rIndex].isUse = true;
          }
          parent.children.push(this.findChildren(child, endList2, all));
        };
        item.children = [];
        let floorReplyList = [];
        for (let i = 0; i < endList.length; i++) {
          let currentItem = endList[i];
          if (currentItem.isUse)
            continue;
          if (currentItem.replyFloor === item.floor) {
            if (currentItem.replyUsers.length === 1 && currentItem.replyUsers[0] === item.username) {
              currentItem.isUse = true;
              floorReplyList.push({ endList: endList.slice(i + 1), currentItem });
            } else {
              currentItem.isWrong = true;
            }
          }
        }
        floorReplyList.reverse().map(({ currentItem, endList: endList2 }) => {
          fn(currentItem, endList2, item);
        });
        let nextMeIndex = endList.findIndex((v) => {
          var _a2;
          return v.username === item.username && ((_a2 = v.replyUsers) == null ? void 0 : _a2[0]) !== item.username;
        });
        let findList = nextMeIndex > -1 ? endList.slice(0, nextMeIndex) : endList;
        for (let i = 0; i < findList.length; i++) {
          let currentItem = findList[i];
          if (currentItem.isUse)
            continue;
          if (currentItem.replyUsers.length === 1) {
            if (currentItem.replyFloor !== -1) {
              if (((_a = all[currentItem.replyFloor - 1]) == null ? void 0 : _a.username) === currentItem.replyUsers[0]) {
                continue;
              }
            }
            let endList2 = endList.slice(i + 1);
            if (currentItem.username === item.username) {
              if (currentItem.replyUsers[0] === item.username) {
                fn(currentItem, endList2, item);
              }
              break;
            } else {
              if (currentItem.replyUsers[0] === item.username) {
                fn(currentItem, endList2, item);
              }
            }
          } else {
            if (currentItem.username === item.username)
              break;
          }
        }
        item.children = item.children.sort((a, b) => a.floor - b.floor);
        return item;
      },
      //解析页面帖子列表
      parsePagePostList(list, box) {
        list.forEach((itemDom) => {
          let item = window.clone(window.initPost);
          let item_title = itemDom.querySelector(".item_title a");
          let { href, id } = window.parse.parseA(item_title);
          item.id = id;
          item.href = href;
          item.url = location.origin + "/api/topics/show.json?id=" + item.id;
          itemDom.classList.add("post-item");
          itemDom.classList.add(`id_${id}`);
          itemDom.dataset["href"] = href;
          itemDom.dataset["id"] = id;
          window.postList.push(item);
        });
        Promise.allSettled(window.postList.map((item) => $.get(item.url))).then((res) => {
          let ok = res.filter((r2) => r2.status === "fulfilled").map((v) => v.value[0]);
          box.style.boxShadow = "unset";
          box.style.background = "unset";
          if (window.config.viewType === "card") {
            list.forEach((itemDom) => itemDom.classList.add("preview"));
          }
          ok.map((postItem) => {
            var _a;
            if (postItem == null ? void 0 : postItem.id) {
              let itemDom = box.querySelector(`.id_${postItem.id}`);
              if (window.config.showPreviewBtn) {
                let td = itemDom.querySelector("td:nth-child(4)");
                td.style.position = "relative";
                let toggle = document.createElement("div");
                toggle.dataset["id"] = postItem.id;
                toggle.classList.add("toggle");
                toggle.innerText = "点击展开/收起";
                td.append(toggle);
              }
              let index = window.postList.findIndex((v) => v.id == postItem.id);
              if (index > -1) {
                let obj = window.postList[index];
                postItem.replyCount = postItem.replies;
                window.postList[index] = Object.assign({}, obj, postItem);
                if (postItem.content_rendered) {
                  let a = document.createElement("a");
                  a.href = obj.href;
                  a.classList.add("post-content");
                  let div = document.createElement("div");
                  div.innerHTML = postItem.content_rendered;
                  a.append(div);
                  itemDom.append(a);
                  if (div.clientHeight < 172) {
                    a.classList.add("show-all");
                  } else {
                    let showMore = document.createElement("div");
                    showMore.classList.add("show-more");
                    showMore.innerHTML = "显示更多/收起";
                    showMore.onclick = function(e2) {
                      e2.stopPropagation();
                      a.classList.toggle("show-all");
                    };
                    (_a = a.parentNode) == null ? void 0 : _a.append(showMore);
                  }
                }
              }
            }
          });
          cbChecker({ type: "syncData" });
        });
      },
      //解析A标签
      parseA(a) {
        let href = a.href;
        let id;
        if (href.includes("/t/")) {
          id = a.pathname.substring("/t/".length);
        }
        return { href, id, title: a.innerText };
      },
      //创建记事本子条目
      async createNoteItem(itemName) {
        return;
      },
      //编辑记事本子条目
      async editNoteItem(val, id) {
        return;
      },
      //标签操作
      async saveTags(val) {
        return;
      },
      //已读楼层操作
      async saveReadList(val) {
        return;
      },
      //imgur图片删除hash操作
      async saveImgurList(val) {
        return;
      },
      //图片链接转Img标签
      checkPhotoLink2Img(str) {
        if (!str)
          return;
        try {
          let imgWebs = [
            /<a((?!<a).)*href="https?:\/\/((?!<a).)*imgur.com((?!<a).)*>(((?!<a).)*)<\/a>/g,
            /<a((?!<a).)*href="https?:\/\/((?!<a).)*\.(gif|png|jpg|jpeg|GIF|PNG|JPG|JPEG) ((?!<a).)*>(((?!<a).)*)<\/a>/g
          ];
          imgWebs.map((v, i) => {
            let has = str.matchAll(v);
            let res2 = [...has];
            res2.map((r2) => {
              let p = i === 0 ? r2[4] : r2[5];
              if (p) {
                let link = p.toLowerCase();
                let src = p;
                if (link.includes(".png") || link.includes(".jpg") || link.includes(".jpeg") || link.includes(".gif")) {
                } else {
                  src = p + ".png";
                }
                str = str.replace(r2[0], `<img src="${src}" data-originUrl="${p}" data-notice="此img标签由v2ex-超级增强脚本解析" style="max-width: 100%">`);
              }
            });
          });
        } catch (e2) {
          console.log("正则解析html里面的a标签的图片链接出错了");
        }
        return str;
      },
      //检测帖子回复长度
      async checkPostReplies(id, needOpen = true) {
        return new Promise(async (resolve) => {
          var _a;
          let showJsonUrl = `${location.origin}/api/topics/show.json?id=${id}`;
          let r2 = await fetch(showJsonUrl);
          if (r2) {
            let res = await r2.json();
            if (res) {
              if (((_a = res[0]) == null ? void 0 : _a.replies) > MAX_REPLY_LIMIT) {
                if (needOpen) {
                  functions.openNewTab(`https://www.v2ex.com/t/${id}?p=1&script=1`);
                }
                return resolve(true);
              }
            }
          }
          resolve(false);
        });
      }
    };
    window.vals = {
      isMobile: !document.querySelector("#Rightbar")
    };
    window.functions = {};
    async function sleep(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    }
    async function cbChecker(val, count = 0) {
      if (window.cb) {
        window.cb(val);
      } else {
        while (!window.cb && count < 30) {
          await sleep(500);
          count++;
        }
        window.cb && window.cb(val);
      }
    }
    function initMonkeyMenu() {
      try {
        _GM_registerMenuCommand("脚本设置", () => {
          cbChecker({ type: "openSetting" });
        });
        _GM_registerMenuCommand("仓库地址", () => {
          functions.openNewTab(DefaultVal.git);
        });
        _GM_registerMenuCommand("反馈 & 建议", functions.feedback);
      } catch (e2) {
        console.error("无法使用Tampermonkey");
      }
    }
    function initStyle() {
      let style2 = `
       html, body {
            font-size: 62.5%;
        }
        

        :root{
          --box-border-radius:8px;
        }
        
        .box{
          box-shadow:rgba(0, 0, 0, 0.08) 0px 4px 12px;
        }
        
        #Tabs{
            border-top-left-radius: var(--box-border-radius) !important;
            border-top-right-radius: var(--box-border-radius) !important;
        }
        
        #Main .cell .count_livid { 
            font-size: 14px;
            font-weight: 500; 
            padding: 3px 10px; 
            border-radius: 5px; 
        }

        #Wrapper {
          height: unset !important;
          width: unset !important;
        }

       #Wrapper > .content {
        height: unset !important;
        width: unset !important;
          max-width:1100px !important;
      }

      .post-item {
          background: white;
      } 

      .post-item > .post-content {
          height: 0;
          margin-top: 0;
      }

      .post-item:hover .toggle {
          display: flex;
      }

      .toggle {
          position: absolute;
          right: ${window.config.viewType === "simple" ? "5rem" : 0};
          top: 0.5rem;
          width: 9rem;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          cursor: pointer;
          font-size: 1.2rem;
          color: #ccc;
          display: none;
      }

      .preview {
          margin: 1rem 0;
          border: 1px solid transparent;
          border-radius: var(--box-border-radius);
          cursor: pointer;
      }

      .preview:hover {
          border: 1px solid #c8c8c8;
      }

      .preview > .post-content {
          height: unset !important;
          margin-top: 0.5rem !important;
      }

      .preview > .post-content.show-all {
          max-height: unset;
          -webkit-mask-image:none; 
      }

      .preview  .topic-link:link {
          color: black !important;
      }

      .post-content {
          margin-top: 0.5rem;
          display: block;
          max-height: 20rem;
          overflow: hidden;
          text-decoration: unset !important;
          line-break: anywhere;
          -webkit-mask-image: linear-gradient(180deg,#000 60%,transparent);
      }

      .show-more {
        display: none;
      }

      .preview > .show-more {
        font-size: 1.3rem;
        text-align: right;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 9;
      }

      .post-content:visited {
          color: #afb9c1 !important;
      }

      .post-content:link {
          color: #494949;
      }


      .Night .post-item {
          background: #18222d !important;
      }

      .Night .preview {
          border: 1px solid #3b536e;
      }

      .Night .preview > .post-content:link {
          color: #d1d5d9;
      }

      .Night .preview > .post-content:visited {
          color: #393f4e !important;
      }
      
      .Night .preview  .topic-link:link {
          color: #c0dbff !important;
      }
      
      ${window.config.viewType === "simple" ? `
      ${window.pageType !== PageType.Member ? `
      .item table tr td:first-child{display:none;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      .item table tr td .sep5{display:none;}
      .item table tr td .topic_info{display:none;}
      .item {border-bottom:none;}
      .avatar,#avatar{display:none;}
      ` : ""}
      
      #Logo {background-image:url('https://i.imgur.com/i9VgUtM.png');}
       .bigger a, .top:nth-last-child(5){color: transparent!important;text-shadow: #b0b0b0 0 0 6px;user-select: none;}
      // .bigger a:before,.top:nth-last-child(5):before{content:'Mona Lisa';position: absolute;background: white;}
      #Rightbar .cell table:first-child tr td:first-child{display:none;}
      ` : ""}

      ${window.config.customBgColor ? `#Wrapper {
          background-color: ${window.config.customBgColor} !important;
          background-image: unset !important;
        }` : ""}
        
        
      .top{
        position:relative;
      }
        
      .new:before{
        content:'new';
        position: absolute;
        background: red;
        font-size: 10px;
        border-radius: 4px;
        padding: 0px 2px;
        color: white;
        right: -9px;
        top: -3px;
      }
    }

    `;
      let addStyle2 = document.createElement("style");
      addStyle2.rel = "stylesheet";
      addStyle2.type = "text/css";
      addStyle2.innerHTML = style2;
      window.document.head.append(addStyle2);
    }
    function qianDao() {
      let timeNow = (/* @__PURE__ */ new Date()).getUTCFullYear() + "/" + ((/* @__PURE__ */ new Date()).getUTCMonth() + 1) + "/" + (/* @__PURE__ */ new Date()).getUTCDate();
      if (window.pageType === PageType.Home) {
        let qiandao = window.query('.box .inner a[href="/mission/daily"]');
        if (qiandao) {
          qianDao_(qiandao, timeNow);
        } else if (window.win().doc.getElementById("gift_v2excellent")) {
          window.win().doc.getElementById("gift_v2excellent").click();
          localStorage.setItem("menu_clockInTime", timeNow);
          console.info("[V2EX - 超级增强] 自动签到完成！");
        } else {
          console.info("[V2EX - 超级增强] 自动签到完成！");
        }
      } else {
        let timeOld = localStorage.getItem("menu_clockInTime");
        if (!timeOld || timeOld != timeNow) {
          qianDaoStatus_(timeNow);
        } else {
          console.info("[V2EX - 超级增强] 自动签到完成！");
        }
      }
    }
    function qianDao_(qiandao, timeNow) {
      let url = window.baseUrl + "/mission/daily/redeem?" + RegExp("once\\=(\\d+)").exec(document.querySelector("div#Top .tools, #menu-body").innerHTML)[0];
      console.log("url", url);
      $.get(url).then((r2) => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let html = $(bodyText[0]);
        if (html.find("li.fa.fa-ok-sign").length) {
          html = html.find("#Main").text().match(/已连续登录 (\d+?) 天/)[0];
          localStorage.setItem("menu_clockInTime", timeNow);
          console.info("[V2EX - 超级增强] 自动签到完成！");
          if (qiandao) {
            qiandao.textContent = `自动签到完成！${html}`;
            qiandao.href = "javascript:void(0);";
          }
        } else {
          _GM_notification({
            text: "自动签到失败！请关闭其他插件或脚本。\n如果连续几天都签到失败，请联系作者解决！",
            timeout: 4e3,
            onclick() {
              functions.feedback();
            }
          });
          console.warn("[V2EX 增强] 自动签到失败！请关闭其他插件或脚本。如果连续几天都签到失败，请联系作者解决！");
          if (qiandao)
            qiandao.textContent = "自动签到失败！请尝试手动签到！";
        }
      });
    }
    function qianDaoStatus_(timeNow) {
      $.get(window.baseUrl + "/mission/daily").then((r2) => {
        let bodyText = r2.match(/<body[^>]*>([\s\S]+?)<\/body>/g);
        let html = $(bodyText[0]);
        if (html.find('input[value^="领取"]').length) {
          qianDao_(null, timeNow);
        } else {
          console.info("[V2EX 增强] 已经签过到了。");
          localStorage.setItem("menu_clockInTime", timeNow);
        }
      });
    }
    function checkPageType() {
      let l = window.location;
      if (l.pathname === "/") {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/?tab=/)) {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/go\//)) {
        if (!l.href.includes("/links")) {
          window.pageType = PageType.Node;
        }
      } else if (l.href.match(/.com\/recent/)) {
        window.pageType = PageType.Home;
      } else if (l.href.match(/.com\/member/)) {
        window.pageType = PageType.Member;
      } else {
        let r2 = l.href.match(/.com\/t\/([\d]+)/);
        if (r2) {
          window.pageType = PageType.Post;
          window.pageData.id = r2[1];
          if (l.search) {
            let pr = l.href.match(/\?p=([\d]+)/);
            if (pr)
              window.pageData.pageNo = Number(pr[1]);
          }
        }
      }
    }
    function initConfig() {
      return new Promise((resolve) => {
        let configStr = window.localStorage.getItem("v2ex-config");
        if (configStr) {
          let configObj = JSON.parse(configStr);
          configObj = configObj[window.user.username ?? "default"];
          if (configObj) {
            window.config = Object.assign(window.config, configObj);
          }
        }
        resolve(window.config);
      });
    }
    function addSettingText() {
      let setting = $(`<a href="javascript:void 0;" class="top ${window.config.version < window.currentVersion ? "new" : ""}">脚本设置</a>`);
      setting.on("click", function() {
        this.classList.remove("new");
        cbChecker({ type: "openSetting" });
      });
      $(".tools").prepend(setting);
    }
    async function init() {
      window.addEventListener("error", (e2) => {
        let dom = e2.target;
        let originImgUrl = dom.getAttribute("data-originurl");
        if (originImgUrl) {
          let a = document.createElement("a");
          a.href = originImgUrl;
          a.setAttribute("notice", "此标签由v2ex超级增强脚本转换图片失败后恢复");
          a.innerText = originImgUrl;
          dom.parentNode.replaceChild(a, dom);
        }
      }, true);
      if (window.isNight) {
        document.documentElement.classList.add("dark");
      }
      checkPageType();
      initMonkeyMenu();
      let top2 = document.querySelector(".tools .top:nth-child(2)");
      if (top2 && top2.textContent !== "注册") {
        window.user.username = top2.textContent;
        window.user.avatar = $("#Rightbar .box .avatar").attr("src");
      }
      initConfig().then((r2) => {
        addSettingText();
        initStyle();
        try {
          if (window.config.autoSignin && window.user.username) {
            qianDao();
          }
        } catch (e2) {
          console.log("签到失败");
        }
        if (window.user.username)
          ;
      });
      let box;
      let list;
      console.log(window.pageType);
      switch (window.pageType) {
        case PageType.Node:
          box = window.win().doc.querySelectorAll("#Wrapper #Main .box");
          let topics = box[1].querySelector("#TopicsNode");
          list = topics.querySelectorAll(".cell");
          list[0].before($section);
          break;
        case PageType.Home:
          box = document.querySelector("#Wrapper #Main .box");
          list = box.querySelectorAll(".item");
          list[0].before($section);
          break;
        case PageType.Post:
          box = document.querySelector("#Wrapper #Main .box");
          box.after($section);
          if (window.config.postWidth) {
            let Main = $("#Main");
            Main.css({
              "width": window.config.postWidth,
              margin: "unset"
            });
            $("#Wrapper > .content").css({
              "max-width": "unset",
              display: "flex",
              "justify-content": "center",
              gap: "20px"
            });
            Main.after($("#Rightbar"));
          }
          let post = window.clone(window.initPost);
          post.id = window.pageData.id;
          let body = $(window.document.body);
          let htmlText = window.document.documentElement.outerHTML;
          window.parse.parsePostContent(
            post,
            body,
            htmlText
          ).then(async (res) => {
            await functions.cbChecker({ type: "postContent", value: res });
            await window.parse.parseOp(res);
          });
          window.parse.getPostAllReplies(
            post,
            body,
            htmlText,
            window.pageData.pageNo
          ).then(async (res1) => {
            await functions.cbChecker({ type: "postReplies", value: res1 });
          });
          break;
        case PageType.Member:
          box = document.querySelector("#Wrapper #Main .box");
          window.targetUserName = box[0].querySelector("h1").textContent;
          if (window.config.openTag) {
            box[0].style.borderBottom = "none";
            box[0].style["border-bottom-left-radius"] = "0";
            box[0].style["border-bottom-right-radius"] = "0";
          }
          list = box[1].querySelectorAll(".cell");
          box[0].after($section);
          break;
        default:
          window.stopMe = true;
          cbChecker({ type: "syncData" });
          console.error("未知页面");
          break;
      }
    }
    window.canParseV2exPage = !window.location.search.includes("script");
    if (window.canParseV2exPage) {
      init();
    } else {
      let box = document.querySelector("#Wrapper #Main .box");
      box.after($section);
      window.stopMe = true;
      cbChecker({ type: "syncData" });
      if (window.location.search.includes("script=0")) {
        cbChecker({ type: "warningNotice", value: "脚本无法查看此主题，已为您单独打开此主题" });
      }
      if (window.location.search.includes("script=1")) {
        cbChecker({ type: "warningNotice", value: "由于回复数量较多，已为您单独打开此主题并停止解析楼中楼" });
      }
    }
  }
  if (!isMobile) {
    (o=>{if(typeof GM_addStyle=="function"){GM_addStyle(o);return}const r=document.createElement("style");r.textContent=o,document.head.append(r)})(' .tip[data-v-ee672411]{position:fixed;font-size:1.6rem;z-index:9999;max-width:10rem;border-radius:.5rem;padding:1rem;color:var(--color-font-8);background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow)}.v-enter-active[data-v-e7c0fbef],.v-leave-active[data-v-e7c0fbef]{transition:opacity .3s ease}.v-enter-from[data-v-e7c0fbef],.v-leave-to[data-v-e7c0fbef]{opacity:0}.username[data-v-e7c0fbef]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-e7c0fbef]{font-weight:700;color:var(--color-font-8)}.owner[data-v-e7c0fbef]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-e7c0fbef]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-e7c0fbef]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag:hover .remove[data-v-e7c0fbef]{display:inline}.my-tag .remove[data-v-e7c0fbef]{cursor:pointer;margin-left:.5rem;display:none}.add-tag[data-v-e7c0fbef]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;cursor:pointer;position:absolute;display:none}.floor[data-v-e7c0fbef]{margin-left:1rem;font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;background-color:var(--color-floor);color:var(--color-floor-font);padding:3px 9px;cursor:default}[data-v-e7c0fbef]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-e7c0fbef]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-e7c0fbef],body[data-v-e7c0fbef]{font-size:62.5%}[data-v-e7c0fbef]::-webkit-scrollbar{width:1rem;height:1rem}[data-v-e7c0fbef]::-webkit-scrollbar-track{background:transparent;border-radius:.2rem}[data-v-e7c0fbef]::-webkit-scrollbar-thumb{background:var(--color-scrollbar);border-radius:1rem}.flex[data-v-e7c0fbef]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-e7c0fbef]{justify-content:flex-end}.flex-center[data-v-e7c0fbef]{justify-content:center}.p1[data-v-e7c0fbef]{padding:1rem}.p2[data-v-e7c0fbef]{padding:2rem}.p0[data-v-e7c0fbef]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-e7c0fbef]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-e7c0fbef]{text-decoration:none;cursor:pointer}a[data-v-e7c0fbef]:hover{text-decoration:underline}.tool[data-v-e7c0fbef]{position:relative;display:flex;align-items:center;border-radius:.3rem;cursor:pointer;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-e7c0fbef]{width:1.6rem!important;height:1.6rem!important}.tool[data-v-e7c0fbef]:hover{background:var(--color-third-bg)}.tool.no-hover[data-v-e7c0fbef]{cursor:default}.tool.no-hover[data-v-e7c0fbef]:hover{background:unset!important}.tool.disabled[data-v-e7c0fbef]{cursor:not-allowed}.tool.disabled[data-v-e7c0fbef]:hover{background:unset!important}.my-node[data-v-e7c0fbef]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5;cursor:pointer}.my-node[data-v-e7c0fbef]:hover{text-decoration:none;background:#e2e2e2}.msgs[data-v-e7c0fbef]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-e7c0fbef]{box-shadow:0 2px 3px #0000001a;box-shadow:#00000014 0 4px 12px;border-radius:var(--box-border-radius);background:var(--box-background-color);margin-bottom:2rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-cell[data-v-e7c0fbef]{color:var(--color-font);padding:.8rem 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-e7c0fbef]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-e7c0fbef]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-e7c0fbef]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-e7c0fbef]{position:relative}.modal .mask[data-v-e7c0fbef]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-e7c0fbef]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-e7c0fbef]{cursor:pointer;background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-e7c0fbef]:first-child{border-left:none}.radio-group2 .active[data-v-e7c0fbef]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-e7c0fbef]{position:relative;display:inline-flex;justify-content:center}input[data-v-e7c0fbef]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-e7c0fbef]:hover{border:1px solid var(--color-input-border-hover)}input[data-v-e7c0fbef]:focus{border:1px solid var(--color-active)}.danger[data-v-e7c0fbef]{color:red!important}.switch[data-v-e7c0fbef]{width:4.5rem;height:2.2rem;border-radius:2rem;position:relative;display:flex;align-items:center;background:var(--color-swtich-bg);transition:all .3s}.switch.active[data-v-e7c0fbef]{background:var(--color-active)}.switch.active[data-v-e7c0fbef]:before{right:.2rem}.switch[data-v-e7c0fbef]:before{position:absolute;content:" ";transition:all .3s;right:calc(100% - 2rem);width:1.8rem;height:1.8rem;background:white;border-radius:50%}.setting-modal .modal-root[data-v-0c0fac4f]{z-index:9;background:var(--color-main-bg);border-radius:1.6rem;font-size:1.4rem;overflow:hidden;color:var(--color-font-pure)}.setting-modal .modal-root .modal-header[data-v-0c0fac4f]{padding:2.4rem;display:flex;justify-content:space-between}.setting-modal .modal-root .modal-header .title[data-v-0c0fac4f]{font-size:2.6rem;font-weight:700;text-align:left;margin-bottom:0}.setting-modal .modal-root .modal-header i[data-v-0c0fac4f]{cursor:pointer;font-size:2.2rem}.setting-modal .modal-root .body[data-v-0c0fac4f]{width:45vw;height:70vh;display:flex}.setting-modal .modal-root .body .left[data-v-0c0fac4f]{display:flex;flex-direction:column;justify-content:space-between;align-items:center;font-size:1.8rem}.setting-modal .modal-root .body .left .tabs[data-v-0c0fac4f]{padding:1rem 2rem;display:flex;flex-direction:column;gap:1rem}.setting-modal .modal-root .body .left .tabs .tab[data-v-0c0fac4f]{cursor:pointer;padding:1rem 1.5rem;border-radius:.8rem;display:flex;align-items:center;gap:1rem}.setting-modal .modal-root .body .left .tabs .tab.active[data-v-0c0fac4f]{background:var(--color-item-bg)}.setting-modal .modal-root .body .modal-content[data-v-0c0fac4f]{background:var(--color-second-bg);flex:1;height:100%;box-sizing:border-box;padding:1rem 1rem 1rem 2rem;border-radius:1.6rem;display:flex}.setting-modal .modal-root .body .modal-content .scroll[data-v-0c0fac4f]{flex:1;padding-right:1rem;overflow:auto}.setting-modal .modal-root .body .modal-content .scroll .row[data-v-0c0fac4f]{min-height:5rem;display:flex;justify-content:space-between;align-items:center}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper[data-v-0c0fac4f]{height:3rem;flex:1;display:flex;justify-content:flex-end;align-items:center;gap:var(--space)}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper span[data-v-0c0fac4f]{text-align:right;font-size:1.4rem;color:gray}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper .set-key[data-v-0c0fac4f]{align-items:center}.setting-modal .modal-root .body .modal-content .scroll .row .wrapper .set-key input[data-v-0c0fac4f]{width:15rem;box-sizing:border-box;margin-right:1rem;height:2.8rem;outline:none;font-size:1.6rem;border:1px solid gray;border-radius:.3rem;padding:0 .5rem;background:var(--color-second-bg);color:var(--color-font-1)}.setting-modal .modal-root .body .modal-content .scroll .row .main-title[data-v-0c0fac4f]{font-size:2.2rem;font-weight:700;color:var(--color-font-8)}.setting-modal .modal-root .body .modal-content .scroll .row .item-title[data-v-0c0fac4f]{font-size:1.8rem}.setting-modal .modal-root .body .modal-content .scroll .desc[data-v-0c0fac4f]{margin-bottom:1rem;font-size:1.4rem;text-align:left;color:var(--color-font)}.setting-modal .modal-root .body .modal-content .scroll .project-desc[data-v-0c0fac4f]{text-align:start;font-size:1.6rem;padding-bottom:10rem}.setting-modal .modal-root .body .modal-content .scroll .line[data-v-0c0fac4f]{border-bottom:1px solid #c4c3c3}.loading[data-v-2697baa2]{border:2px solid;border-color:var(--color-loading-2) var(--color-loading-1) var(--color-loading-1) var(--color-loading-1);border-radius:100%;animation:circle-2697baa2 infinite 1s linear;width:2rem;height:2rem}.loading.small[data-v-2697baa2]{width:1.2rem;height:1.2rem}.loading.large[data-v-2697baa2]{width:3rem;height:3rem}@keyframes circle-2697baa2{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.base-button[data-v-5a7d79ba]{cursor:pointer;border-radius:.6rem;padding:0 1.5rem;display:inline-flex;align-items:center;justify-content:center;transition:all .3s;height:3.6rem;line-height:1;position:relative}.base-button .loading[data-v-5a7d79ba]{position:absolute}.base-button.disabled[data-v-5a7d79ba]{opacity:.6;cursor:not-allowed;-webkit-user-select:none;user-select:none}.base-button.small[data-v-5a7d79ba]{height:3rem}.base-button.small>span[data-v-5a7d79ba]{font-size:1.3rem}.base-button.large[data-v-5a7d79ba]{height:5rem;font-size:1.8rem;padding:0 2.2rem}.base-button.large>span[data-v-5a7d79ba]{font-size:1.8rem}.base-button[data-v-5a7d79ba]:hover:not(.link){opacity:.7}.base-button.primary[data-v-5a7d79ba]{background:var(--color-active)}.base-button.primary>span[data-v-5a7d79ba]{color:#fff}.base-button.gary[data-v-5a7d79ba]{background:#4b5563}.base-button.link[data-v-5a7d79ba]{border-radius:0;border-bottom:2px solid transparent}.base-button.link>span[data-v-5a7d79ba]{color:var(--color-font-8)}.base-button.link[data-v-5a7d79ba]:hover{border-bottom:2px solid var(--color-font-8)}.base-button.active[data-v-5a7d79ba]{opacity:.4}.key-notice[data-v-5a7d79ba]{margin-left:1rem;display:flex;align-items:center;justify-content:center;font-size:1.2rem;color:#fff}.key-notice .key[data-v-5a7d79ba]{transform:scale(.8)}.pop-confirm-content[data-v-05424197]{position:fixed;background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow);color:var(--color-font-8);padding:1.5rem;border-radius:.8rem;transform:translate(-50%,calc(-100% - 1rem));z-index:999}.pop-confirm-content .text[data-v-05424197]{text-align:start;font-size:1.6rem;width:15rem;min-width:15rem}.pop-confirm-content .options[data-v-05424197]{margin-top:1.5rem;display:flex;justify-content:flex-end;align-items:center;gap:1rem}.Author[data-v-c450f45f]{display:flex;align-items:center;justify-content:space-between;font-size:1.2rem;position:relative}.Author.expand[data-v-c450f45f]{margin-bottom:0}.Author .Author-left[data-v-c450f45f]{display:flex;align-items:center;max-width:65%;word-break:break-all}.Author .Author-left .username[data-v-c450f45f]{font-size:1.4rem;margin-right:1rem}.Author .Author-left .expand-icon[data-v-c450f45f]{cursor:pointer;margin-right:.8rem;width:2rem;height:2rem;transform:rotate(90deg)}.Author .Author-left .avatar[data-v-c450f45f]{margin-right:1rem;display:flex}.Author .Author-left .avatar img[data-v-c450f45f]{width:2.8rem;height:2.8rem;border-radius:.4rem}.Author .Author-left .texts[data-v-c450f45f]{flex:1}.Author .Author-left .owner[data-v-c450f45f]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.Author .Author-left .dup[data-v-c450f45f]{display:inline-block;background-color:transparent;color:red;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid red;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.Author .Author-left .mod[data-v-c450f45f]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.Author:hover .add-tag[data-v-c450f45f]{display:inline-block}.Author .Author-right[data-v-c450f45f]{position:absolute;right:0;display:flex;align-items:center}.Author .Author-right .toolbar[data-v-c450f45f]{display:flex;align-items:center;color:var(--color-gray);opacity:0;font-weight:700;gap:1rem}.Author .Author-right .toolbar[data-v-c450f45f]:hover{opacity:1}.post-editor-wrapper[data-v-fb753464]{width:100%;box-sizing:border-box;position:relative;overflow:hidden;transition:all .3s;color:var(--color-font)}.post-editor-wrapper.reply-post .post-editor[data-v-fb753464]{border:1px solid var(--color-line)}.post-editor-wrapper.reply-post.isFocus .post-editor[data-v-fb753464]{border:1px solid var(--color-active)}.post-editor-wrapper.reply-comment[data-v-fb753464]{border-radius:var(--box-border-radius);overflow:hidden;border:1px solid var(--color-line)}.post-editor-wrapper.reply-comment.isFocus[data-v-fb753464]{border:1px solid var(--color-active)}.post-editor-wrapper.reply-comment .toolbar[data-v-fb753464]{background:var(--color-editor-toolbar)}.post-editor-wrapper .post-editor[data-v-fb753464]{border-radius:var(--box-border-radius);transition:border .3s;width:100%;max-width:100%;padding:.6rem 1.4rem;box-sizing:border-box;outline:none;font-family:Avenir,Helvetica,Arial,sans-serif;font-size:1.4rem;min-height:13rem;resize:none;background:var(--box-background-color);color:var(--color-font-pure);border:1px solid transparent}.post-editor-wrapper .toolbar[data-v-fb753464]{box-sizing:border-box;padding:.5rem 1rem;width:100%;position:relative;display:flex;justify-content:space-between;align-items:center}.post-editor-wrapper .toolbar .left[data-v-fb753464]{display:flex;gap:1rem}.post-editor-wrapper .toolbar .left svg[data-v-fb753464]{cursor:pointer}.post-editor-wrapper .toolbar .left .upload input[data-v-fb753464]{cursor:pointer;position:absolute;width:20px;height:20px;opacity:0}.post-editor-wrapper .toolbar span[data-v-fb753464]{color:gray;font-size:1.3rem}.post-editor-wrapper .get-cursor[data-v-fb753464]{border-radius:var(--box-border-radius);transition:border .3s;width:100%;max-width:100%;padding:.6rem 1.4rem;box-sizing:border-box;outline:none;font-family:Avenir,Helvetica,Arial,sans-serif;font-size:1.4rem;min-height:13rem;resize:none;background:var(--box-background-color);color:var(--color-font-pure);border:1px solid transparent;position:absolute;top:0;z-index:-100}.post-editor-wrapper .emoticon-pack[data-v-fb753464]{z-index:999999999;border-radius:1rem;padding:1rem;width:31rem;max-width:31rem;height:30rem;max-height:30rem;overflow:auto;background:var(--color-third-bg);border:1px solid var(--color-font-3);box-shadow:0 9px 24px -3px #0000000f,0 4px 8px -1px #0000001f;position:fixed;bottom:11rem;left:14rem}.post-editor-wrapper .emoticon-pack i[data-v-fb753464]{cursor:pointer;position:absolute;right:2rem;font-size:2rem;color:#e2e2e2}.post-editor-wrapper .emoticon-pack .list[data-v-fb753464]{margin:1rem 0}.post-editor-wrapper .emoticon-pack img[data-v-fb753464]{cursor:pointer;width:3rem;height:3rem;padding:.5rem}.post-editor-wrapper .emoticon-pack span[data-v-fb753464]{display:inline-block;cursor:pointer;font-size:2.3rem;padding:.5rem}.v-enter-active[data-v-2c9a538c],.v-leave-active[data-v-2c9a538c]{transition:opacity .3s ease}.v-enter-from[data-v-2c9a538c],.v-leave-to[data-v-2c9a538c]{opacity:0}.username[data-v-2c9a538c]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-2c9a538c]{font-weight:700;color:var(--color-font-8)}.owner[data-v-2c9a538c]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-2c9a538c]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-2c9a538c]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag:hover .remove[data-v-2c9a538c]{display:inline}.my-tag .remove[data-v-2c9a538c]{cursor:pointer;margin-left:.5rem;display:none}.add-tag[data-v-2c9a538c]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;cursor:pointer;position:absolute;display:none}.floor[data-v-2c9a538c]{margin-left:1rem;font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;background-color:var(--color-floor);color:var(--color-floor-font);padding:3px 9px;cursor:default}[data-v-2c9a538c]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-2c9a538c]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-2c9a538c],body[data-v-2c9a538c]{font-size:62.5%}[data-v-2c9a538c]::-webkit-scrollbar{width:1rem;height:1rem}[data-v-2c9a538c]::-webkit-scrollbar-track{background:transparent;border-radius:.2rem}[data-v-2c9a538c]::-webkit-scrollbar-thumb{background:var(--color-scrollbar);border-radius:1rem}.flex[data-v-2c9a538c]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-2c9a538c]{justify-content:flex-end}.flex-center[data-v-2c9a538c]{justify-content:center}.p1[data-v-2c9a538c]{padding:1rem}.p2[data-v-2c9a538c]{padding:2rem}.p0[data-v-2c9a538c]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-2c9a538c]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-2c9a538c]{text-decoration:none;cursor:pointer}a[data-v-2c9a538c]:hover{text-decoration:underline}.tool[data-v-2c9a538c]{position:relative;display:flex;align-items:center;border-radius:.3rem;cursor:pointer;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-2c9a538c]{width:1.6rem!important;height:1.6rem!important}.tool[data-v-2c9a538c]:hover{background:var(--color-third-bg)}.tool.no-hover[data-v-2c9a538c]{cursor:default}.tool.no-hover[data-v-2c9a538c]:hover{background:unset!important}.tool.disabled[data-v-2c9a538c]{cursor:not-allowed}.tool.disabled[data-v-2c9a538c]:hover{background:unset!important}.my-node[data-v-2c9a538c]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5;cursor:pointer}.my-node[data-v-2c9a538c]:hover{text-decoration:none;background:#e2e2e2}.msgs[data-v-2c9a538c]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-2c9a538c]{box-shadow:0 2px 3px #0000001a;box-shadow:#00000014 0 4px 12px;border-radius:var(--box-border-radius);background:var(--box-background-color);margin-bottom:2rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-cell[data-v-2c9a538c]{color:var(--color-font);padding:.8rem 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-2c9a538c]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-2c9a538c]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-2c9a538c]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-2c9a538c]{position:relative}.modal .mask[data-v-2c9a538c]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-2c9a538c]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-2c9a538c]{cursor:pointer;background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-2c9a538c]:first-child{border-left:none}.radio-group2 .active[data-v-2c9a538c]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-2c9a538c]{position:relative;display:inline-flex;justify-content:center}input[data-v-2c9a538c]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-2c9a538c]:hover{border:1px solid var(--color-input-border-hover)}input[data-v-2c9a538c]:focus{border:1px solid var(--color-active)}.danger[data-v-2c9a538c]{color:red!important}.html-wrapper[data-v-2c9a538c]{position:relative}.html-wrapper .mask[data-v-2c9a538c]{max-height:90rem;overflow:hidden;-webkit-mask-image:linear-gradient(180deg,#000 80%,transparent)}.html-wrapper .expand[data-v-2c9a538c]{position:absolute;z-index:1;bottom:2rem;padding:.2rem 1.5rem;border-radius:2rem;border:1px solid gray;background:white;color:gray;left:50%;transform:translate(-50%);cursor:pointer}.comment[data-v-888958af]{width:100%;box-sizing:border-box;margin-top:.6rem}.comment.isLevelOne[data-v-888958af]{border-bottom:1px solid var(--color-line);padding:.8rem 1rem;margin-top:0}.comment.ding[data-v-888958af]{background:rgba(255,255,0,.3)!important}.comment.isSimple .avatar[data-v-888958af],.comment.isSimple .expand-line[data-v-888958af]{display:none}.comment.isSimple .simple-wrapper[data-v-888958af]{padding-left:2.8rem}.comment.isSimple .w[data-v-888958af]{padding-left:0!important;padding-top:.5rem}.comment .comment-content-w .more[data-v-888958af]{text-align:center;margin:2rem 0}.comment .comment-content[data-v-888958af]{display:flex;position:relative}.comment .comment-content .expand-line[data-v-888958af]{cursor:pointer;margin-top:.6rem;width:2.8rem;min-width:2.8rem;position:relative}.comment .comment-content .expand-line[data-v-888958af]:after{position:absolute;left:50%;content:" ";height:100%;width:0;border-right:1px solid var(--color-line)}.comment .comment-content .expand-line[data-v-888958af]:hover:after{border-right:2px solid var(--color-active)}.comment .comment-content .right[data-v-888958af]{flex:1;width:calc(100% - 3rem)}.comment .comment-content .right .w[data-v-888958af]{padding-left:1rem}.comment .comment-content .right .w .post-editor-wrapper[data-v-888958af]{margin-top:1rem}.wrong-wrapper[data-v-888958af]{font-size:1.4rem;margin-bottom:1rem}.wrong-wrapper span[data-v-888958af]{cursor:pointer}.wrong-wrapper .del-line[data-v-888958af]{text-decoration:line-through}.wrong-wrapper .wrong-icon[data-v-888958af]{margin-left:.5rem}.wrong-wrapper .warning[data-v-888958af]{border-top:1px solid #e1e1e1;border-bottom:1px solid #e1e1e1;padding:1rem 0;margin-top:1rem;font-size:1.2rem;color:red}.toolbar[data-v-c98b8c46]{border-top:1px solid var(--color-line);height:3.8rem;padding-left:.6rem;display:flex;align-items:center;color:var(--color-gray);font-size:1.2rem;font-weight:700;gap:1rem}.comment[data-v-953d8ab1]{width:100%;box-sizing:border-box;display:flex;gap:1rem;padding:1rem;border-bottom:1px solid var(--color-line)}.comment.isSimple .avatar[data-v-953d8ab1]{display:none}.comment.isSimple .reply_content[data-v-953d8ab1]{margin-top:.5rem!important}.comment .avatar[data-v-953d8ab1]{display:flex}.comment .avatar img[data-v-953d8ab1]{width:3.8rem;height:3.8rem;border-radius:.3rem}.comment .comment-body[data-v-953d8ab1]{flex:1;display:flex;flex-direction:column}.comment .comment-body .texts[data-v-953d8ab1]{display:flex;align-items:center}.comment .comment-body .reply_content[data-v-953d8ab1]{margin-top:1rem;max-width:calc(100% - 5rem)}.comment .isRight[data-v-953d8ab1]{align-items:flex-end}.comment .isRight .owner[data-v-953d8ab1],.comment .isRight .mod[data-v-953d8ab1],.comment .isRight .username[data-v-953d8ab1]{margin:0 0 0 1rem}.comment .Author-right[data-v-953d8ab1]{display:flex;flex-direction:column;align-items:center}.comment .Author-right .floor[data-v-953d8ab1]{margin-left:0}.comment .Author-right .jump[data-v-953d8ab1]{color:#929596;margin-top:.4rem;font-size:1.4rem}.comment .point[data-v-953d8ab1]{margin:0 .5rem;font-size:1.4rem;display:flex;gap:.5rem;align-items:center;font-weight:700;color:#000}.sticky{position:sticky;bottom:-2px;z-index:2;background:var(--box-background-hover-color)!important}.sticky[stuck]{box-shadow:0 2px 20px #00000059!important}.v-enter-active[data-v-7f8ab1e3],.v-leave-active[data-v-7f8ab1e3]{transition:opacity .3s ease}.v-enter-from[data-v-7f8ab1e3],.v-leave-to[data-v-7f8ab1e3]{opacity:0}.username[data-v-7f8ab1e3]{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num[data-v-7f8ab1e3]{font-weight:700;color:var(--color-font-8)}.owner[data-v-7f8ab1e3]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod[data-v-7f8ab1e3]{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag[data-v-7f8ab1e3]{font-size:1.4rem;color:red;margin-left:1rem}.my-tag:hover .remove[data-v-7f8ab1e3]{display:inline}.my-tag .remove[data-v-7f8ab1e3]{cursor:pointer;margin-left:.5rem;display:none}.add-tag[data-v-7f8ab1e3]{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;cursor:pointer;position:absolute;display:none}.floor[data-v-7f8ab1e3]{margin-left:1rem;font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;background-color:var(--color-floor);color:var(--color-floor-font);padding:3px 9px;cursor:default}[data-v-7f8ab1e3]:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark[data-v-7f8ab1e3]{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html[data-v-7f8ab1e3],body[data-v-7f8ab1e3]{font-size:62.5%}[data-v-7f8ab1e3]::-webkit-scrollbar{width:1rem;height:1rem}[data-v-7f8ab1e3]::-webkit-scrollbar-track{background:transparent;border-radius:.2rem}[data-v-7f8ab1e3]::-webkit-scrollbar-thumb{background:var(--color-scrollbar);border-radius:1rem}.flex[data-v-7f8ab1e3]{display:flex;align-items:center;justify-content:space-between}.flex-end[data-v-7f8ab1e3]{justify-content:flex-end}.flex-center[data-v-7f8ab1e3]{justify-content:center}.p1[data-v-7f8ab1e3]{padding:1rem}.p2[data-v-7f8ab1e3]{padding:2rem}.p0[data-v-7f8ab1e3]{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http][data-v-7f8ab1e3]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a[data-v-7f8ab1e3]{text-decoration:none;cursor:pointer}a[data-v-7f8ab1e3]:hover{text-decoration:underline}.tool[data-v-7f8ab1e3]{position:relative;display:flex;align-items:center;border-radius:.3rem;cursor:pointer;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg[data-v-7f8ab1e3]{width:1.6rem!important;height:1.6rem!important}.tool[data-v-7f8ab1e3]:hover{background:var(--color-third-bg)}.tool.no-hover[data-v-7f8ab1e3]{cursor:default}.tool.no-hover[data-v-7f8ab1e3]:hover{background:unset!important}.tool.disabled[data-v-7f8ab1e3]{cursor:not-allowed}.tool.disabled[data-v-7f8ab1e3]:hover{background:unset!important}.my-node[data-v-7f8ab1e3]{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5;cursor:pointer}.my-node[data-v-7f8ab1e3]:hover{text-decoration:none;background:#e2e2e2}.msgs[data-v-7f8ab1e3]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box[data-v-7f8ab1e3]{box-shadow:0 2px 3px #0000001a;box-shadow:#00000014 0 4px 12px;border-radius:var(--box-border-radius);background:var(--box-background-color);margin-bottom:2rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-cell[data-v-7f8ab1e3]{color:var(--color-font);padding:.8rem 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal[data-v-7f8ab1e3]{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title[data-v-7f8ab1e3]{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option[data-v-7f8ab1e3]{display:flex;align-items:center;padding:.6rem 0}.modal .option>span[data-v-7f8ab1e3]{position:relative}.modal .mask[data-v-7f8ab1e3]{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2[data-v-7f8ab1e3]{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio[data-v-7f8ab1e3]{cursor:pointer;background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio[data-v-7f8ab1e3]:first-child{border-left:none}.radio-group2 .active[data-v-7f8ab1e3]{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm[data-v-7f8ab1e3]{position:relative;display:inline-flex;justify-content:center}input[data-v-7f8ab1e3]{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input[data-v-7f8ab1e3]:hover{border:1px solid var(--color-input-border-hover)}input[data-v-7f8ab1e3]:focus{border:1px solid var(--color-active)}.danger[data-v-7f8ab1e3]{color:red!important}.Post[data-v-7f8ab1e3]{position:unset!important;background:transparent!important;overflow:unset!important}.Post .main[data-v-7f8ab1e3]{background:transparent!important;padding:unset!important;width:100%!important}.Post .close-btn[data-v-7f8ab1e3]{display:none}.post-detail[data-v-7f8ab1e3]{text-align:start;position:fixed;z-index:99;left:0;right:0;bottom:0;top:0;background:rgba(46,47,48,.8);overflow:auto;font-size:1.4rem;display:flex;justify-content:center;flex-wrap:wrap}.post-detail[data-v-7f8ab1e3] .subtle{background-color:#ecfdf5e6;border-left:4px solid #a7f3d0}.post-detail.isNight[data-v-7f8ab1e3] .subtle{background-color:#1a3332;border-left:4px solid #047857}.post-detail .main[data-v-7f8ab1e3]{display:flex;justify-content:flex-end;padding:3rem 8rem 15rem;background:var(--color-main-bg);position:relative;outline:none}.post-detail .main .main-wrapper[data-v-7f8ab1e3]{width:77rem;padding-bottom:2rem;display:flex;flex-direction:column;align-items:center;position:relative}.post-detail .main .main-wrapper .post-wrapper .header:hover .add-tag[data-v-7f8ab1e3]{display:inline-block}.post-detail .main .main-wrapper .loading-wrapper[data-v-7f8ab1e3]{height:20rem;display:flex;justify-content:center;align-items:center}.post-detail .main .main-wrapper #no-comments-yet[data-v-7f8ab1e3]{color:#a9a9a9;font-weight:700;text-align:center;width:100%;margin-bottom:2rem;box-sizing:border-box}.post-detail .main .relationReply[data-v-7f8ab1e3]{position:fixed;width:25vw;top:6.5rem;bottom:15rem;z-index:100;transform:translate(calc(100% + 2rem));font-size:2rem;overflow:hidden}.post-detail .main .relationReply .my-cell[data-v-7f8ab1e3]{background:var(--color-second-bg);border-radius:var(--box-border-radius) var(--box-border-radius) 0 0}.post-detail .main .relationReply .comments[data-v-7f8ab1e3]{max-height:calc(100% - 4.2rem);overflow:auto;background:var(--color-second-bg);border-radius:0 0 var(--box-border-radius) var(--box-border-radius)}.post-detail .main .call-list[data-v-7f8ab1e3]{z-index:9;position:absolute;top:12rem;border:1px solid var(--color-main-bg);background:var(--color-call-list-bg);box-shadow:0 5px 15px #0000001a;overflow:auto;max-height:30rem;border-radius:var(--box-border-radius);min-width:8rem;box-sizing:content-box}.post-detail .main .call-list .call-item[data-v-7f8ab1e3]{border-top:1px solid var(--color-main-bg);height:3rem;display:flex;padding:0 1rem;align-items:center;cursor:pointer;font-size:14px;box-sizing:border-box}.post-detail .main .call-list .call-item .select[data-v-7f8ab1e3],.post-detail .main .call-list .call-item[data-v-7f8ab1e3]:hover,.post-detail .main .call-list .call-item.select[data-v-7f8ab1e3]{background:var(--color-main-bg);text-decoration:none}.post-detail .main .call-list .call-item[data-v-7f8ab1e3]:nth-child(1){border-top:1px solid transparent}@media screen and (max-width: 1500px){.post-detail .main-wrapper[data-v-7f8ab1e3]{width:65vw!important}}@media screen and (max-width: 1280px){.post-detail .main-wrapper[data-v-7f8ab1e3]{width:75vw!important}}@media screen and (max-width: 960px){.post-detail .main-wrapper[data-v-7f8ab1e3]{width:100vw!important}}.post-detail .scroll-top[data-v-7f8ab1e3]{cursor:pointer;position:fixed;border-radius:.6rem;display:flex;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;transform:translate(6rem);font-size:2rem;background:var(--color-sp-btn-bg)}.post-detail .refresh[data-v-7f8ab1e3]{cursor:pointer;position:fixed;border-radius:.6rem;display:flex;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;transform:translate(6rem);font-size:2rem;background:var(--color-sp-btn-bg);bottom:23.5rem}.post-detail .scroll-to[data-v-7f8ab1e3]{cursor:pointer;position:fixed;border-radius:.6rem;align-items:center;justify-content:center;bottom:10rem;z-index:99;padding:.8rem 0;gap:1rem;width:4.5rem;transform:translate(6rem);font-size:2rem;background:var(--color-sp-btn-bg);bottom:15rem;display:flex;flex-direction:column}.post-detail .scroll-to input[data-v-7f8ab1e3]{height:2.6rem;width:3.6rem;font-size:1.4rem;text-align:center;color:gray}.post-detail .read-notice[data-v-7f8ab1e3]{display:flex;align-items:center;color:gray}.post-detail .read-notice .jump[data-v-7f8ab1e3]{background:var(--color-third-bg);color:gray;padding:.3rem 1rem;border-radius:.4rem;margin:0 1rem;cursor:pointer}.post-detail .close-btn[data-v-7f8ab1e3]{color:#b6b6b6;cursor:pointer;position:fixed;top:3rem;transform:translate(4rem);font-size:2rem}.post-detail .top-reply[data-v-7f8ab1e3]{color:var(--color-font-3);cursor:pointer;font-size:2rem;display:flex}.post-detail .top-reply i[data-v-7f8ab1e3]{padding:0 1rem}.base64_tooltip[data-v-618144eb]{box-shadow:0 3px 6px -4px #0000001f,0 6px 16px #00000014,0 9px 28px 8px #0000000d;background:var(--color-third-bg);min-height:2.2rem;max-width:20rem;padding:1rem;position:fixed;z-index:9998;display:flex;align-items:center;border-radius:.5rem;cursor:pointer;line-break:anywhere;font-size:1.4rem;color:var(--color-font-8)}.base64_tooltip svg[data-v-618144eb]{margin-left:1rem;min-width:1.8rem}.base64_tooltip[data-v-618144eb] .base-button{margin-left:1rem;margin-top:1rem}.msg[data-v-defce7f2]{cursor:default;margin-bottom:2rem;display:flex;font-size:1.4rem;box-sizing:border-box;border-radius:var(--box-border-radius);color:var(--color-font-8);background:var(--color-tooltip-bg);box-shadow:0 0 6px 1px var(--color-tooltip-shadow)}.msg.success .left[data-v-defce7f2]{background:var(--color-active)}.msg.warning .left[data-v-defce7f2]{background:#c8c002}.msg.error .left[data-v-defce7f2]{background:red}.msg .left[data-v-defce7f2]{border-radius:var(--box-border-radius) 0 0 var(--box-border-radius);display:flex;align-items:center;background:var(--color-active)}.msg .left svg[data-v-defce7f2]{margin:0 .3rem;cursor:pointer}.msg .right[data-v-defce7f2]{flex:1;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center}.tag-modal .wrapper[data-v-674b86aa]{z-index:9;background:var(--color-main-bg);color:var(--color-font-8);border-radius:1.6rem;font-size:1.4rem;padding:2rem 4rem;width:25rem}.tag-modal .wrapper .title[data-v-674b86aa]{font-weight:700}.tag-modal .wrapper .btns[data-v-674b86aa]{margin-top:1.5rem;display:flex;justify-content:flex-end;align-items:center;gap:1.5rem;font-size:1.4rem}.msgs[data-v-b73f4332]{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.tag-modal .modal-root[data-v-882b932b]{z-index:9;background:var(--color-second-bg);color:var(--color-font-8);border-radius:1.6rem;font-size:1.4rem;width:50vw;height:70vh;display:flex;flex-direction:column}.tag-modal .modal-root .modal-header[data-v-882b932b]{padding:2.4rem;display:flex;justify-content:space-between}.tag-modal .modal-root .modal-header .title[data-v-882b932b]{font-size:2.6rem;font-weight:700;text-align:left;margin-bottom:0}.tag-modal .modal-root .modal-header i[data-v-882b932b]{cursor:pointer;font-size:2.2rem}.tag-modal .modal-root .modal-body[data-v-882b932b]{padding:2rem;padding-top:0;flex:1;overflow:auto}.tag-modal .modal-root .modal-body[data-v-882b932b] .cell{padding:2rem}.v-enter-active,.v-leave-active{transition:opacity .3s ease}.v-enter-from,.v-leave-to{opacity:0}.username{font-weight:700;font-size:1.4rem;margin-right:1rem}.link-num{font-weight:700;color:var(--color-font-8)}.owner{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;margin-right:1rem;transform:scale(.8)}.mod{display:inline-block;background-color:transparent;color:#1484cd;border-radius:.3rem;padding:0 .3rem;cursor:default;border:2px solid #1484cd;font-size:1.2rem;font-weight:700;transform:scale(.8);background:#1484cd;color:#fff;margin-right:1rem}.my-tag{font-size:1.4rem;color:red;margin-left:1rem}.my-tag:hover .remove{display:inline}.my-tag .remove{cursor:pointer;margin-left:.5rem;display:none}.add-tag{font-size:2.4rem;transform:translateY(.2rem);line-height:1rem;display:inline-block;margin-left:1rem;cursor:pointer;position:absolute;display:none}.floor{margin-left:1rem;font-size:1.1rem;line-height:1rem;border-radius:.5rem;display:inline-block;background-color:var(--color-floor);color:var(--color-floor-font);padding:3px 9px;cursor:default}:root{--color-main-bg: #e2e2e2;--color-second-bg: white;--color-third-bg: #e2e2e2;--color-item-bg: white;--color-swtich-bg: #dcdfe6;--color-active: #409eff;--color-font: #999;--color-font-8: rgba(0, 0, 0, .8);--color-font-3: rgba(0, 0, 0, .3);--color-font-pure: black;--color-input-bg: white;--color-input-border: #e2e2e2;--color-input-border-hover: #a3a6ad;--color-radio-border: #e2e2e2;--color-tooltip-bg: white;--color-tooltip-shadow: #bbbbbb;--color-scrollbar: #93ade3;--color-line: #e2e2e2;--color-loading-1: #00000033;--color-loading-2: #000;--color-floor: #f0f0f0;--color-floor-font: #bdbdbd;--color-editor-toolbar: #f6f7f8;--color-sp-btn-bg: #f1f1f1;--color-call-list-bg: white}html.dark{--color-main-bg: #22303f;--color-second-bg: #18222d;--color-third-bg: #31475e;--color-item-bg: #18222d;--color-swtich-bg: #4c4d4f;--color-active: #409eff;--color-font: rgba(255, 255, 255, .5);--color-font-8: rgba(255, 255, 255, .8);--color-font-3: rgba(255, 255, 255, .3);--color-font-pure: white;--color-input-bg: #333333;--color-input-border: #6c6e72;--color-input-border-hover: #a3a6ad;--color-radio-border: #454847;--color-tooltip-bg: #31475e;--color-tooltip-shadow: #3b3b3b;--color-scrollbar: #5c5d5e;--color-line: var(--box-border-color);--color-loading-1: rgba(178, 177, 177, .2);--color-loading-2: #ffffff;--color-floor: #293b4d;--color-floor-font: rgba(255, 255, 255, .3);--color-editor-toolbar: var(--box-background-hover-color);--color-sp-btn-bg: #31475e;--color-call-list-bg: #31475e}html,body{font-size:62.5%}::-webkit-scrollbar{width:1rem;height:1rem}::-webkit-scrollbar-track{background:transparent;border-radius:.2rem}::-webkit-scrollbar-thumb{background:var(--color-scrollbar);border-radius:1rem}.flex{display:flex;align-items:center;justify-content:space-between}.flex-end{justify-content:flex-end}.flex-center{justify-content:center}.p1{padding:1rem}.p2{padding:2rem}.p0{padding:0!important}body :is(.topic_content,.reply_content) a[href^=http]{text-underline-offset:.46ex;color:currentcolor;text-decoration:underline 1.5px}a{text-decoration:none;cursor:pointer}a:hover{text-decoration:underline}.tool{position:relative;display:flex;align-items:center;border-radius:.3rem;cursor:pointer;height:2.6rem;padding:0 .5rem;gap:.6rem}.tool>svg{width:1.6rem!important;height:1.6rem!important}.tool:hover{background:var(--color-third-bg)}.tool.no-hover{cursor:default}.tool.no-hover:hover{background:unset!important}.tool.disabled{cursor:not-allowed}.tool.disabled:hover{background:unset!important}.my-node{border-radius:.2rem;padding:.4rem;font-size:1rem;color:#999;background:#f5f5f5;cursor:pointer}.my-node:hover{text-decoration:none;background:#e2e2e2}.msgs{position:fixed;margin-left:calc(50% - 25rem);width:50rem;z-index:9999;bottom:0;left:0;right:0}.my-box{box-shadow:0 2px 3px #0000001a;box-shadow:#00000014 0 4px 12px;border-radius:var(--box-border-radius);background:var(--box-background-color);margin-bottom:2rem;width:100%;overflow:hidden;box-sizing:border-box;transition:background-color .3s}.my-cell{color:var(--color-font);padding:.8rem 1rem;font-size:1.4rem;line-height:150%;text-align:left;border-bottom:1px solid var(--color-line)}.modal{position:fixed;z-index:100;width:100vw;height:100vh;left:0;top:0;display:flex;justify-content:center;align-items:center}.modal .title{font-size:2.4rem;margin-bottom:1rem;text-align:center}.modal .option{display:flex;align-items:center;padding:.6rem 0}.modal .option>span{position:relative}.modal .mask{position:fixed;width:100vw;height:100vh;left:0;top:0;background-color:#1d1c1c47}.radio-group2{display:inline-flex;border-radius:.5rem;overflow:hidden;border:1px solid var(--color-radio-border);background:var(--box-background-alt-color)}.radio-group2 .radio{cursor:pointer;background:transparent;padding:.5rem 1.2rem;border-left:1px solid var(--color-radio-border);font-size:1.3rem;color:var(--color-gray)}.radio-group2 .radio:first-child{border-left:none}.radio-group2 .active{background:var(--color-third-bg);color:var(--color-font)}.pop-confirm{position:relative;display:inline-flex;justify-content:center}input{height:3rem;outline:unset;border:1px solid var(--color-input-border);padding:0 .5rem;border-radius:5px;box-sizing:border-box;transition:all .3s;background:var(--color-input-bg);color:var(--color-font)}input:hover{border:1px solid var(--color-input-border-hover)}input:focus{border:1px solid var(--color-active)}.danger{color:red!important}.target-user-tags[data-v-6c0e87a5]{background:var(--color-second-bg);color:var(--color-font);word-break:break-all;text-align:start;font-size:1.4rem;box-shadow:0 2px 3px #0000001a;border-bottom-left-radius:3px;border-bottom-right-radius:3px}.target-user-tags .add-tag[data-v-6c0e87a5]{display:inline-block}.loaded[data-v-6c0e87a5]{font-size:1.4rem;display:flex;align-items:center;gap:1rem} ');

    console.log("V2EX PC端");
    run();
    let vueApp = vue.createApp(App);
    vueApp.config.unwrapInjectedRef = true;
    vueApp.mount($section);
  }

})(Vue);