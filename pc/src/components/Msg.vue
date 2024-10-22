<template>
  <div class="msg" :class="type">
    <div class="left" @click="$emit('close')">
      <Icon icon="ic:round-close"/>
    </div>
    <div class="right">{{ text }}</div>
  </div>
</template>

<script>
import {Icon} from "@iconify/vue";

export default {
  name: "Msg",
  components: {Icon},
  props: {
    type: '',
    text: '',
  },
  created() {
    setTimeout(() => {
      this.$emit('close')
    }, 3000)
  }
}
</script>

<style lang="less" scoped>
.msg {
  cursor: default;
  margin-bottom: 2rem;
  display: flex;
  font-size: 1.4rem;
  box-sizing: border-box;
  border-radius: var(--box-border-radius);
  color: var(--color-font-8);
  background: var(--color-tooltip-bg);
  box-shadow: 0 0 6px 1px var(--color-tooltip-shadow);

  &.success {
    .left {
      background: var(--color-active);
    }
  }

  &.warning {
    .left {
      background: #c8c002;
    }
  }

  &.error {
    .left {
      background: red;
    }
  }

  .left {
    border-radius: var(--box-border-radius) 0 0 var(--box-border-radius);
    display: flex;
    align-items: center;
    background: var(--color-active);
    color: white;
    width: 3.6rem;
    font-size: 2.4rem;
    justify-content: center;

    svg {
      cursor: pointer;
    }
  }

  .right {
    flex: 1;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>