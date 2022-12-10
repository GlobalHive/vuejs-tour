---
home: true
heroImage: https://vuejs.org/images/logo.png
tagline: Guide your users through your application quickly and easily.
footer: MIT Licensed | Made with ❤️ by <a href="https://github.com/GlobalHive/vuejs-tour">Global Hive</a>
footerHtml: true
title: Home
actions:
  - text: Get Started →
    link: /guide/getting-started
features:
- title: ✨ Up-to-date
  details: VueJS Tour is written in Vue 3 composition api and the latest version of PopperJS.
- title: 🔌 Simple API
  details: VueJS Tour has a simple API that allows you to create guided tours with ease.
- title: 🎨 Themeable
  details: VueJS Tour uses sass/scss to make it easy to customize the look of your tour.
---

<VTour :steps="steps" ref="tour" highlight/>

<script setup>
import { onMounted, ref } from "vue";
const tour = ref(null);
const steps = [
    {
        target: ".hero img",
        content: "Welcome to the VueJS Tour documentation!",
    },
    {
        target: ".footer a",
        content: 'Made with ❤️ by <a href="https://github.com/globalhive">Global Hive</a>',
    },
    {
        target: ".navbar-item a",
        content: '<br><center>Looking for the API?</center><br>',
    },
    {
        target: ".description",
        content: 'With full <b>HTML</b> <u>support</u> <i>for the content of your steps!</i><br><br><img src="https://i.giphy.com/media/D6WuLOKOpR2fK/giphy.webp">',
        placement: "right",
    },
    {
        target: ".actions a",
        content: "Let's get started, shall we?",
        placement: "right",
    }
];
onMounted(() => {
        tour.value.resetTour();
});
</script>
<style lang="scss">
    @import "../src/style/style.scss";
</style>
