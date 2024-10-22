<script setup lang="ts">
import {inject} from "vue";
import {Config} from "../../../core/types";
import eventBus from '@/utils/eventBus'
import {CMD} from '@/utils/type'

const config = inject<Config>('config')

</script>

<template>
  <div class="font-size">
    <div class="steps">
      <div class="step" :class="[config.fontSizeType === 'small' && 'active']"
           @click="eventBus.emit(CMD.MERGE_CONFIG,{fontSizeType:'small'})">
        <div class="text" style="font-size: 1.2rem;">小</div>
        <div class="point"></div>
      </div>
      <div class="step" :class="[config.fontSizeType === 'normal' && 'active']"
           @click="eventBus.emit(CMD.MERGE_CONFIG,{fontSizeType:'normal'})">
        <div class="text">标准</div>
        <div class="point"></div>
      </div>
      <div class="step" :class="[config.fontSizeType === 'large' && 'active']"
           @click="eventBus.emit(CMD.MERGE_CONFIG,{fontSizeType:'large'})">
        <div class="text" style="font-size: 1.8rem;">大</div>
        <div class="point"></div>
      </div>
      <div class="step" :class="[config.fontSizeType === 'big-large' && 'active']"
           @click="eventBus.emit(CMD.MERGE_CONFIG,{fontSizeType:'big-large'})">
        <div class="text" style="font-size: 2.2rem;">特大</div>
        <div class="point"></div>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<style scoped lang="less">
.font-size {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .steps {
    width: 100%;
    border-radius: 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;

    .step {
      width: 100%;
      font-size: 20rpx;
      color: gray;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      height: 4.8rem;
      gap: 1.5rem;
      color: gray;

      .text {
        font-size: 1.4rem;
      }

      .point {
        @w: 6px;
        border-radius: 50%;
        min-width: @w;
        min-height: @w;
        background: #adadad;
      }

      &.active {
        color: var(--color-font-pure);

        .point {
          box-shadow: 0 0 1px 1px #f1f1f1;
          background: white;
          transform: scale(3);
        }
      }
    }
  }

  .line {
    position: relative;
    z-index: 1;
    margin-top: -4px;
    height: 2px;
    width: 76%;
    background: var(--color-font);
  }
}


</style>