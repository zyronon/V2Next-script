<template>
  <PopConfirm
      :disabled="disabled"
      :title="`确认花费 10 个铜币向 @${item.username} 的这条回复发送感谢？`"
      @confirm="thank">
    <div class="tool" :class="disabled?'disabled':''" @click="thankError">
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15 8C8.92487 8 4 12.9249 4 19C4 30 17 40 24 42.3262C31 40 44 30 44 19C44 12.9249 39.0751 8 33 8C29.2797 8 25.9907 9.8469 24 12.6738C22.0093 9.8469 18.7203 8 15 8Z"
            :fill="getIsFull()" :stroke="getColor()" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round"/>
      </svg>
      <div class="link-num" v-if="item.thankCount">{{ item.thankCount }}</div>
      <div v-else>感谢</div>
    </div>
  </PopConfirm>
</template>
<script>
import eventBus from "@/utils/eventBus.js";
import {CMD} from "@/utils/type";
import PopConfirm from "@/components/PopConfirm.vue";

const loveColor = 'rgb(224,42,42)'
export default {
  name: "Point",
  components: {PopConfirm},
  inject: ['post', 'isLogin'],
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    full: {
      type: Boolean,
      default() {
        return true
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
    getColor() {
      if (this.item.isThanked) return loveColor
      return this.full ? loveColor : '#929596'
    },
    getIsFull() {
      if (this.item.isThanked) return loveColor
      return this.full ? loveColor : 'none'
    },
    thankError() {
      if (this.item.username === window.user.username) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '不能感谢自己'})
      }
      if (this.item.isThanked) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '已经感谢过了'})
      }
      if (!this.isLogin) {
        return eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
      }
    },
    async thank() {
      this.$emit('addThank')
      //https://www.v2ex.com/thank/topic/886147?once=38719
      let url = `${window.baseUrl}/thank/${this.apiUrl}?once=${this.post.once}`
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
