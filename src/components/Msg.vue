<template>
  <div class="msg" :class="type">
    <div class="left" @click="$emit('close')">
      <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 14L34 34" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 34L34 14" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="right">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "Msg",
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
  background: var(--color-third-bg);
  display: flex;
  font-size: 1.4rem;
  box-sizing: border-box;
  color: var(--color-font);
  border-radius: var(--border-radius);

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
    border-radius: var(--border-radius) 0 0 var(--border-radius);
    display: flex;
    align-items: center;
    background: var(--color-active);

    svg {
      margin: 0 .3rem;
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