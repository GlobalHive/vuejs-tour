# Using a Backdrop
The `backdrop` property is a boolean that represents whether the backdrop should be displayed or not. The backdrop is a semi-transparent overlay that covers the entire screen, except for the highlighted element.

## Using `backdrop` prop
To enable the backdrop, you can use the `backdrop` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart backdrop/> // [!code ++]
  ...
</template>
```

::: tip
By default, the backdrop is disabled.
:::