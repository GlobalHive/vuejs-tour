# Define the Content
The `content` property is a string that represents the content of the step. The content can be any HTML content.

::: code-group
```vue [Text as Content]
<script setup>
  const steps = [{
    target: '[data-step=0]',
    content: 'Text Content'
  }];
</script>
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