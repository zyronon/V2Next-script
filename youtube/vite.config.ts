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
        version: '8.0.3',
        name: 'Youtube Next',
        icon: 'https://v2next.netlify.app/favicon.ico',
        namespace: 'http://tampermonkey.net/',
        match: [
          'https://youtube.com/*',
          'https://*.youtube.com/*',
        ],
        description: 'Youtube Next - 一个好用的V2EX脚本！ 已适配移动端',
        author: 'zyronon',
        license: 'GPL License',
        updateURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
        downloadURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
        supportURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
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
});
