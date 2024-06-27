<template>
  <Transition>
    <div class="NotificationModal modal" v-if="modelValue">
      <div class="mask" @click.stop="close"></div>
      <div class="modal-root">
        <div class="modal-header">
          <div class="title">
            提醒系统
          </div>
          <i class="fa fa-times" @click="close"/>
        </div>
        <div class="modal-body">
          <div class="filter">
            <div :class="index==='all'&& 'active'" @click="index = 'all'">全部</div>
            <div :class="index==='reply'&& 'active'" @click="index = 'reply'">回复</div>
            <div :class="index==='star'&& 'active'" @click="index = 'star'">感谢</div>
            <div :class="index==='collect'&& 'active'" @click="index = 'collect'">收藏</div>
          </div>
          <div id="notifications" :class="index" v-html="h"></div>
          <div class="footer">
            <div v-html="pages" class="pages"></div>
            <div class="total"><span>总共收到提醒</span>{{ total }}</div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {onMounted, ref} from "vue"

const props = defineProps(['modelValue', 'h', 'total', 'pages'])
const emit = defineEmits(['update:modelValue'])

const index = ref('reply')

onMounted(() => {
})

function close() {
  emit('update:modelValue', false)
}

</script>

<style scoped lang="less">
@import "src/assets/less/variable";

.NotificationModal {
  .modal-root {
    z-index: 9;
    background: var(--color-second-bg);
    color: var(--color-font-8);
    border-radius: 1rem;
    font-size: 1.4rem;
    width: 50vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    padding: 1.4rem;
    gap: 1rem;

    .modal-header {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 2.6rem;
        font-weight: bold;
        text-align: left;
        margin-bottom: 0;
      }

      i {
        cursor: pointer;
        font-size: 2.2rem;
      }
    }

    .modal-body {
      padding-top: 0;
      flex: 1;
      gap: 1rem;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .filter {
        display: flex;
        gap: 1rem;

        div {
          border-radius: .4rem;
          padding: .4rem 1rem;
          background: gainsboro;
          cursor: pointer;

          &.active {
            background: #445;
            color: white;
          }
        }
      }

      #notifications {
        flex: 1;
        overflow: auto;

        :deep(.cell) {
          display: none;

          //padding: 1rem;
          a.node {
            padding: .6rem 1rem;
            border-radius: .4rem;
          }
        }
      }

      #notifications.all {
        :deep(.cell) {
          display: block;
        }
      }
      #notifications.reply {
        :deep(.reply) {
          display: block;
        }
      }
      #notifications.star {
        :deep(.star) {
          display: block;
        }
      }
      #notifications.collect {
        :deep(.collect) {
          display: block;
        }
      }

      .footer {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 2rem;

        .pages {
          flex: 1;
        }

        .total {
          font-weight: bold;

          span {
            color: lightgray;
            font-weight: normal;
            margin-right: .4rem;
          }
        }
      }
    }
  }
}

</style>