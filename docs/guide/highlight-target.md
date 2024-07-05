# Highlight Target
The `highlight` property is a boolean that represents whether the target should be highlighted or not.

## Using the `highlight` prop
To enable the highlight effect, you can use the `highlight` prop in the `VTour` component. 

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" ref="vTour" startDelay='1000'/> // [!code --]
  <VTour :steps="steps" autoStart highlight/> // [!code ++]
  ...
</template>
```

::: info
By default, highlighting is disabled.
:::