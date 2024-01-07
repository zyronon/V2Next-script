<script setup lang="ts">

interface IProps {
  size?: 'small' | 'normal' | 'large',
}

withDefaults(defineProps<IProps>(), {
  size: 'normal',
})

</script>

<template>
  <div class="loading"
       :class="[size]">
  </div>
</template>

<style scoped lang="less">

.loading {
  border: 2px solid;
  border-color: var(--color-loading-2) var(--color-loading-1) var(--color-loading-1) var(--color-loading-1);
  border-radius: 100%;
  animation: circle infinite 1s linear;
  @w: 2rem;
  width: @w;
  height: @w;

  &.small {
    @w: 1.2rem;
    width: @w;
    height: @w;
  }

  &.large {
    @w: 3rem;
    width: @w;
    height: @w;
  }
}

@keyframes circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>