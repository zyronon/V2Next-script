<script setup lang="ts">
import {Icon} from "@iconify/vue";
import FromBottomDialog from "@/components/Modal/FromBottomDialog.vue";
import {copy} from '@/utils/index'
import {ref} from "vue";

let fs = ref(0)
const props = defineProps<{
  modelValue: boolean
  post: any
}>()
const emit = defineEmits<{
  close: [],
  reply: [],
  refresh: [],
  'update:modelValue': [val: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

async function copyLink() {
  let text = props.post.url
  if (await copy(text)) {
    close()
  }
}

async function copyContent() {
  let text = props.post.headerTemplate
  text = $(`<div>${text}</div>`).text()
  if (await copy(text)) {
    close()
  }
}
</script>

<template>
  <from-bottom-dialog page-id="post-detail"
                      height="40rem"
                      :model-value="modelValue"
                      @cancel="emit('update:modelValue',false)">
    <div class="wrapper">
      <div class="options">
        <div class="item">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="ph:share-fat-fill"/>
          </div>
          <span>分享</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="solar:forbidden-circle-outline"/>
          </div>
          <span>忽略</span>
        </div>
        <div class="item" @click="emit('reply'),close()">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="mynaui:message"/>
          </div>
          <span>回复</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="icon-park-outline:like"/>
          </div>
          <span>感谢</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon color="rgb(57,174,85)" icon="iconoir:star"/>
          </div>
          <span>收藏</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon color="black" icon="solar:danger-triangle-outline"/>
          </div>
          <span>报告问题</span>
        </div>
        <div class="item" @click="copyLink">
          <div class="icon-wrap">
            <Icon color="black" icon="solar:link-broken"/>
          </div>
          <span>复制链接</span>
        </div>
        <div class="item" @click="copyContent">
          <div class="icon-wrap">
            <Icon color="black" icon="octicon:copy-24"/>
          </div>
          <span>复制内容</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon color="black" icon="iconoir:page-search"/>
          </div>
          <span>跳转</span>
        </div>
        <div class="item" @click="emit('refresh'),close()">
          <div class="icon-wrap">
            <Icon color="black" icon="ic:round-refresh"/>
          </div>
          <span>刷新</span>
        </div>
      </div>
      <div class="font-size">
        <div class="steps">
          <div class="step" :class="[fs=== 0 && 'active']" @click="fs = 0">
            <div class="text" style="font-size: 1.2rem;">小</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 1 && 'active']" @click="fs = 1">
            <div class="text">标准</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 2 && 'active']" @click="fs = 2">
            <div class="text" style="font-size: 1.8rem;">大</div>
            <div class="point"></div>
          </div>
          <div class="step" :class="[fs=== 3 && 'active']" @click="fs = 3">
            <div class="text" style="font-size: 2.2rem;">特大</div>
            <div class="point"></div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="cancel" @click="close">取消</div>
    </div>
  </from-bottom-dialog>
</template>

<style scoped lang="less">

.wrapper {
  .options {
    padding: 3rem 2rem;
    padding-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-content: space-between;
    gap: 2rem;

    .item {
      //margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: grey;
      font-size: 1.2rem;

      .icon-wrap {
        margin-bottom: .5rem;
        @w: 15vw;
        width: 100%;
        height: @w;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--color-second-bg);
        //background: var(--color-main-bg);
        border-radius: 1rem;

        svg {
          font-size: 3rem;
        }
      }
    }
  }

  .steps {
    width: 100%;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    .step {
      width: 100%;
      font-size: 20rpx;
      color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 4.8rem;
      gap: 1.5rem;
      color: gray;

      .text {
        font-size: 1.4rem;
      }

      .point {
        @w: 6px;
        border-radius: 50%;
        min-width: @w;
        min-height: @w;
        background: #adadad;
      }

      &.active {
        color: black;

        .point {
          box-shadow: 0 0 1px 1px #f1f1f1;
          background: white;
          transform: scale(3);
        }
      }
    }
  }

  .font-size {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .line {
      position: relative;
      z-index: 1;
      margin-top: -4px;
      height: 2px;
      width: 76%;
      background: #dadada;
    }
  }

  .cancel {
    border-top: 1px solid #e3e3e3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    height: 5rem;
    color: rgb(100, 111, 129);
  }
}

</style>