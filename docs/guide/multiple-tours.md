# Multiple Tours
There are two ways to create multiple tours on the same page. You can either create multiple `VTour` components or create a single `VTour` component with multiple steps.

## Single Component
To create multiple tours using a single `VTour` component, you can use the `steps` and `name` prop to switch between different tours.

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