# Tour Margin

You can set the margin of the tour by using the `margin` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart hideArrow/> // [!code --]
  <VTour :steps="steps" autoStart :margin="0"/> // [!code ++]
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

const steps = [{ target: '[data-step="0"]', content: 'Margin of 64' }];
</script>

<VTour :steps="steps" autoStart :margin="64" saveToLocalStorage='never' noScroll />

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

::: info
The default value of the `margin` prop is `8`. If the [`highlight`](./highlight-target.md) prop is set, `14` is used as the default value.
:::