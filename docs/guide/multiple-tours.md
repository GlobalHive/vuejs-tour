# Multiple Tours
There are two ways to create multiple tours on the same page. You can either create multiple `VTour` components or create a single `VTour` component with multiple steps.

::: warning
This is an advanced feature and requires a good understanding of the `vuejs-tour` package.
:::

## Single Component
To create multiple tours using a single `VTour` component, you can use the `steps` and `name` prop to switch between different tours.
<div class="tip custom-block" style="padding-top: 8px">
This is the recommended method for creating multiple tours on the same page.
</div>

### Defining the tours
First you need to define the steps for each tour.

```vue{3-7,12}
<script setup lang='ts'>
  ...
  const tourSteps1 = [...];
  const tourSteps2 = [...];
  const tourSteps = ref(tourSteps1);
  const tourName = ref('tour1');
  const vTour = ref();
  vTour.value.startTour();
</script>

<template>
  <VTour :steps="tourSteps" :name="tourName" ref="vTour"/>
  ...
</template>
```
In this case we are creating two tours `tour1` and `tour2`.
Each with their corresponding steps `tourSteps1` and `tourSteps2`.

The `tourSteps` and `tourName` variables are reactive and can be changed at runtime.

### Switching between tours
To switch between tours, you just switch the `tourSteps` and `tourName` values.
```vue{10-19}
<script setup lang='ts'>
  ...
  const tourSteps1 = [...];
  const tourSteps2 = [...];
  const tourSteps = ref(tourSteps1);
  const tourName = ref('tour1');
  const vTour = ref();
  vTour.value.startTour();
  
  function switchTour() {
    if (tourName.value === 'tour1') {
      tourSteps.value = tourSteps2;
      tourName.value = 'tour2';
    } else {
      tourSteps.value = tourSteps1;
      tourName.value = 'tour1';
    }
    vTour.value.startTour();
  }
</script>

<template>
  <VTour :steps="tourSteps" :name="tourName" ref="vTour"/>
  ...
</template>
```
Now everytime you call the `switchTour` function, the tour will switch between `tour1` and `tour2`.
::: tip
There's no need to call `stopTour` before switching tours, the single `VTour` component will handle that for you.
:::

## Multiple Components
You can create multiple `VTour` components with different steps and options.

### Defining the tours
First you need to define the steps for each tour.
```vue{3-6,11-12}
<script setup lang='ts'>
  ...
  const steps = [...];
  const steps2 = [...];
  const vTour = ref();
  const vTour2 = ref();
  vTour.value.startTour();
</script>

<template>
  <VTour :steps="steps" ref="vTour" name="FirstTour"/>
  <VTour :steps="steps2" ref="vTour2" name="SecondTour"/>
  ...
</template>
```
In this case we are creating two tours `vTour` and `vTour2`.
Each with their corresponding steps `steps` and `steps2`.

### Switching between tours
To switch between tours, you just call the `startTour` method on the corresponding `VTour` component.
```vue{9-17}
<script setup lang='ts'>
  ...
  const steps = [...];
  const steps2 = [...];
  const vTour = ref();
  const vTour2 = ref();
  vTour.value.startTour();
  
  function switchTour() {
    if (vTour.value.isActive) {
      vTour.value.stopTour();
      vTour2.value.startTour();
    } else {
      vTour2.value.stopTour();
      vTour.value.startTour();
    }
  }
</script>

<template>
  <VTour :steps="steps" ref="vTour" name="FirstTour"/>
  <VTour :steps="steps2" ref="vTour2" name="SecondTour"/>
  ...
</template>
```
Now everytime you call the `switchTour` function, the tour will switch between `tour1` and `tour2`.

::: warning
When using multiple `VTour` components, it is possible to have multiple tours active at the same time.
Which may cause unexpected behavior and overlapping tours.

This is why the single component method is recommended.
:::
