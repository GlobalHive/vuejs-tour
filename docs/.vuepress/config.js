import { defaultTheme, defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  base: "/vuejs-tour/",
  lang: 'en-US',
  title: 'VueJS Tour',
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
    repo: 'globalhive/vuejs-tour',
    docsRepo: 'globalhive/vuejs-tour',
    docsDir: 'docs',
    docsBranch: 'master',
    navbar: [
      {
        text: 'API',
        link: '/guide/props',
      }
    ],
    sidebar: [
      {
        text: 'Introduction',
        collapsible: true,
        children: ['what-is-vuejs-tour'],
      },
      {
        text: 'VueJS Tour Reference',
        collapsible: true,
        children: [ 'getting-started', 'create-a-tour', 'usage' ],
      },
      {
        text: 'VueJS Tour API',
        collapsible: true,
        children: [ 'props', 'options', 'methods', 'styling' ],
      },
      ],
  }),
})
