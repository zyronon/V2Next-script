<script setup>

import {onMounted, onUnmounted, ref} from "vue";

let refVideo = ref(null)
onMounted(() => {
})

onUnmounted(() => {
})

function checkVideo() {
  if (!refVideo.value) {
    let v = document.querySelector('video')
    if (v) refVideo.value = v
  }
}

function playbackRateToggle() {
  checkVideo()
  if (refVideo.value) {
    if (refVideo.value.playbackRate === 2) {
      refVideo.value.playbackRate = 1
    } else {
      refVideo.value.playbackRate = 2
    }
  }
}

function toggle() {
  checkVideo()
  if (refVideo.value) {
    if (refVideo.value.paused) {
      refVideo.value.play()
    } else {
      refVideo.value.pause()
    }
  }
}
</script>

<template>
  <div class="next">
    <div class="btn" @click="toggle">暂停/播放</div>
    <div class="btn" @click="playbackRateToggle">速度/切换</div>
  </div>
</template>

<style lang="less">
.next {
  font-size: 1.4rem;
  display: flex;
  gap: 1rem;

  .btn {
    color: #f1f1f1;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0 16px;
    height: 36px;
    font-size: 14px;
    line-height: 36px;
    border-radius: 18px;
  }
}
</style>
<style lang="less">
@w: 370px;
@media (min-width: 1280px) and (orientation: landscape) {
  //播放器
  .player-container, .player-container.sticky-player {
    right: @w !important;
  }

  //左侧，主是要播放器下面的一坨
  ytm-watch {
    margin-right: @w !important;
  }

  //右侧推荐
  ytm-engagement-panel {
    width: @w !important;
  }

  //未知
  .player-placeholder-wrapper {
    width: calc(100% - @w) !important;
  }

  //右侧历史推荐
  ytm-single-column-watch-next-results-renderer [section-identifier=related-items], ytm-single-column-watch-next-results-renderer > ytm-playlist {
    width: @w !important;
    padding: 0 0 8px 8px
  }

  //右侧历史推荐
  ytm-single-column-watch-next-results-renderer .playlist-content {
    width: @w !important;
  }
}

</style>