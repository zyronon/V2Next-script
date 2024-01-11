<template>
  <Transition>
    <div class="tag-modal modal" v-if="modelValue">
      <div class="mask" @click.stop="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            提醒系统
          </div>
          <i class="fa fa-times" @click="close"/>
        </div>
        <div v-html="h" class="modal-body"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {onMounted} from "vue"

const props = defineProps(['modelValue', 'h'])
const emit = defineEmits(['update:modelValue'])

onMounted(() => {
})

function close() {
  emit('update:modelValue', false)
}

</script>

<style scoped lang="less">
@import "src/assets/less/variable";

.tag-modal {
  .modal-root {
    z-index: 9;
    background: var(--color-second-bg);
    color: var(--color-font-8);
    border-radius: 1.6rem;
    font-size: 1.4rem;
    width: 50vw;
    height: 70vh;
    display: flex;
    flex-direction: column;

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

    .modal-body {
      padding: 2rem;
      padding-top: 0;
      flex: 1;
      overflow: auto;

      :deep(.cell){
        padding: 2rem;
      }
    }
  }
}

</style>