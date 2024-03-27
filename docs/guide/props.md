# Props

::: warning
VueJS Tour is written for Vue 3. There are no plans to support Vue 2.x
:::

|         Prop         |   Type    |                             Default                             | Required | Description                                                                 |
|:--------------------:|:---------:|:---------------------------------------------------------------:|:--------:|-----------------------------------------------------------------------------|
|        `name`        | `String`  |                            `default`                            | `false`  | The name used for this tour.                                                |
|       `steps`        |  `Array`  |                           `undefined`                           |  `true`  | An array of steps to be used in the tour.                                   |
|     `autoStart`      | `Boolean` |                             `false`                             | `false`  | If `true`, the tour will start automatically when the component is mounted. |
|     `startDelay`     | `Number`  |                               `0`                               | `false`  | If set, the tour will start after x miliseconds.                            |
|     `highlight`      | `Boolean` |                             `false`                             | `false`  | If `true`, the target will get highlighted.                                 |
|    `buttonLabels`    | `Object`  | `{ next: "Next", prev: "Back", finish: "Finish", skip: "Skip"}` | `false`  | The labels used for the buttons.                                            |
| `saveToLocalStorage` | `String`  |                              `end`                              | `false`  | The save mode used for this tour.<br><br>`end` `step` `custom`              |
|      `backdrop`      | `Boolean` |                             `false`                             | `false`  | Show backdrop if tour is active.                                            |

## Example

Using this approach, the tour will start after 1 second, and the target will get highlighted.

```vue{4}
<template>
  <div>
    ...
    <VTour :steps="steps" startDelay='1000' autoStart highlight/>
  </div>
</template>

<script setup>
const steps = [...];
</script>
```
<br>
<br>

![Highlight example gif](https://raw.githubusercontent.com/GlobalHive/vuejs-tour/master/highlight.gif)
