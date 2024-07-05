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

::: tip
The `startDelay` prop is in milliseconds.
:::