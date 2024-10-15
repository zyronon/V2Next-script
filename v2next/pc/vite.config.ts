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
        version: '10.14',
        name: 'V2EX Next V2Next',
        icon: 'https://v2ex-script.vercel.app/favicon.ico',
        namespace: 'http://tampermonkey.net/',
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
        description: 'V2Next - 一个好用的V2EX脚本！ 已适配移动端',
        author: 'zyronon',
        license: 'GPL License',
        updateURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
        downloadURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
        supportURL: 'https://update.greasyfork.org/scripts/458024/V2Next.user.js',
        homepageURL: 'https://github.com/zyronon/web-scripts',
        homepage: 'https://github.com/zyronon/web-scripts',
        require: [
          'https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js',
          // 'https://cdn.bootcdn.net/ajax/libs /gl-matrix/3.4.2/gl-matrix.min.js'
          // 'https://lib.baomitu.com/jquery/3.7.1/jquery.min.js',
          // "https://lib.baomitu.com/gl-matrix/3.4.2/gl-matrix.min.js",
        ]
      },
      build: {
        fileName: 'V2Next.user.js',
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.min.js'),
        },
      },
    }),
  ],
  build: {
    // minify: true
  },
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  server: {
    host: '0.0.0.0',
    port: 5552
  }
});
