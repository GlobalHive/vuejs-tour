# Tour Margin

You can set the margin of the tour by using the `margin` prop in the `VTour` component.

```vue
<script setup lang='ts'>
  // ...
  const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart hideArrow/> // [!code --]
  <VTour :steps="steps" autoStart :margin="0"/> // [!code ++]
  ...
</template>
```

::: info
The default value of the `margin` prop is `8`. If the [`highlight`](./highlight-target.md) prop is set, `14` is used as the default value.
:::