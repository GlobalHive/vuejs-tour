# Props

::: warning
VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x
:::

|     Prop     |   Type    |   Default   | Required | Description                                                                 |
|:------------:|:---------:|:-----------:|:--------:|-----------------------------------------------------------------------------|
|   `steps`    |  `Array`  | `undefined` |  `true`  | An array of steps to be used in the tour.                                   |
| `autoStart`  | `Boolean` |   `false`   | `false`  | If `true`, the tour will start automatically when the component is mounted. |
| `startDelay` | `Number`  |     `0`     | `false`  | If set, the tour will start after x miliseconds.                            |
| `highlight`  | `Boolean` |   `false`   | `false`  | If `true`, the target will get highlighted.                                 |

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

```js
console.log('TODO: Add highlight example image here')
```
![Placeholder for the highlight example. Source: codemyui.com](https://codemyui.com/wp-content/uploads/2017/11/Strike-Off-ToDo-List-Animation.gif "TODO Gif")
