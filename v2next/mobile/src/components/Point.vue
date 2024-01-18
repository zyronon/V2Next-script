<template>
  <div class="tool" @click="thankError">
    <Icon v-if="item.isThanked" color="red" icon="icon-park-solid:like"/>
    <Icon v-else color="rgb(224,42,42)" icon="icon-park-outline:like"/>
    <div class="link-num" v-if="item.thankCount">{{ item.thankCount }}</div>
  </div>
</template>
<script>
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import {Icon} from "@iconify/vue";

export default {
  name: "Point",
  components: {Icon},
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
      this.thank()
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
<style lang="less" scoped>
.tool {
  > svg {
    @w: 1.8rem;
    width: @w !important;
    height: @w !important;
  }
}
</style>