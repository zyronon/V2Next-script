<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
}>()
</script>

<template>
  <div class="switch" :class="{active:modelValue}"
       @click="$emit('update:modelValue',!modelValue)"
  />
</template>

<style scoped lang="less">
@import "../assets/less/index";

.switch {
  width: 4.5rem;
  height: 2.2rem;
  border-radius: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-swtich-bg);
  transition: all .3s;

  &.active {
    background: var(--color-active);

    &::before {
      right: .2rem;
    }
  }

  &::before {
    position: absolute;
    content: ' ';
    transition: all .3s;
    @w: 1.8rem;
    right: calc(100% - @w - .2rem);
    //left: .2rem;
    width: @w;
    height: @w;
    background: white;
    border-radius: 50%;
  }
}

</style>