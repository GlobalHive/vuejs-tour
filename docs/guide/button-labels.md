# Button Labels
To customize the labels of the buttons, you can use the `buttonLabels` prop in the `VTour` component.

## Using the `buttonLabels` prop

```vue
<template>
  <VTour :steps="steps" autoStart :buttonLabels='{next: "➡", back: "⬅", done: "✓", skip: "↪"}'/> // [!code ++]
  <VTour :steps="steps" autoStart> // [!code --:8]
    <template #actions="{ lastStep, nextStep, endTour, _CurrentStep, getNextLabel, props }">
      <div class="vjt-actions">
        <button v-if="_CurrentStep.lastStep < _CurrentStep.currentStep" type="button" @click.prevent="lastStep()" v-text="props.buttonLabels?.back || 'Back'"></button>
        <button type="button" @click.prevent="nextStep()" v-text="getNextLabel"></button>
      </div>
    </template>
  </VTour>
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

const steps = [{ target: '[data-step="0"]', content: 'Customized button labels' }];
</script>

<VTour :steps="steps" autoStart saveToLocalStorage='never' noScroll :buttonLabels='{next: "➡", back: "⬅", done: "✓", skip: "↪"}' />

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

## Customizing the action buttons
You can also customize the action button labels by using the `actions` slot.

```vue
<template>
  <VTour :steps="steps" autoStart :buttonLabels='{next: "➡", back: "⬅", done: "✓", skip: "↪"}'/> // [!code --]
  <VTour :steps="steps" autoStart> // [!code ++:9]
    <template #actions="{ lastStep, nextStep, endTour, _CurrentStep, getNextLabel, props }">
      <div class="vjt-actions">
        <button v-if="_CurrentStep.lastStep < _CurrentStep.currentStep" type="button" @click.prevent="lastStep()">⬅</button>
        <button v-if="!props.hideSkip" type="button" @click.prevent="endTour()">↪</button>
        <button type="button" @click.prevent="nextStep()">➡</button>
      </div>
    </template>
  </VTour>
</template>
```

The `VTour` component uses a computed property `getNextLabel` to determine the label of the `Next` button.
```js
const getNextLabel: ComputedRef<String> = computed(() => {
    if(_CurrentStep.currentStep === props.steps.length - 1) return props.buttonLabels?.done || 'Done';
    return props.buttonLabels?.next || 'Next';
});
```
::: info
The `nextStep` method will automatically call the `endTour` method when the last step is reached.
:::