# Using Placement
The `placement` property is a type of `NanoPopPosition` which is a string that represents the placement of the step.

```typescript
type Direction = 'top' | 'left' | 'bottom' | 'right';
type Alignment = 'start' | 'middle' | 'end';
export type NanoPopPosition = `${Direction}-${Alignment}` | Direction;
```
The value of the `placement` property is a string that can be one of the following:

`top`, `top-start`, `top-middle`, `top-end`, `left`, `left-start`, `left-middle`, `left-end`, `bottom`, `bottom-start`, `bottom-middle`, `bottom-end`, `right`, `right-start`, `right-middle`, `right-end`.

If not provided, the `placement` property will default to `right-middle`.

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Top Placement',
    placement: 'top' // Placed at top-middle if enough space // [!code ++]
  }];
</script>
```

<style>
    .custom-block.example {
        display: flex;
        justify-content: center;
        align-items: center;

        padding: 1rem;
        height: 16rem;
        background-color: var(--vp-c-bg-alt);
        text-align: center;
    }
</style>

<script setup>
import VTour from '../../src/components/VTour.vue';
import "../../src/style/style.scss";

const steps = [{ target: '[data-step="0"]', content: 'Placement: top', placement: 'top' }
,{ target: '[data-step="0"]', content: 'Placement: right (default)'}
,{ target: '[data-step="0"]', content: 'Placement: bottom', placement: 'bottom' }
,{ target: '[data-step="0"]', content: 'Placement: left', placement: 'left' }];
</script>

<VTour :steps="steps" autoStart saveToLocalStorage='never' noScroll />

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

::: info
`vuejs-tour` will automatically adjust the placement of the step if there is not enough space.
:::