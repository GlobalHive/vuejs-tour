# Create a tour

::: warning
VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x
:::

## Adding the component

Add the VueJS Tour component anywhere in your app. It is recommended to add it to `App.vue`
and create the required steps using `<script setup>` syntax.

```vue{7,12-25}
<template>
  <div>
    <div id="selectByID">Selected by its id 'selectByID'</div>
    <p class="selectByClass">Telected by its class 'selectByClass'</p>
    <button data-step="3">Selected by the 'data-step="3"' attribute</button>

    <VTour :steps="steps"/>
  </div>
</template>

<script setup>
const steps = [
  {
    target: '#selectByID',
    content: 'This is the first step',
  },
  {
    target: '.selectByClass',
    content: 'This is the second step, placed on the bottom of the target',
    placement: 'bottom',
  },
  {
    target: '[data-step="3"]',
    content: 'This is the third step',
  }
];
</script>
```


## Start the tour

To start the tour, you can use the `autoStart` prop...

```vue{7}
<template>
  <div>
    <div id="selectByID">Selected by its id 'selectByID'</div>
    <p class="selectByClass">Telected by its class 'selectByClass'</p>
    <button data-step="3">Selected by the 'data-step="3"' attribute</button>

    <VTour :steps="steps" autoStart/>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```

...or call the `startTour()` method on the component instance.

```vue{7,12,13,17-19}
<template>
  <div>
    <div id="selectByID">Selected by its id 'selectByID'</div>
    <p class="selectByClass">Telected by its class 'selectByClass'</p>
    <button data-step="3">Selected by the 'data-step="3"' attribute</button>

    <VTour ref="tour" :steps="steps"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);

const steps = [...];

onMounted(() => {
  tour.value.startTour();
});
</script>
```

The `target` property of the step object can be any valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).<br>
If the target is not found, the step will be skipped.
