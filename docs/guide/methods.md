# Methods

::: warning
VueJS Tour is written for Vue 3. There are no plans to support Vue 2.x
:::

## Component instance methods

### `startTour();`

The `startTour();` method is used to start the tour. It will start the tour at the first step.

```vue{4,9-10,14-16}
<template>
  <div>
    ...
    <VTour ref="tour" :steps="steps"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);

const steps = [...];

onMounted(() => {
  tour.value.startTour();
});
</script>
```

It is called automatically if the `autoStart` prop has been added to the `VTour` component.

```vue{4}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart/>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```

### `nextStep();`

The `nextStep();` method is used to move to the next step in the tour.
<u>If you are on the last step, it will end the tour.</u>

```vue{11}
<template>
  ...
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);
const steps = [...];

onMounted(() => {
  tour.value.nextStep();
});
</script>
```

### `prevStep();`

The `prevStep();` method is used to move to the previous step in the tour.
<u>If you are on the first step, it will be ignored.</u>

```vue{11}
<template>
  ...
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);
const steps = [...];

onMounted(() => {
  tour.value.prevStep();
});
</script>
```

### `endTour();`

The `endTour();` method creates a `localStore` variable, called `vjt-tour`, to prevent the tour from starting again, 
destroys the `PopperJS` instance and hides the step, ending the tour.

```vue{11}
<template>
  ...
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);
const steps = [...];

onMounted(() => {
  tour.value.endTour();
});
</script>
```

### `resetTour()`

The `resetTour();` method is used to reset the tour to the first step.
It will also remove the `vjt-tour` variable from `localStore`.

```vue{11}
<template>
  ...
</template>

<script setup>
import { ref, onMounted } from 'vue';
const tour = ref(null);
const steps = [...];

onMounted(() => {
  tour.value.resetTour();
});
</script>
```

## Action slot methods

The action slot methods are used to control the tour from within the action slot.<br>
There are 3 methods available: `nextStep()`, `prevStep()` and `endTour()`.

### `nextStep();`

The `nextStep();` method is used to move to the next step in the tour.
<u>If you are on the last step, it will end the tour.</u>

```vue{5-7}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart>
        <template #actions="{ nextStep, prevStep, endTour }">
            <button type="button" @click.prevent="nextStep">Next Step</button>
        </template>
    </VTour>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```

### `prevStep();`

The `prevStep();` method is used to move to the previous step in the tour.
<u>If you are on the first step, it will be ignored.</u>

```vue{5-7}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart>
        <template #actions="{ nextStep, prevStep, endTour }">
            <button type="button" @click.prevent="prevStep">Previous Step</button>
        </template>
    </VTour>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```

### `endTour();`

The `endTour();` method creates a `localStore` variable, called `vjt-tour`, to prevent the tour from starting again,
destroys the `PopperJS` instance and hides the step, ending the tour.

```vue{5-7}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart>
        <template #actions="{ nextStep, prevStep, endTour }">
            <button type="button" @click.prevent="endTour">End Tour</button>
        </template>
    </VTour>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```

## Content slot variables

The content slot variables are used to access the step data from within the content slot.<br>
There is 1 variable available: `content`.

### `content`

The `content` variable is used to access the step `content` from within the content slot.

```vue{5-7}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart>
        <template #content="{ content }">
            <div>{{ content.value }}</div>
        </template>
    </VTour>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```
