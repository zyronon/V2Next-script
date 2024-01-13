<template>
  <Transition>
    <div class="tag-modal modal" v-if="tagModal.show">
      <div class="mask" @click.stop="tagModal.show = false"></div>
      <div class="wrapper">
        <div class="title">
          添加标签
        </div>
        <div class="option">
          <span>用户：</span>
          <div>
            <b>{{ tagModal.currentUsername }}</b>
          </div>
        </div>
        <input type="text"
               ref="inputRef"
               style="width: 100%;"
               v-model="tagModal.tag" @keydown.enter="addTag">
        <div class="btns">
          <BaseButton type="link" @click="tagModal.show = false">取消</BaseButton>
          <BaseButton @click="addTag">确定</BaseButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {inject, nextTick, onMounted, reactive, ref} from "vue"
import {CMD} from "../../utils/type.js"
import eventBus from "../../utils/eventBus.js";
import BaseButton from "../BaseButton.vue";

const tagModal = reactive({
  show: false,
  currentUsername: '',
  tag: '',
})
const props = defineProps(['tags'])
const emit = defineEmits(['update:tags'])
const inputRef = ref()

onMounted(() => {
  eventBus.on(CMD.ADD_TAG, (username) => {
    tagModal.currentUsername = username
    tagModal.show = true
    nextTick(() => {
      inputRef.value.focus()
    })
  })
})

async function addTag() {
  if (!tagModal.tag) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请输入标签'})
    return
  }
  let oldTag = window.clone(props.tags)
  let tempTag = window.clone(props.tags)
  let userTags = tempTag[tagModal.currentUsername] ?? []
  let rIndex = userTags.findIndex((v) => v === tagModal.tag)
  if (rIndex > -1) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '标签已存在！'})
    return
  } else {
    userTags.push(tagModal.tag)
  }
  tempTag[tagModal.currentUsername] = userTags
  emit('update:tags', tempTag)
  tagModal.tag = ''
  tagModal.show = false
  let res = await window.parse.saveTags(tempTag)
  if (!res) {
    eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '标签添加失败！'})
    emit('update:tags', oldTag)
  }
}
</script>

<style scoped lang="less">
@import "src/assets/less/variable";

.tag-modal {
  .wrapper {
    z-index: 9;
    background: var(--color-main-bg);
    color: var(--color-font-8);
    border-radius: 1.6rem;
    font-size: 1.4rem;
    padding: 2rem 4rem;
    width: 25rem;

    .title{
      font-weight: bold;
    }

    .btns {
      margin-top: 1.5rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1.5rem;
      font-size: 1.4rem;
    }
  }
}

</style>