<template>
  <div class="toolbar">
    <div class="left">
      <!--      <span>{{ post.replyCount }} 条回复</span>-->
      <div>{{ post.createDate.substring(0, 16) }}</div>
    </div>
    <div class="right">
      <div class="tool" :class="{disabled:loading}" @click="toggleFavorite">
        <BaseLoading v-if="loading" size="small"/>
        <template v-else>
          <Icon v-if="post.isFavorite" color="rgb(224,42,42)" icon="iconoir:star-solid"/>
          <Icon v-else icon="iconoir:star"/>
        </template>
        <span v-if="post.collectCount!==0">{{ post.collectCount }}</span>
      </div>
      <div class="tool" @click="checkIsLogin('reply')">
        <Icon icon="mynaui:message"/>
      </div>
      <!--      <slot></slot>-->
    </div>
  </div>
</template>

<script>
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import BaseLoading from "./BaseLoading.vue";
import {Icon} from "@iconify/vue";

export default {
  name: "Toolbar",
  components: {Icon, BaseLoading},
  inject: [
    'isLogin',
    'post',
    'pageType'
  ],
  data() {
    return {
      timer: null,
      loading: false,
      loading3: false,
    }
  },
  methods: {
    checkIsLogin(emitName = '') {
      if (!this.isLogin) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '请先登录！'})
        return false
      }
      this.$emit(emitName)
      return true
    },
    async toggleFavorite() {
      if (config.collectBrowserNotice) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '别忘记添加到书签哦'})
      }
      if (!this.checkIsLogin()) return
      // return eventBus.emit('merge', 'isFavorite')
      let isFavorite = this.post.isFavorite
      let url = `${window.baseUrl}/${isFavorite ? 'unfavorite' : 'favorite'}/topic/${this.post.id}?once=${this.post.once}`
      this.loading = true
      let apiRes = await fetch(url)
      this.loading = false
      if (apiRes.redirected) {
        let htmlText = await apiRes.text()
        if (htmlText.search(this.post.isFavorite ? '加入收藏' : '取消收藏')) {
          eventBus.emit(CMD.MERGE, {collectCount: isFavorite ? (this.post.collectCount - 1) : (this.post.collectCount + 1)})
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: isFavorite ? '取消成功' : '收藏成功'})
          eventBus.emit(CMD.REFRESH_ONCE, htmlText)
          eventBus.emit(CMD.MERGE, {isFavorite: !isFavorite})
          return
        }
      }
      eventBus.emit(CMD.REFRESH_ONCE)
      eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '操作失败'})
    },
  }
}
</script>

<style scoped lang="less">
@import "../assets/less/variable";

.toolbar {
  border-top: 1px solid var(--color-line);
  height: 4rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  color: var(--color-font);
  font-size: 1.4rem;
  justify-content: space-between;

  .left, .right {
    gap: 1rem;
    display: flex;
  }

  .right {
    gap: .6rem;
  }
}

</style>