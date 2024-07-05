# Highlight Target
The `highlight` property is a boolean that represents whether the target should be highlighted or not.

## Using the `highlight` prop
To enable the highlight effect, you can use the `highlight` prop in the `VTour` component. 

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" ref="vTour" startDelay='1000'/> // [!code --]
  <VTour :steps="steps" autoStart highlight/> // [!code ++]
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
import VTour from '../../src/components/VTour.vue';
import "../../src/style/style.scss";

const steps = [{ target: '[data-step="0"]', content: 'Target highlighted' }];

</script>
<VTour :steps="steps" autoStart saveToLocalStorage='never' noScroll highlight/>

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

::: info
By default, highlighting is disabled.
:::