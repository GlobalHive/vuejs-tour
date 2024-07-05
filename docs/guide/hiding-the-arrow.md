# Hiding the Arrow

To hide the arrow, you can use the `hideArrow` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart backdrop/> // [!code --]
  <VTour :steps="steps" autoStart hideArrow/> // [!code ++]
  ...
</template>
```

::: info
By default, the arrow is displayed.
:::
