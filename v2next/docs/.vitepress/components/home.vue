<script setup lang="ts">

</script>

<template>
  <div id="home">
    <div class="content">
      <div class="info">
        <h1 class="title">
          <span>V2Next</span>
        </h1>
        <div class="desc">
          <p>UI美化、楼中楼、回复上下文、高赞回复、简洁模式、发送图片和表情 emoji、base64 解码</p>
          <p>这或许就是你需要的 V2EX 脚本</p>
        </div>
      </div>
      <div class="actions">
        <div class="action">
          <a href="https://greasyfork.org/zh-CN/scripts/458024" target="_blank">直接安装</a></div>
        <div class="action">
          <a href="">立即开始</a>
        </div>
        <div class="action">
          <a href="https://github.com/vuejs/vitepress" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
      <div class="features">
        <div class="item">
          <div class="title">楼中楼</div>
          <div class="details">主题下的评论回复支持层级展示，可以更轻松地跟踪和回复其他用户的评论</div>
        </div>
        <div class="item">
          <div class="title">简洁模式</div>
          <div class="details">再也不怕同事窥屏了</div>
        </div>
        <div class="item">
          <div class="title">弹框查看帖子</div>
          <div class="details">
            点击标题，在当前页面弹框显示帖子正文和回复，就像Reddit那样！
          </div>
        </div>
        <div class="item">
          <div class="title">查看回复上下文</div>
          <div class="details">可直接查看指定回复相关联的所有回复</div>
        </div>
        <div class="item">
          <div class="title">卡片模式</div>
          <div class="details">无需再进入主题页面，在主题列表中即可浏览内容</div>
        </div>
        <div class="item">
          <div class="title">帖子显示OP注册时间</div>
          <div class="details">自动查询OP注册时间并显示，小于7天会被标红</div>
        </div>
        <div class="item">
          <div class="title">链接自动转图片</div>
          <div class="details">回复中 imgur 链接会自动转换成图片</div>
        </div>
        <div class="item">
          <div class="title">表情回复支持</div>
          <div class="details">评论输入框可以选择表情，让回复更加生动和有趣</div>
        </div>
        <div class="item">
          <div class="title">新标签页打开链接</div>
          <div class="details">新标签页打开主题，不用再频繁刷新或者手动右键打开了</div>
        </div>
        <div class="item">
          <div class="title">智能感应主题</div>
          <div class="details">自动跟随系统切换浅色/深色主题，自适应屏幕宽度，支持黑暗模式</div>
        </div>
        <div class="item">
          <div class="title">高赞回复展示</div>
          <div class="details">自动筛选出赞最多的回复，第一时间追上热评</div>
        </div>
        <div class="item">
          <div class="title">长回复优化</div>
          <div class="details">智能折叠长篇回复，一键展开查看完整内容</div>
        </div>
        <div class="item">
          <div class="title">自动每日签到</div>
          <div class="details">自动领取每日签到奖励</div>
        </div>
        <div class="item">
          <div class="title">用户标签</div>
          <div class="details">对用户设置标签以进行标记</div>
        </div>
        <div class="item">
          <div class="title">便捷图片上传</div>
          <div class="details">粘贴、拖放极速上传图片</div>
        </div>
        <div class="item">
          <div class="title">划词 base64 解码</div>
          <div class="details">划词 base64 解码</div>
        </div>
        <div class="item">
          <div class="title">一键@所有人，@管理员</div>
          <div class="details">回复时，可一键@所有人和@管理员</div>
        </div>
        <div class="item">
          <div class="title">按钮异步请求</div>
          <div class="details">操作按钮（感谢、收藏、回复、隐藏）异步请求，不会刷新页面</div>
        </div>
        <div class="item">
          <div class="title">收藏提醒</div>
          <div class="details">防止账号被封无法查看收藏</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .info {
    .title {
      text-align: center;
      font-size: 56px;
      font-weight: bold;
      line-height: 1.4;
      color: var(--vp-home-hero-name-color);
      background: var(--vp-home-hero-name-background);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: var(--vp-home-hero-name-color);
    }

    .desc {
      font-size: 24px;
      line-height: 1.4;
      font-weight: 500;
      white-space: pre-wrap;
      color: var(--vp-c-text-2);
    }
  }

  .actions {
    margin-top: 20px;
    display: flex;
    gap: 20px;

    .action {
      cursor: pointer;
      border-radius: 210px;
      padding: 10px 30px;
      font-size: 16px;
      color: var(--vp-button-alt-text);
      background-color: var(--vp-button-alt-bg);

      &:nth-child(1) {
        color: var(--vp-button-brand-hover-text);
        background-color: var(--vp-button-brand-hover-bg);
      }

    }
  }

  .features {
    margin-top: 80px;
    width: 65vw;
    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: 220px;
    gap: 20px;

    .item {
      height: 220px;
      background: var(--vp-c-bg-soft);
      display: flex;
      flex-direction: column;
      padding: 24px;
      border-radius: 12px;

      .title {
        line-height: 24px;
        font-size: 16px;
        font-weight: 600;
      }

      .details {
        flex-grow: 1;
        padding-top: 8px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 500;
        color: var(--vp-c-text-2);
      }
    }
  }
}
</style>

<style module>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>
