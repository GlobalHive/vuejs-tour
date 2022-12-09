# Getting Started

::: warning
VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x
:::

## Prerequisites

* [Node.js](https://nodejs.org/)
* [Vue 3 (Composition API)](https://vuejs.org/guide/introduction.html#composition-api)

## Installation

This section will guide you through the process of installing VueJS Tour.

* Step 1: Go to your project directory and install VueJS Tour using npm:

```bash
cd my-project
npm install @globalhive/vuejs-tour
```

* Step 2: Import the plugin in your application entry point (typically `main.js`):

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import VueJsTour from '@globalhive/vuejs-tour';
import '@globalhive/vuejs-tour/dist/vuejs-tour.css';

const app = createApp(App)
  .use(VueJsTour)
  .mount("#app");
```
Everything is ready! Now you can use VueJS Tour in your application.
Next, learn how to [create a tour](/guide/create-a-tour).
