# Callbacks

::: warning
VueJS Tour is written for Vue 3. There are no plans to support Vue 2.x
:::

## Component instance callbacks

### `onTourStart();`

The `@onTourStart` callback is executed when the tour starts.

```vue{4,11-13}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart @onTourStart='onTourStart'/>
  </div>
</template>

<script setup>
const steps = [...];

const onTourStart = () => {
  console.log('Tour started!');
};
</script>
```

### `onTourEnd();`

The `@onTourEnd` callback is executed when the tour ends.

```vue{4,11-13}
<template>
  <div>
    ...
    <VTour :steps="steps" autoStart @onTourEnd='onTourEnd'/>
  </div>
</template>

<script setup>
const steps = [...];

const onTourEnd = () => {
  console.log('Tour ended!');
};
</script>
```
