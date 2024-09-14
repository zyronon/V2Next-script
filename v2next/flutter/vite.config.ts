import { defineConfig } from 'vite';
import monkey from 'vite-plugin-monkey';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'V2EX - Flutter',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=v2ex.com',
        match: [
          'https://v2ex.com/',
          'https://v2ex.com/?tab=*',
          'https://v2ex.com/t/*',
          'https://v2ex.com/recent*',
          'https://v2ex.com/go/*',
          'https://*.v2ex.com/',
          'https://*.v2ex.com/?tab=*',
          'https://*.v2ex.com/t/*',
          'https://*.v2ex.com/recent*',
          'https://*.v2ex.com/go/*'
        ],
        namespace: 'npm/vite-plugin-monkey',
        description: '楼中楼回复(支持感谢数排序)、自动签到、快捷回复图片和表情、列表预览内容、点击帖子弹框展示详情、对用户打标签、回复上下文、记录上次阅读位置、自定义背景、使用 SOV2EX 搜索、正文超长自动折叠、划词 base64 解码、一键@所有人,@管理员、操作按钮(感谢、收藏、回复、隐藏)异步请求、支持黑暗模式',
        author: 'zyronon',
      },
    }),
  ],
});
