# Getting Started
Installing VueJS Tour is a straightforward process. This guide will walk you through the installation process and help you set up your first tour.

## Try it Online
You can try VueJS Tour directly in your browser on [StackBlitz](https://stackblitz.com/edit/vitejs-vite-vslj9h?file=src%2FApp.vue).

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) version 18.3 or higher.
- [Vue 3.x](https://vuejs.org/) or higher.
- Terminal for installing VueJS Tour.

VueJS Tour can be installed using npm, pnpm, yarn, or bun. The following command will install VueJS Tour in your project.
::: code-group sh
```sh [npm]
npm add @globalhive/vuejs-tour
```
```sh [pnpm]
pnpm add @globalhive/vuejs-tour
```
```sh [yarn]
yarn add @globalhive/vuejs-tour
```
```sh [bun]
bun add @globalhive/vuejs-tour
```
:::

## Basic Setup
In the following example, we are importing the `VTour` component from VueJS Tour and using it in the `App.vue` file.
We are also importing the default styles of VueJS Tour.
```vue
<script setup lang='ts'>
    import HelloWorld from './components/HelloWorld.vue';
    import { VTour } from '@globalhive/vuejs-tour';// [!code ++:2]
    import '@globalhive/vuejs-tour/dist/style.css';
</script>

<template>
    <VTour/>// [!code ++]
    <div>
        <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
            <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>
```
::: danger Breaking Changes
Since version 2.0.1, VueJS Tour has been rewritten in TypeScript. The `VTour` component is now a named export and must be imported as such.
::: details Version 1.x.x
Import the plugin in your application entry point (`main.js`) file.
```js{3,4,7}
import { createApp } from "vue";
import App from "./App.vue";
import VueJsTour from '@globalhive/vuejs-tour';
import '@globalhive/vuejs-tour/dist/style.css';

const app = createApp(App)
  .use(VueJsTour)
  .mount("#app");
```
:::

Everything is now set up, and you can start [creating your first tour](./create-a-tour).