---
layout: home

hero:
  name: "VueJS Tour"
  tagline: Guide your users through your application quickly and easily.
  image: https://vuejs.org/images/logo.png
  actions:
    - theme: brand
      text: What is VueJS Tour?
      link: /guide/what-is-vuejs-tour
    - theme: alt
      text: Quickstart
      link: /guide/getting-started
    - theme: alt
      text: Github
      link: https://github.com/GlobalHive/vuejs-tour

features:
  - icon: ✨
    title: Up-to-date
    details: VueJS Tour utilizes Vue 3's Composition API and TypeScript. This ensures a more reliable, maintainable, and type-safe codebase.
  - icon: 💪
    title: Simple and Easy
    details: VueJS Tour requires minimal setup, you can quickly create engaging and informative tours that enhance user experience.
  - icon: 🎨
    title: Themeable
    details: VueJS Tour supports theming through SASS/SCSS, allowing you to customize the appearance of your tours.
---


<script setup>
import VTour from '../src/components/VTour.vue';
import "../src/style/style.scss";

const steps = [{
    target: '.image-src',
    content: 'Welcome to the VueJS Tour documentation!',
    placement: 'left'
    },{
    target: '.image-src',
    content: '<div style="text-align: end">Maybe right is better?</div>'
    },{
    target: '.VPFooter > .container > .copyright > a',
    content: 'Made with ❤️ by <a href="https://github.com/GlobalHive/vuejs-tour">Global Hive</a>',
    placement: 'top'
    },{
    target: 'a[href="/vuejs-tour/reference/coming-soon.html"]',
    content: '<center style="padding: 12px">Looking for the Reference?</center>',
    placement: 'bottom'
    },{
    target: 'p.tagline',
    content: 'With full <b>HTML</b> <u>support</u>!<br><img style="margin-top: 8px" src="https://media1.tenor.com/m/AET3FD31-rgAAAAC/slow-clap-cheers.gif"/>',
    placement: 'left'
    },{
    target: '.brand',
    content: "Let's get started! 🚀",
    placement: 'bottom'
    }];

const onTourEnd = () => {
    window.location.href = '/vuejs-tour/guide/what-is-vuejs-tour.html';
}
</script>

<VTour :steps="steps" autoStart highlight saveToLocalStorage="never" @onTourEnd.once="onTourEnd"/>