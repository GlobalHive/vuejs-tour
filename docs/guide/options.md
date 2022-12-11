# Options

::: warning
VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x
:::

## Step Properties

### `target`

The `target` property can be any valid [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors).

- Type: `string`
- Default: `undefined`
- Required: `true`

```vue{4}
<script setup>
const steps = [
  {
    target: '#target',
  }
];
</script>
```

### `content`

The `content` property can be a string or any valid [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML).

- Type: `string` | `Html`
- Default: `undefined`
- Required: `true`

<CodeGroup>
  <CodeGroupItem title="string">

```vue{5}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the content of the step',
  }
];
</script>
```

  </CodeGroupItem>

  <CodeGroupItem title="Html">

```vue{5-6}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the <b>content</b> of the step\n' +
            'Using HTML is also <span class="underline font-medium">possible</span>',
  }
];
</script>
```

  </CodeGroupItem>
</CodeGroup>

### `placement`

The `placement` property is used to position the step relative to the target element.

- Type: `string`
- Default: `top`
- Required: `false`

```vue{6}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the content of the step',
    placement: 'top',
  }
];
</script>
```

Any of the following values can be used:

`auto`,
`auto-start`,
`auto-end`,
`top`,
`top-start`,
`top-end`,
`bottom`,
`bottom-start`,
`bottom-end`,
`right`,
`right-start`,
`right-end`,
`left`,
`left-start`,
`left-end`

::: tip
Insufficient space may change the placement of the step to make it fit better.
:::

### `onNext`

The `onNext` property is used to execute a function when the next button is clicked.<br>
The function has to be a `Promise`. The step will not advance until the `Promise` is resolved.

```vue{7-11}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the content of the step',
    placement: 'top',
    onNext: () => {
      return new Promise(async (resolve) => {
          await longRunningFunction();
          resolve();
      });
    },
  }
];
</script>
```
::: tip
The new step placement will be calculated after the `Promise` is resolved.
:::

### `onPrev`

The `onPrev` property is used to execute a function when the back button is clicked.<br>
The function has to be a `Promise`. The step will not advance until the `Promise` is resolved.

```vue{8-12}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the content of the step',
    placement: 'top',
    onNext: () => {...},
    onPrev: () => {
      return new Promise(async (resolve) => {
          await longRunningFunction();
          resolve();
      });
    },
  }
];
</script>
```
::: tip
The new step placement will be calculated after the `Promise` is resolved.
:::

### `onShow`

The `onShow` property is used to execute a function after the step is shown.<br>

```vue{9-11}
<script setup>
const steps = [
  {
    target: '#target',
    content: 'This is the content of the step',
    placement: 'top',
    onNext: () => {...},
    onPrev: () => {...},
    onShow: () => {
      console.log('Step is shown');
    },
  }
];
</script>
```
