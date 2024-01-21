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
      //这里不能使用默认值$，会和vue/macros的冲突
      clientAlias: 'gmApi',
      entry: 'src/main.ts',
      userscript: {
        version: '8.0.6',
        name: 'V2Next-Mobile',
        icon: 'https://v2next.netlify.app/favicon.ico',
        namespace: 'http://tampermonkey.net/',
        require: [
          'http://code.jquery.com/jquery-3.7.1.min.js'
        ],
        match: [
          'https://v2ex.com/',
          'https://v2ex.com/?tab=*',
          'https://v2ex.com/t/*',
          'https://v2ex.com/recent*',
          'https://v2ex.com/go/*',
          'https://v2ex.com/member/*',
          'https://v2ex.com/changes*',
          'https://*.v2ex.com/',
          'https://*.v2ex.com/?tab=*',
          'https://*.v2ex.com/t/*',
          'https://*.v2ex.com/recent*',
          'https://*.v2ex.com/go/*',
          'https://*.v2ex.com/member/*',
          'https://*.v2ex.com/changes*',
        ],
        description: '楼中楼、简洁模式、高赞回复排序、查看回复上下文、发送图片和表情、UI美化、base64 解码等功能',
        author: 'zyronon',
        license: 'GPL License',
        updateURL: 'https://update.greasyfork.org/scripts/485356/V2Next-Mobile.user.js',
        downloadURL: 'https://update.greasyfork.org/scripts/485356/V2Next-Mobile.user.js',
        supportURL: 'https://update.greasyfork.org/scripts/485356/V2Next-Mobile.user.js',
        homepageURL: 'https://github.com/zyronon/web-scripts',
        homepage: 'https://github.com/zyronon/web-scripts'
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
    host: '0.0.0.0',
    port: 5551
  }
});
