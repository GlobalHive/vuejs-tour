# Getting Started

## Installation

```
npm install @globalhive/vuejs-tour
```

Import the plugin in your main.js file:

```
import { createApp } from "vue";
import App from "./App.vue";
import VueJsTour from '@globalhive/vuejs-tour';
import '@globalhive/vuejs-tour/dist/vuejs-tour.css';

const app = createApp(App)
  .use(VueJsTour)
  .mount("#app");
```

Everything is ready! Now you can use VueJS Tour in your application.
Next, learn how to [create a tour](https://globalhive.github.io/vuejs-tour/guide/create-a-tour.html).

Check the [documentation](https://globalhive.github.io/vuejs-tour/guide/getting-started.html) or browse the [API Reference](https://globalhive.github.io/vuejs-tour/guide/props.html).
