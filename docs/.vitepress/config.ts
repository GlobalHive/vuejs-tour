import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "VueJS Tour",
  description: "Guide your users through your application quickly and easily.",
  lang: 'en-US',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    nav: [
      { text: 'Guide', link: '/' },
      { text: 'Reference', link: '/' },
      { text: '1.2.3', items: [
        { text: 'Changelog', link: 'https://github.com/GlobalHive/vuejs-tour/blob/master/CHANGELOG.md' },
        { text: 'Issues', link: 'https://github.com/GlobalHive/vuejs-tour/issues' }]
      }
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          collapsed: false,
          items: [
              { text: 'What is VueJS Tour?', link: '/guide/what-is-vuejs-tour' },
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Create a Tour', link: '/guide/create-a-tour' },
          ]
        },
        {
          text: 'Customization',
          collapsed: false,
          items: [
            { text: 'Start Options', link: '/guide/start-options' },
            { text: 'Highlight Target', link: '/guide/highlight-target' },
            { text: 'Using a Backdrop', link: '/guide/using-a-backdrop' },
            { text: 'Saving Progress', link: '/guide/using-a-backdrop' },
            { text: 'Step Options', link: '/guide/step-options' },
          ]
        },
        {
          text: 'Advanced',
          collapsed: false,
          items: [
            { text: 'Multiple Tours', link: '/guide/multiple-tours' },
          ]
        }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/GlobalHive/vuejs-tour' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Made with ❤️ by Global Hive'
    },
    editLink: {
      pattern: 'https://github.com/GlobalHive/vuejs-tour/tree/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
  }
})
