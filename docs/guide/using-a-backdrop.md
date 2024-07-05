# Using a Backdrop
The `backdrop` property is a boolean that represents whether the backdrop should be displayed or not. The backdrop is a semi-transparent overlay that covers the entire screen, except for the highlighted element.

## Using the `backdrop` prop
To enable the backdrop, you can use the `backdrop` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart highlight/> // [!code --]
  <VTour :steps="steps" autoStart backdrop/> // [!code ++]
  ...
</template>
```

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

<script setup>
import { ref } from 'vue';
import VTour from '../../src/components/VTour.vue';
import "../../src/style/style.scss";

const vTourComponent = ref();
const steps = [{ target: '[data-step="0"]', content: 'Click "Done" to close the Tooltip' }];

function clickToStart() {
    vTourComponent.value.startTour();
}
</script>

<VTour ref="vTourComponent" :steps="steps" saveToLocalStorage='never' noScroll backdrop/>

<div class="custom-block example">
    <button data-step="0" @click="clickToStart">Click To Start<br>With Backdrop Enabled</button>
</div>

::: info
By default, the backdrop is disabled.
:::