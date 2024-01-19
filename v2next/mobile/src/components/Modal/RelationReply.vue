<script setup lang="ts">
import { inject, onMounted } from 'vue'
import { Icon } from "@iconify/vue";
import FromBottomDialog from "@/components/Modal/FromBottomDialog.vue";
import { CommentDisplayType } from "@v2next/core/types";
import { copy } from '@/utils/index'
import eventBus from '@/utils/eventBus'
import { CMD } from '@/utils/type'
import SingleComment from "@/components/SingleComment.vue";

const props = defineProps<{
  modelValue: boolean,
  relationReply: any
  targetUser: any
  post: any
}>()
const emit = defineEmits<{
  close: [],
  reply: [],
  merge: [val: any],
  'update:modelValue': [val: boolean],
}>()

const config: any = inject('config')
const isLogin = inject<boolean>('isLogin')

function close() {
  emit('close')
  emit('update:modelValue', false)
}

</script>

<template>
  <from-bottom-dialog
      page-id="post-detail"
      height="70vh"
      :model-value="modelValue"
      @cancel="emit('update:modelValue',false)">
    <div class="comments">
      <SingleComment v-for="(item,index) in relationReply"
                     :is-right="item.username === targetUser.right"
                     :key="item.floor"
                     :comment="item"/>
    </div>
  </from-bottom-dialog>
</template>

<style scoped lang="less">


</style>