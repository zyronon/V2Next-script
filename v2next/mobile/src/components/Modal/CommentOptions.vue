<script setup lang="ts">
import { inject } from 'vue'
import { Icon } from "@iconify/vue";
import FromBottomDialog from "@/components/Modal/FromBottomDialog.vue";
import { CommentDisplayType } from "@v2next/core/types";
import { copy } from '@/utils/index'

const props = defineProps<{
  modelValue: boolean,
  comment: any
}>()
const emit = defineEmits<{
  close: [],
  'update:modelValue': [val: boolean],
}>()


const config: any = inject('config')

function close() {
  emit('update:modelValue', false)
}

async function handleCopy() {
  let text = props.comment.reply_content
  if (config.commentDisplayType === CommentDisplayType.FloorInFloorNoCallUser) {
    text = props.comment.hideCallUserReplyContent
  }
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
            <Icon icon="solar:forbidden-circle-outline"/>
          </div>
          <span>忽略</span>
        </div>
        <div class="item" @click="handleCopy">
          <div class="icon-wrap">
            <Icon icon="octicon:copy-24"/>
          </div>
          <span>复制</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon icon="iconoir:page-search"/>
          </div>
          <span>上下文</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon icon="icon-park-outline:like"/>
          </div>
          <span>感谢</span>
        </div>
        <div class="item">
          <div class="icon-wrap">
            <Icon icon="mynaui:message"/>
          </div>
          <span>回复</span>
        </div>
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
          color: rgb(57, 174, 85);
        }
      }
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