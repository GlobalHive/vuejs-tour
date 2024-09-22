# Scroll to Element

To disable scrolling, you can use the `noScroll` prop in the `VTour` component.

```vue
<script setup lang='ts'>
    // ...
    const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart saveToLocalStorage='step'/> // [!code --]
  <VTour :steps="steps" autoStart noScroll/> // [!code ++]
  ...
</template>
```

::: info
By default, scrolling is enabled.
:::