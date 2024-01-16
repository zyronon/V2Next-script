import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "V2Next",
  description: "V2Next 介绍",
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   {text: 'Home', link: '/'},
    //   {text: 'Examples', link: '/markdown-examples'}
    // ],

    sidebar: [
      {
        text: 'Examples1',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      }
    ],

    socialLinks: [
      {icon: 'github', link: 'https://github.com/zyronon/v2ex-script'}
    ],

  }
})
