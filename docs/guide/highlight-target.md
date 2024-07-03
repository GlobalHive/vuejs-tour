# Highlight Target
The `highlight` property is a boolean that represents whether the target should be highlighted or not.

## Using `highlight` prop
To enable the highlight effect, you can use the `highlight` prop in the `VTour` component. 

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart highlight/> // [!code ++]
  ...
</template>
```

::: tip
By default, highlighting is disabled.
:::