<script setup lang="ts">

import { Icon } from "@iconify/vue";
import { computed, reactive } from "vue";
import { CommentDisplayType } from "@v2next/core/types";

const props = defineProps<{
  displayType: CommentDisplayType
}>()

const emit = defineEmits<{
  'update:displayType': [val: CommentDisplayType]
}>()
let state = reactive({
  showChangeDisplayType: false,
  lastDisplayType: null,
})

function changeOption(item: CommentDisplayType) {
  if (![CommentDisplayType.New, CommentDisplayType.Like].includes(props.displayType)) {
    state.lastDisplayType = props.displayType
  }
  emit('update:displayType', item)
  state.showChangeDisplayType = false
}

function clickDisplayType() {
  if ([CommentDisplayType.New, CommentDisplayType.Like].includes(props.displayType)) {
    return changeOption(state.lastDisplayType ?? CommentDisplayType.FloorInFloorNoCallUser)
  }
  state.showChangeDisplayType = !state.showChangeDisplayType
}

const currentDisplayType = computed(() => {
  let judge = props.displayType
  if ([CommentDisplayType.New, CommentDisplayType.Like].includes(props.displayType)) {
    judge = state.lastDisplayType
  }
  switch (judge) {
    case CommentDisplayType.FloorInFloorNoCallUser:
      return '楼中楼'
    case CommentDisplayType.FloorInFloor:
      return '楼中楼(@)'
    case CommentDisplayType.FloorInFloorNested:
      return '冗余楼中楼'
    case CommentDisplayType.V2exOrigin:
      return 'V2原版'
    case CommentDisplayType.OnlyOp:
      return '只看楼主'
    default:
      return '楼中楼'
  }
})
</script>

<template>
  <div class="display-type">
    <!--              <div class="type">最新</div>-->
    <div class="type"
         @click="changeOption(CommentDisplayType.Like)"
         :class="displayType === CommentDisplayType.Like && 'active'"
    >最热
    </div>
    <div style="position: relative">
      <div class="type"
           @click="clickDisplayType"
           :class="![CommentDisplayType.New,CommentDisplayType.Like].includes(displayType)  && 'active'"
      >
        <span>{{ currentDisplayType }}</span>
        <Icon icon="mingcute:down-line"/>
      </div>
      <div class="type-list" v-if="state.showChangeDisplayType">
        <div class="item"
             @click.stop="changeOption(CommentDisplayType.FloorInFloorNoCallUser)"
             :class="displayType === CommentDisplayType.FloorInFloorNoCallUser && 'active'"
        >楼中楼
        </div>
        <div class="item"
             @click.stop="changeOption(CommentDisplayType.FloorInFloor)"
             :class="displayType === CommentDisplayType.FloorInFloor && 'active'"
        >楼中楼(@)
        </div>
        <div class="item"
             @click.stop="changeOption(CommentDisplayType.FloorInFloorNested)"
             :class="displayType === CommentDisplayType.FloorInFloorNested && 'active'"
        >冗余楼中楼
        </div>
        <div class="item"
             @click.stop="changeOption(CommentDisplayType.OnlyOp)"
             :class="displayType === CommentDisplayType.OnlyOp && 'active'"
        >只看楼主
        </div>
        <div class="item"
             @click.stop="changeOption(CommentDisplayType.V2exOrigin)"
             :class="displayType === CommentDisplayType.V2exOrigin && 'active'"
        >V2原版
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped lang="less">
.display-type {
  height: 3rem;
  padding: 0 .3rem;
  //gap: .5rem;
  background: #f1f1f1;
  border-radius: 1rem;
  display: flex;
  font-size: 1.4rem;
  align-items: center;
  @sw: 1.5rem;

  .type {
    border-radius: .8rem;
    padding: 0 1.3rem;
    height: 2.5rem;
    align-items: center;
    display: flex;
    position: relative;

    &.active {
      background: white;
      color: black;
      box-shadow: 0 0 6px 0 var(--color-tooltip-shadow);
    }
  }

  .type-list {
    position: absolute;
    background: white;
    right: 0;
    top: 3rem;
    font-size: 1.4rem;
    box-shadow: 0 0 6px 0 var(--color-tooltip-shadow);
    border-radius: .6rem;
    z-index: 9;
    color: var(--color-font);

    .item {
      word-break: keep-all;
      padding: .8rem 1rem;

      &.active {
        color: var(--color-font-pure);
      }
    }
  }

  svg {
    width: @sw;
  }
}

</style>