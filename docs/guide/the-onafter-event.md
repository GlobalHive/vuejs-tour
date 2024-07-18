# The onAfter Event

The `onAfter` event is triggered after the step is shown. This event is useful when you want to do something after the step is shown. 

::: info
This feature will be available in version [`2.2.0`](./roadmap#_2-2-0-2024-08-13-🚧).
:::

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    onAfter: () => { // [!code ++:3]
      // Do something after the step is shown
    }
  }];
</script>
```

::: info
The `onAfter` event is using await, so you can use a promise to delay the step.
:::

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    onAfter: new Promise((resolve) => { // [!code ++:6]
      setTimeout(() => {
        // Do something after the step is shown
        resolve();
      }, 1000);
    })
  }];
</script>
```