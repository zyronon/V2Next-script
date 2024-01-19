<template>
  <Teleport :to="to">
    <div class="mobile-page">
      <NavBar title="设置" @back="$emit('back')"/>
      <div class="page-content ">
        <div class="row">
          <label class="main-title">列表设置</label>
        </div>
        <div class="row">
          <label class="item-title">列表展示方式</label>
          <div class="wrapper">
            <div class="radio-group2">
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

        <div class="row">
          <label class="main-title">主题设置</label>
        </div>

        <div class="row">
          <label class="item-title">回复展示方式</label>
          <div class="wrapper">
            <BaseSelect v-model:display-type="config.commentDisplayType"/>
          </div>
        </div>

        <div class="row">
          <label class="item-title">正文超长自动折叠</label>
          <div class="wrapper">
            <BaseSwitch v-model="config.contentAutoCollapse"/>
          </div>
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

        <div class="row">
          <label class="main-title">其他设置</label>
        </div>
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
          <label class="item-title">收藏时提醒添加到书签</label>
          <div class="wrapper">
            <BaseSwitch v-model="config.collectBrowserNotice"/>
          </div>
        </div>
        <div class="desc">
          V站帐号一旦被封禁，则无法登录，无法查看账号收藏了
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import Tooltip from "../components/Tooltip.vue";
import {CommentDisplayType} from "@v2next/core/types.ts";
import BaseSwitch from "../components/BaseSwitch.vue";
import NavBar from "@/components/NavBar.vue";
import {Icon} from "@iconify/vue";
import BaseSelect from "@/components/BaseSelect.vue";

export default {
  name: "Setting",
  components: {
    BaseSelect,
    NavBar,
    BaseSwitch,
    Tooltip,
    Icon
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
    },
    to: {
      type: String,
      default() {
        return ''
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
}
</script>

<style scoped lang="less">

.row {
  min-height: 4rem;
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
</style>