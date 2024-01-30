<template>
  <Transition>
    <div v-if="show" class="setting-modal modal">
      <div class="mask" @click="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            使用需知
          </div>
          <Icon icon="ic:round-close" @click="close"/>
        </div>
        <div class="body">
          <div class="modal-content">
            <div>开启此功能会带来以下影响</div>
            <div>缺点</div>
            <div style="color: red;">
              <div>1、你的IP可能会被封禁</div>
              <div>2、消耗更多流量，给服务器带来更大的负担</div>
              <div>3、你的V站浏览进度条会变快</div>
            </div>
            <div>优点</div>
            <div>1、卡片模式，无需打开主题即可查看内容</div>
            <div>2、打开主题时提前预览正文内容，无需等待加载</div>
            <div>原理</div>
            <div>1、解析列表所有主题ID，批量调用show.json接口，获取对应主题的正文</div>
            <div>2、请求的主题数据会缓存到本地，不会重复请求，超过3天的数据会删除</div>
            <div>3、前面4条会并发请求，4条以后的一秒请求一条</div>
          </div>
          <div class="btns">
            <BaseButton type="link" @click="close">不同意</BaseButton>
            <BaseButton @click="confirm">同意</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import Tooltip from "../Tooltip.vue";
import BaseSwitch from "../BaseSwitch.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import {Icon} from "@iconify/vue";
import PopConfirm from "@/components/PopConfirm.vue";
import BaseButton from "@/components/BaseButton.vue";

export default {
  name: "Setting",
  components: {
    BaseButton,
    PopConfirm,
    Icon,
    BaseSelect,
    BaseSwitch,
    Tooltip
  },
  inject: ['isNight'],
  props: {
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
    }
  },
  methods: {
    confirm() {
      this.close()
      this.$emit('confirm')
    },
    close() {
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
      padding: 1.4rem;
      display: flex;
      justify-content: center;
      position: relative;

      .title {
        font-size: 2.2rem;
        text-align: left;
        margin-bottom: 0;
      }

      svg {
        position: absolute;
        right: 1rem;
        cursor: pointer;
        font-size: 2.6rem;
      }
    }

    .body {
      width: 60rem;

      .modal-content {
        background: var(--color-second-bg);
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        padding: 1rem 2rem;
        padding-right: 1rem;
        @d: 1.6rem;
        font-size: 1.6rem;
        text-align: left;
        line-height: 1.6;
      }

      .btns {
        margin: 1.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 1.5rem;
        font-size: 1.4rem;
      }
    }
  }
}

</style>