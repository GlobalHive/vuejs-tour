# Skipping a Tour

The Skip button is displayed in the tour by default. 
You can hide it by customizing the action buttons or by using the `hideSkip` prop in the `VTour` component.

## Using the `hideSkip` prop
To hide the Skip button, you can use the `hideSkip` prop in the `VTour` component.

```vue
<script setup lang='ts'>
    // ...
    const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart saveToLocalStorage='step'/> // [!code --]
  <VTour :steps="steps" autoStart hideSkip/> // [!code ++]
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

const steps = [{ target: '[data-step="0"]', content: 'No skipping for you' }];
</script>

<VTour :steps="steps" autoStart hideSkip saveToLocalStorage='never' noScroll />

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

## Customizing the action buttons
You can also customize the action buttons by using the `actions` slot.
    
```vue
<template>
  <VTour :steps="steps" autoStart hideSkip/> // [!code --]
  <VTour :steps="steps" autoStart> // [!code ++:8]
    <template #actions="{ lastStep, nextStep, endTour, _CurrentStep, getNextLabel, props }">
      <div class="vjt-actions">
        <button v-if="_CurrentStep.lastStep < _CurrentStep.currentStep" type="button" @click.prevent="lastStep()" v-text="props.buttonLabels?.back || 'Back'"></button>
        <button type="button" @click.prevent="nextStep()" v-text="getNextLabel"></button>
      </div>
    </template>
  </VTour>
</template>
```

::: info
The Skip button is displayed by default.
:::