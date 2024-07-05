# Step Options
The Step type is `ITourStep` and it has the following properties:

```typescript
export interface ITourStep {
    target: string; // The target element to attach the step to
    content: string; // The content of the step
    placement?: NanoPopPosition; // The placement of the step
}
```

```vue
<script setup lang="ts">
import type { ITourStep } from '@globalhive/vuejs-tour/Types';

const step: ITourStep = {
  target: '[data-step=0]',
  content: 'Hello Docs!',
  placement: 'right'
} as ITourStep;

const stepArray: ITourStep[] = [step];
</script>
```

## Target
The `target` property is a string that represents the target element to attach the step to. The value of the `target` property is a CSS selector that will be used to find the target element.

### Example
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

## Content
The `content` property is a string that represents the content of the step. The content can be any HTML content.

### Example
::: code-group
```vue [Text as Content]
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content'
  }];
</script>
<b>asd</b>
```
```vue [HTML as Content]
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: '<b>Bold</b><br><i>Italic</i><br><u>Underline</u>'
  }];
</script>
```
:::

## Placement
The `placement` property is a type of `NanoPopPosition` which is a string that represents the placement of the step.

```typescript
type Direction = 'top' | 'left' | 'bottom' | 'right';
type Alignment = 'start' | 'middle' | 'end';
export type NanoPopPosition = `${Direction}-${Alignment}` | Direction;
```
The value of the `placement` property is a string that can be one of the following:

`top`, `top-start`, `top-middle`, `top-end`, `left`, `left-start`, `left-middle`, `left-end`, `bottom`, `bottom-start`, `bottom-middle`, `bottom-end`, `right`, `right-start`, `right-middle`, `right-end`.

If not provided, the `placement` property will default to `right-middle`.

### Example
```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Top Placement',
    placement: 'top' // Placed at top-middle if enough space
  }];
</script>
```

::: info
`vuejs-tour` will automatically adjust the placement of the step if there is not enough space.
:::