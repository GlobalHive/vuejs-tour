# The onBefore Event

The `onBefore` event is triggered before the step is shown. This event is useful when you want to do something before the step is shown. For example, you can use this event to check if the user is allowed to see the step.

::: info
This feature will be available in version [`2.2.0`](./roadmap#_2-2-0-2024-08-13-🚧).
:::

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    onBefore: () => { // [!code ++:3]
      // Do something before the step is shown
    }
  }];
</script>
```

::: info
The `onBefore` event is using await, so you can use a promise to delay the step.
:::

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    onBefore: new Promise((resolve) => { // [!code ++:6]
      setTimeout(() => {
        // Do something before the step is shown
        resolve();
      }, 1000);
    })
  }];
</script>
```