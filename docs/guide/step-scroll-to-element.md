# Scroll to Element

To disable scrolling <u>per step</u>, you can use the `noScroll` option in the `Step`.

::: info
This feature will be available in version [`2.2.0`](./roadmap#_2-2-0-2024-08-13-🚧).
:::

```vue
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content',
    noScroll: true // [!code ++]
  }];
</script>
```

::: info
You can enable the highlight effect globally by setting the `noScroll` prop in the `VTour` component.

[See Documentation](./scroll-to-element.md)
:::