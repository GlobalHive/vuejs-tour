# Setting a Target
The `target` property is a string that represents the target element to attach the step to. The value of the `target` property is a CSS selector that will be used to find the target element.

::: code-group
```vue [Data as Target]
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Content'
  }];
</script>

<template>
  <div data-step="0">Element</div>
</template>
```
```vue [Class as Target]
<script setup>
  const steps = [{
    target: '.class-of-element',
    content: 'Content'
  }];
</script>

<template>
  <div class="class-of-element">Element</div>
</template>
```
```vue [ID as Target]
<script setup>
  const steps = [{
    target: '#id-of-element',
    content: 'Content'
  }];
</script>

<template>
  <div id="id-of-element">Element</div>
</template>
```
:::