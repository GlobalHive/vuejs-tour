# Start Options
To start a tour, you can use the `autoStart` prop or call the `startTour` method on the `VTour` component. Additionally, you can use the `startDelay` prop to delay the start of the tour.

## Using the `autoStart` prop
```vue
<script setup lang='ts'>
    // ...
    const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart/> // [!code ++]
  ...
</template>
```
When using the `autoStart` prop, the tour will start automatically when the component is mounted.

<script setup>
import { ref } from 'vue';
import VTour from '../../src/components/VTour.vue';
import "../../src/style/style.scss";

const vTourRef = ref();
const autoStart = [{ target: '[data-step="0"]', content: 'Tour started automatically' }];
const manualStart = [{ target: '[data-step="1"]', content: 'Tour started' }];
const delayStart = [{ target: '[data-step="2"]', content: 'Tour started after 2 seconds' }];
const currentSteps = ref(autoStart);
const delay = ref(0);

function clickToStart() {
    currentSteps.value = manualStart;
    vTourRef.value.startTour();
    delay.value = 2000;
}

function clickToStartDelay() {
    currentSteps.value = delayStart;
    vTourRef.value.startTour();
}
</script>

<style>
    .custom-block.example {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 1rem;
        height: 16rem;
        background-color: var(--vp-c-bg-alt);
        text-align: center;
    }
</style>

<VTour ref="vTourRef" :steps="currentSteps" autoStart saveToLocalStorage='never' noScroll :startDelay="delay"/>

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

## Using the `startTour` method
```vue
<script setup lang='ts'>
    // ...
    const steps = [...];
    const vTour = ref(); // [!code ++:2]
    vTour.value.startTour();
</script>

<template>
  <VTour :steps="steps" autoStart/> // [!code --]
  <VTour :steps="steps" ref="vTour"/> // [!code ++]
  ...
</template>
```
When using the `startTour` method, the tour will start when the method is called. This can be useful when you want to start the tour based on user interaction.

<div class="custom-block example">
    <button type="button" data-step="1" @click="clickToStart">Click To Start</button>
</div>

::: tip
Every time you use `startTour`, the tour begins from the start. It will do this until finished, unless you change [`saveToLocalStorage`](./saving-progress) to `step`, which saves progress.
:::

## Using the `startDelay` prop

The `startDelay` prop allows you to delay the start of the tour. This can be useful when you want to give the user some time to get familiar with the page before starting the tour.

```vue
<template>
  <VTour :steps="steps" ref="vTour"/> // [!code --]
  <VTour :steps="steps" ref="vTour" startDelay='1000'/> // [!code ++]
  ...
</template>
```

<div class="custom-block example">
    <button type="button" data-step="2" @click="clickToStartDelay">Click To Start<br>With 2 Seconds Delay</button>
</div>

::: tip
The `startDelay` prop is in milliseconds.
:::