<template>
  <div class="toolbar">
    <slot></slot>
    <div class="tool" @click.stop="checkIsLogin('reply')">
      <Icon icon="mynaui:message"/>
      <span>回复</span>
    </div>
    <div class="tool" :class="{disabled:loading}" @click.stop="toggleFavorite">
      <BaseLoading v-if="loading" size="small"/>
      <template v-else>
        <Icon v-if="post.isFavorite" color="rgb(224,42,42)" icon="iconoir:star-solid"/>
        <Icon v-else icon="iconoir:star"/>
      </template>
      <span>{{ post.isFavorite ? '取消' : '' }}收藏</span>
    </div>
    <div v-if="post.collectCount!==0" class="tool no-hover">
      <span>{{ post.collectCount + '人收藏' }}</span>
    </div>

    <div class="tool" @click.stop="tweet">
      <Icon icon="uil:share"/>
      <span>Tweet</span>
    </div>
    <div class="tool" :class="{'disabled':loading2}" @click.stop="toggleIgnore">
      <BaseLoading v-if="loading2" size="small"/>
      <Icon v-else icon="fluent:eye-hide-24-regular"/>
      <span>{{ post.isIgnore ? '取消忽略' : '忽略' }}</span>
    </div>
    <div class="tool" :class="{'disabled':loading3}" @click.stop="report">
      <BaseLoading v-if="loading3" size="small"/>
      <template v-else>
        <Icon class="black" icon="solar:danger-triangle-outline"/>
      </template>
      <span>{{ post.isReport ? '你已对本主题进行了报告' : '报告' }}</span>
    </div>
  </div>
</template>

<script>
import eventBus from "../utils/eventBus.js";
import {CMD} from "../utils/type.js";
import BaseLoading from "./BaseLoading.vue";
import {PageType} from "@v2next/core/types.ts";
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
      loading2: false,
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
    tweet() {
      let username = window.user?.username ?? ''
      let url = `https://twitter.com/intent/tweet?url=${location.origin}/t/${this.post.id}?r=${username}&related=v2ex&text=${this.post.title}`
      window.open(url, '_blank', 'width=550,height=370');
    },
    async report() {
      if (!this.checkIsLogin()) return
      if (this.loading3) return;
      let isReport = this.post.isReport
      if (isReport) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '你已对本主题进行了报告'})
        return
      }

      let url = `${location.origin}/report/topic/${this.post.id}?once=${this.post.once}`
      this.loading3 = true
      let apiRes = await fetch(url)
      this.loading3 = false
      if (apiRes.redirected) {
        let htmlText = await apiRes.text()
        if (htmlText.search('你已对本主题进行了报告')) {
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '你已对本主题进行了报告'})
          eventBus.emit(CMD.REFRESH_ONCE, htmlText)
          eventBus.emit(CMD.MERGE, {isReport: !isReport})
          return
        }
      }
      eventBus.emit(CMD.REFRESH_ONCE)
      eventBus.emit(CMD.SHOW_MSG, {type: 'error', text: '操作失败，请重试'})
    },
    async toggleIgnore() {
      if (!this.checkIsLogin()) return
      let url = `${window.baseUrl}/${this.post.isIgnore ? 'unignore' : 'ignore'}/topic/${this.post.id}?once=${this.post.once}`
      //如果是主题详情页，那么直接跳转到首页
      if (this.pageType === PageType.Post) {
        this.loading2 = true
        let apiRes = await window.win().fetch(url)
        if (apiRes.redirected) {
          if (!this.post.isIgnore) {
            window.win().location = window.baseUrl
          }
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: this.post.isIgnore ? '取消成功' : '忽略成功'})
          eventBus.emit(CMD.MERGE, {isIgnore: !this.post.isIgnore})
        } else {
          eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '忽略失败'})
        }
        this.loading2 = false
      } else {
        if (this.post.isIgnore) {
          this.loading2 = true
        } else {
          eventBus.emit(CMD.IGNORE)
        }
        let apiRes = await window.win().fetch(url)
        if (apiRes.redirected) {
          if (this.post.isIgnore) {
            eventBus.emit(CMD.REFRESH_ONCE)
          }
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: this.post.isIgnore ? '取消成功' : '忽略成功'})
          eventBus.emit(CMD.MERGE, {isIgnore: !this.post.isIgnore})
        } else {
          eventBus.emit(CMD.SHOW_MSG, {type: 'warning', text: '忽略成功,仅本次有效（接口调用失败！）'})
        }
        this.loading2 = false
      }
    },
    async toggleFavorite() {
      if (!this.checkIsLogin()) return
      if (this.loading) return

      // return eventBus.emit('merge', 'isFavorite')
      let isFavorite = this.post.isFavorite
      if (!isFavorite && config.collectBrowserNotice) {
        eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: '别忘记按Command/Cmd/CTRL + D添加到书签哦'})
      }
      let url = `${location.origin}/${isFavorite ? 'unfavorite' : 'favorite'}/topic/${this.post.id}?once=${this.post.once}`
      this.loading = true
      let apiRes = await fetch(url)
      this.loading = false
      if (apiRes.redirected) {
        let htmlText = await apiRes.text()
        if (htmlText.search(isFavorite ? '加入收藏' : '取消收藏')) {
          eventBus.emit(CMD.SHOW_MSG, {type: 'success', text: isFavorite ? '取消成功' : '收藏成功'})
          eventBus.emit(CMD.MERGE, {collectCount: isFavorite ? (this.post.collectCount - 1) : (this.post.collectCount + 1)})
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
  height: 3.8rem;
  padding-left: .6rem;
  display: flex;
  align-items: center;
  color: var(--color-gray);
  font-size: 1.2rem;
  gap: .5rem;
}

</style>