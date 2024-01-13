import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, {cdn} from 'vite-plugin-monkey';
import {resolve} from 'path'
import vueJsx from "@vitejs/plugin-vue-jsx";

function pathResolve(dir) {
  return resolve(__dirname, ".", dir)
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        version: '7.9.1',
        name: 'V2Next-Mobile',
        icon: 'https://www.google.com/s2/favicons?sz=64&domain=v2ex.com',
        namespace: 'http://tampermonkey.net/',
        match: [
          'https://v2ex.com/',
          'https://v2ex.com/?tab=*',
          'https://v2ex.com/t/*',
          'https://v2ex.com/recent*',
          'https://v2ex.com/go/*',
          'https://v2ex.com/member/*',
          'https://*.v2ex.com/',
          'https://*.v2ex.com/?tab=*',
          'https://*.v2ex.com/t/*',
          'https://*.v2ex.com/recent*',
          'https://*.v2ex.com/go/*',
          'https://*.v2ex.com/member/*',
          'http://localhost:8000/*'
        ],
        description: '楼中楼、简洁模式、高赞回复排序、查看回复上下文、发送图片和表情、UI美化、base64 解码等功能',
        author: 'zyronon',
        license: 'GPL License',
        updateURL: 'https://github.com/zyronon/v2ex-script/raw/master/dist/vite-project.user.js',
        downloadURL: 'https://github.com/zyronon/v2ex-script/raw/master/dist/vite-project.user.js',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  server: {
    host: '0.0.0.0'
  }
});
