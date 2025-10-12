import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'VueJS Tour',
  description: 'Guide your users through your application quickly and easily.',
  lang: 'en-US',
  base: '/vuejs-tour/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    nav: [
      { text: 'Guide', link: '/guide/what-is-vuejs-tour' },
      {
        text: '2.4.2',
        items: [
          {
            text: 'Changelog',
            link: 'https://github.com/GlobalHive/vuejs-tour/blob/master/CHANGELOG.md',
          },
          { text: 'Roadmap', link: '/guide/roadmap' },
          {
            text: 'Issues',
            link: 'https://github.com/GlobalHive/vuejs-tour/issues',
          },
        ],
      },
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
          ],
        },
        {
          text: 'Customization',
          collapsed: false,
          items: [
            {
              text: 'VTour Component',
              items: [
                { text: 'Start Options', link: '/guide/start-options' },
                { text: 'Highlight Target', link: '/guide/highlight-target' },
                { text: 'Using a Backdrop', link: '/guide/using-a-backdrop' },
                { text: 'Hiding the Arrow', link: '/guide/hiding-the-arrow' },
                { text: 'Tour Margin', link: '/guide/tour-margin' },
                { text: 'Saving Progress', link: '/guide/saving-progress' },
                { text: 'Scroll to Element', link: '/guide/scroll-to-element' },
              ],
            },
            {
              text: 'Step Options',
              items: [
                { text: 'The Step Type', link: '/guide/the-step-type' },
                { text: 'Setting a Target', link: '/guide/setting-a-target' },
                {
                  text: 'Define the Content',
                  link: '/guide/define-the-content',
                },
                { text: 'Using Placement', link: '/guide/using-placement' },
                {
                  text: 'The onBefore Event',
                  link: '/guide/the-onbefore-event',
                },
                { text: 'The onAfter Event', link: '/guide/the-onafter-event' },
                {
                  text: 'Highlight Target',
                  link: '/guide/step-highlight-target',
                },
                {
                  text: 'Using a Backdrop',
                  link: '/guide/step-using-a-backdrop',
                },
                {
                  text: 'Scroll to Element',
                  link: '/guide/step-scroll-to-element',
                },
              ],
            },
          ],
        },
        {
          text: 'Advanced',
          collapsed: false,
          items: [
            { text: 'Skipping a Tour', link: '/guide/skipping-a-tour' },
            { text: 'Button Labels', link: '/guide/button-labels' },
            { text: 'Multiple Tours', link: '/guide/multiple-tours' },
            {
              text: 'Styling',
              items: [
                { text: 'CSS Theme', link: '/guide/css-theme' },
                { text: 'Component Slots', link: '/guide/component-slots' },
              ],
            },
          ],
        },
        {
          text: "What's next?",
          collapsed: false,
          items: [
            { text: 'Roadmap', link: '/guide/roadmap' },
            {
              text: 'Changelog',
              link: 'https://github.com/GlobalHive/vuejs-tour/blob/master/CHANGELOG.md',
            },
          ],
        },
      ],
      '/reference/': [
        {
          text: 'Reference',
          collapsed: false,
          items: [{ text: 'Coming Soon', link: '/reference/coming-soon' }],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/GlobalHive/vuejs-tour' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright:
        'Made with ❤️ by <a href = "https://github.com/GlobalHive/vuejs-tour">Global Hive</a>',
    },
    editLink: {
      pattern:
        'https://github.com/GlobalHive/vuejs-tour/tree/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
});
