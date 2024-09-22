# Highlight Target Option
The `highlight` option is used to highlight the target element <u>per step</u>. This option is useful when you want to emphasize the target element.

## Using the `highlight` option
To enable the highlight effect, you can set the `highlight` option in the `Step`.

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    highlight: true // [!code ++]
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

const steps = [{ target: '[data-step="0"]', content: 'Target highlighted', highlight: true }];

</script>
<VTour :steps="steps" autoStart saveToLocalStorage='never' noScroll/>

<div class="custom-block example">
    <p data-step="0">Target</p>
</div>

::: info
You can enable the highlight effect globally by setting the `highlight` prop in the `VTour` component.

[See Documentation](./highlight-target.md)
:::