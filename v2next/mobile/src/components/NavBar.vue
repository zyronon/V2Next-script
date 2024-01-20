<script setup lang="ts">

import BackIcon from "@/components/BackIcon.vue";

defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  back: []
}>()
</script>

<template>
  <div class="nav-bar">
    <BackIcon @click="emit('back')"/>
    <div class="title" v-if="title">{{ title }}</div>
  </div>
</template>

<style scoped lang="less">
.nav-bar {
  box-sizing: border-box;
  width: 100%;
  height: 5rem;
  padding: 0 var(--space);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 2rem;
  color: var(--color-font-pure);

  :deep(.back-icon) {
    left: var(--space);
    position: absolute;
  }
}
</style>