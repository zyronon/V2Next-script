<template>
  <teleport to="body">
    <div class="msgs">
      <Msg v-for="v in msgList" :key="v.id" :type="v.type" :text="v.text" @close="removeMsg(v.id)"/>
    </div>
  </teleport>
</template>

<script setup>
import Msg from "../Msg.vue";
import {onMounted, reactive} from "vue"
import {CMD} from "../../utils/type.js"
import eventBus from "../../utils/eventBus.js";

const msgList = reactive([
  // {type: 'success', text: '123', id: Date.now()}
])

onMounted(() => {
  eventBus.on(CMD.SHOW_MSG, (val) => {
    msgList.push({...val, id: Date.now()})
  })
})

function removeMsg(id) {
  let rIndex = msgList.findIndex(item => item.id === id)
  if (rIndex > -1) {
    msgList.splice(rIndex, 1)
  }
}

</script>

<style scoped lang="less">
.msgs {
  position: fixed;
  margin-left: calc(50% - 40vw);
  width: 80vw;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>