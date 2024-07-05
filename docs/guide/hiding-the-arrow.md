# Hiding the Arrow

To hide the arrow, you can use the `hideArrow` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart backdrop/> // [!code --]
  <VTour :steps="steps" autoStart hideArrow/> // [!code ++]
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

const steps = [{ target: '[data-step="0"]', content: 'Tooltip arrow hidden' }];
</script>

<VTour :steps="steps" autoStart hideArrow saveToLocalStorage='never' noScroll />

<div class="custom-block example">
    <p data-step="0" @click="clickToStart">Target</p>
</div>

::: info
By default, the arrow is displayed.
:::
