<template>
  <Transition>
    <div class="tag-modal modal" v-if="modelValue">
      <div class="mask" @click.stop="emit('update:modelValue',false)"></div>
      <div class="wrapper">
        <div class="title">
          添加标签
        </div>
        <div v-html="h"></div>
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

</script>

<style scoped lang="less">
@import "src/assets/less/variable";

.tag-modal {
  .wrapper {
    z-index: 9;
    background: var(--color-main-bg);
    color: var(--color-font-8);
    border-radius: 1.6rem;
    font-size: 1.4rem;
    padding: 2rem 4rem;
    width: 50vw;
    height: 70vh;
    overflow: auto;

    .title {
      font-weight: bold;
    }

    .btns {
      margin-top: 1.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.5rem;
      font-size: 1.4rem;
    }
  }
}

</style>