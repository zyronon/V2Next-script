<template>
  <PopConfirm
      :disabled="disabled"
      :title="`确认花费 10 个铜币向 @${item.username} 的这条回复发送感谢？`"
      @confirm="thank">
    <div class="tool" :class="[disabled && 'disabled']" @click="thankError">
      <Icon v-if="item.isThanked" color="rgb(224,42,42)" icon="icon-park-solid:like"/>
      <Icon v-else :color="!item.thankCount ? null:'rgb(224,42,42)'" icon="icon-park-outline:like"/>
      <span class="link-num" v-if="item.thankCount">{{ item.thankCount }}</span>
      <span v-else>感谢</span>
    </div>
  </PopConfirm>
</template>
<script>
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import PopConfirm from "./PopConfirm.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "Point",
  components: {PopConfirm, Icon},
  inject: ['post', 'isLogin'],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    apiUrl: '',
  },
  computed: {
    disabled() {
      return (this.item.username === window.user.username) || this.item.isThanked || !this.isLogin
    }
  },
  methods: {
    thankError() {
      if (!this.isLogin) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
      }
      if (this.item.username === window.user.username) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '不能感谢自己'})
      }
      if (this.item.isThanked) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '已经感谢过了'})
      }
    },
    async thank() {
      this.$emit('addThank')
      //https://www.v2ex.com/thank/topic/886147?once=38719
      let url = `${location.origin}/thank/${this.apiUrl}?once=${this.post.once}`
      $.post(url).then(res => {
        if (!res.success) {
          this.$emit('recallThank')
          eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: res.message})
        }
        eventBus.emit(CMD.REFRESH_ONCE, res.once)
      }, err => {
        this.$emit('recallThank')
        eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '感谢失败'})
        eventBus.emit(CMD.REFRESH_ONCE)
      })
    }
  }
}
</script>
