# VueJS Tour

> VueJS Tour is a lightweight, simple and customizable tour plugin.
> It provides a quick and easy way to guide your users through your application.
## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Something Missing?](#something-missing)
## Getting Started
You can install `@globalhive/vuejs-tour` using npm or by downloading the minified build on GitHub.

```
npm install @globalhive/vuejs-tour
```

Then import the plugin in your application entry point (typically main.js if you used vue-cli to scaffold your project) and tell Vue to use it.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import VueJsTour from '@globalhive/vuejs-tour';
import "@globalhive/vuejs-tour/dist/style.css";

const app = createApp(App)
    .use(VueJsTour)
    .mount('#app')
```
## Usage

Put anywhere you like a `VTour` component. Most would put it inside the App.vue

For all individual elements you want to add a step on, make sure it can be retrieved with `document.querySelector()`. You can use any selector, an ID, a CSS class, data attributes, etc.


```html
<template>
  <div>
    <div id="selectByID">A DOM element on your page. The first step will pop on this element selected by its id 'selectByID'</div>
    <div class="selectByClass">A DOM element on your page. The second step will pop on this element selected by its class 'selectByClass'</div>
    <div data-step="3">A DOM element on your page. The third and final step will pop on this element selected by the 'data-step="3"' attribute</div>

    <VTour :steps="steps" highlight autostart/>
  </div>
</template>

<script setup>
const steps = [
    {
        target: '#selectByID',
        content: "This is the first step",
    },
    {
        target: '.selectByClass',
        content: "This is the second step",
        placement: "bottom",
    },
    {
        target: '[data-step="3"]',
        content: "This is the third step",
    }
];
</script>
```

***Documentation is still in progress.***

## Something Missing?

If you have a feature request or found a bug, [let us know](https://github.com/globalhive/vuejs-tour/issues) by submitting an issue.
