<script setup lang="ts">

</script>

<template>
  <div class="more">
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<style scoped lang="less">
.more {
  @w1: 1.6rem;
  height: @w1;
  width: @w1 * 1.3;
  padding: 1rem 0;
  padding-right: .8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;

  div {
    background: var(--color-floor-font);
    @w: 0.3rem;
    width: @w;
    height: @w;
    border-radius: 50%;
  }
}
</style>