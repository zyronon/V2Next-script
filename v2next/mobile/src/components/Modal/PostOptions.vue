<script setup lang="ts">
// import {$ref} from "vue/macros";
import {ref} from 'vue'

let fs = ref(0)
</script>

<template>
  <div class="post-options">
    <div class="mask"></div>
    <div class="wrapper">
      <div class="options">
        <div class="item">回复</div>
        <div class="item">分享</div>
        <div class="item">忽略</div>
        <div class="item">感谢</div>
        <div class="item">收藏</div>
        <div class="item">
          <div>报告</div>
          <div>问题</div>
        </div>
        <div class="item">
          <div>复制</div>
          <div>链接</div>
        </div>
        <div class="item">
          <div>复制</div>
          <div>内容</div>
        </div>
        <div class="item">跳转</div>
        <div class="item">刷新</div>
      </div>

      <div class="font-size">
        <div class="steps">
          <div class="step" @click="fs = 0">
            <div class="text" style="font-size: 1.2rem;">小</div>
            <div class="point" :class="[fs=== 0 && 'active']"></div>
          </div>
          <div class="step" @click="fs = 1">
            <div class="text">标准</div>
            <div class="point" :class="[fs=== 1 && 'active']"></div>
          </div>
          <div class="step" @click="fs = 2">
            <div class="text" style="font-size: 1.8rem;">大</div>
            <div class="point" :class="[fs=== 2 && 'active']"></div>
          </div>
          <div class="step" @click="fs = 3">
            <div class="text" style="font-size: 2.2rem;">特大</div>
            <div class="point" :class="[fs=== 3 && 'active']"></div>
          </div>
        </div>
        <div class="line"></div>
      </div>
      <div class="cancel">取消</div>
    </div>
  </div>
</template>

<style scoped lang="less">

.post-options {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  .wrapper {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 2rem;
    background: var(--color-second-bg);

    .options {
      padding: 3rem 2rem;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      justify-content: space-between;
      gap: 2rem;

      .item {
        //margin-bottom: 2rem;
        @w: 15vw;
        //width: @w;
        height: @w;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: var(--color-second-bg);
        background: var(--color-main-bg);

        border-radius: 1rem;
        color: black;
        font-size: 1.4rem;
      }
    }

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

        .text {
          font-size: 1.4rem;
          color: black;
        }

        .point {
          @w: 6px;
          border-radius: 50%;
          width: @w;
          height: @w;
          background: #adadad;

          &.active {
            box-shadow: 0 0 1px 1px #f1f1f1;
            background: white;
            transform: scale(3);
          }
        }
      }
    }

    .font-size {
      margin-bottom: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .line {
        position: relative;
        z-index: 1;
        margin-top: -4px;
        height: 2px;
        width: 76%;
        background: #dadada;
      }
    }

    .cancel {
      border-top: 1px solid gray;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      height: 5rem;
    }
  }
}
</style>