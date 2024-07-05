# Saving Progress

You can save the progress of the tour in the local storage of the browser. This way, the user can continue the tour from where they left off.

## Using the `saveToLacalStorage` prop

To save the progress of the tour, you can use the `saveToLocalStorage` prop in the `VTour` component. This prop accepts a string value of `never`, `step` or `end`.

```vue
<script setup lang='ts'>
    // ...
    const steps = [...];
</script>

<template>
  <VTour :steps="steps" autoStart :margin="0"/> // [!code --]
  <VTour :steps="steps" autoStart saveToLocalStorage='step'/> // [!code ++]
  ...
</template>
```

### `never`
<u>No progress will be saved.</u> Even if the user has already completed the tour, it will start from the beginning. 
Which means that you are responsible for managing the progress of the tour.

### `step`
The progress of the tour will be saved after each step. So, if the user has completed the first 3 steps and exits, the next time they open the browser, the tour will start from where they left off.

### `end`
The progress of the tour will be saved only after the user has completed the tour. If the user exits the tour before completing it, the next time they open the browser, the tour will start from the beginning.
::: info
This is the default value of the `saveToLocalStorage` prop.
:::