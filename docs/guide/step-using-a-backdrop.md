# Using a Backdrop
The `backdrop` option is a boolean that represents whether the backdrop should be displayed or not <u>per step</u>. The backdrop is a semi-transparent overlay that covers the entire screen, except for the highlighted element.

::: info
This feature will be available in version [`2.2.0`](./roadmap#_2-2-0-2024-08-13-🚧).
:::

## Using the `backdrop` option
To enable the backdrop, you can use the `backdrop` option in the `Step`.

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    backdrop: true // [!code ++]
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
import { ref } from 'vue';
import VTour from '../../src/components/VTour.vue';
import "../../src/style/style.scss";

const vTourComponent = ref();
const steps = [{ target: '[data-step="0"]', content: 'Click "Done" to close the Tooltip', backdrop: true }];

function clickToStart() {
    vTourComponent.value.startTour();
}
</script>

<VTour ref="vTourComponent" :steps="steps" saveToLocalStorage='never' noScroll/>

<div class="custom-block example">
    <button data-step="0" @click="clickToStart">Click To Start<br>With Backdrop Enabled</button>
</div>

::: info
You can enable the highlight effect globally by setting the `backdrop` prop in the `VTour` component.

[See Documentation](./using-a-backdrop.md)
:::