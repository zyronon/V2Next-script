<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [val: boolean]
}>()
</script>

<template>
  <div class="switch gray" :class="{active:modelValue}"
       @click="emit('update:modelValue',!modelValue)"
  />
</template>

<style scoped lang="less">
@import "@/assets/less/index";

.switch {
  width: 4.5rem;
  height: 2rem;
  border-radius: 2rem;
  position: relative;
  display: flex;
  align-items: center;
  transition: all .3s;
  background: rgb(220, 223, 230);

  &::before {
    background: white;
  }

  &.light {
    border: 1px solid @bg-color;

    &.active {
      background: @bg-color;

      &::before {
        right: .2rem;
      }
    }

  }

  &.gray {
    border: 1px solid @date-color;

    &.active {
      background: rgb(64, 158, 255);

      &::before {
        right: .2rem;
      }
    }
  }

  &.isNight {
    @night-color: rgb(49, 71, 94);
    border: 1px solid @night-color;

    &.active {
      background: @night-color;

      &::before {
        right: .2rem;
      }
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
    border-radius: 50%;
  }
}

</style>