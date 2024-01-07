<script setup lang="ts">
import Tooltip from "./Tooltip.vue";
import BaseLoading from "./BaseLoading.vue";

interface IProps {
  keyboard?: string,
  active?: boolean
  disabled?: boolean
  loading?: boolean
  size?: 'small' | 'normal' | 'large',
  type?: 'primary' | 'link'
}

withDefaults(defineProps<IProps>(), {
  type: 'primary',
  size: 'normal',
})

defineEmits(['click'])

</script>

<template>
  <Tooltip :disabled="!keyboard" :title="`快捷键: ${keyboard}`">
    <div class="base-button"
         v-bind="$attrs"
         @click="e => (!disabled && !loading) && $emit('click',e)"
         :class="[
             active && 'active',
             size,
             type,
             (disabled||loading) && 'disabled',
             !disabled && 'hvr-grow'
         ]">
      <span :style="{opacity:loading?0:1}"><slot></slot></span>
      <BaseLoading v-if="loading" size="small"/>
      <div class="key-notice" v-if="keyboard">
        <span class="key">{{ keyboard }}</span>
      </div>
    </div>
  </Tooltip>
</template>

<style scoped lang="less">

.base-button {
  cursor: pointer;
  border-radius: .6rem;
  padding: 0 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  //background: #999;
  //background: rgb(60, 63, 65);
  //background: var(--color-second-bg);
  height: 3.6rem;
  line-height: 1;
  position: relative;

  .loading {
    position: absolute;
  }

  &.disabled {
    opacity: .6;
    cursor: not-allowed;
    user-select: none;
  }

  &.small {
    height: 3rem;

    & > span {
      font-size: 1.3rem;
    }
  }

  &.large {
    height: 5rem;
    font-size: 1.8rem;
    padding: 0 2.2rem;

    & > span {
      font-size: 1.8rem;
    }
  }

  & > span {
    font-size: 1.6rem;
    color: var(--color-font);
  }

  &:hover {
    opacity: .7;
  }

  &.primary {
    background: var(--color-active);

    & > span {
      color: white;
    }
  }

  &.gary {
    background: rgb(75, 85, 99);
  }

  &.link {
    border-radius: 0;
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid var(--color-font);
    }
  }

  &.active {
    opacity: .4;
  }
}

.key-notice {
  margin-left: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  //gap: 2rem;

  .key {
    transform: scale(0.8);
  }
}
</style>