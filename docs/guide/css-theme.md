# CSS Theme
To customize the look and feel of the tour, you can create your own styles and replace the default theme.

## Default Theme

The default theme is defined in the `'@globalhive/vuejs-tour/dist/style.css'` file.

```css
[data-hidden] {
  display: none;
}

#vjt-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

#vjt-tooltip {
  background-color: #333;
  color: #fff;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 13px;
  z-index: 9999;
  max-width: 300px;
  position: absolute;
}

#vjt-tooltip[data-arrow^=t] #vjt-arrow {
  bottom: -4px;
  right: 50%;
}

#vjt-tooltip[data-arrow^=b] #vjt-arrow {
  top: -4px;
  right: 50%;
}

#vjt-tooltip[data-arrow^=l] #vjt-arrow {
  right: -4px;
  top: 50%;
}

#vjt-tooltip[data-arrow^=r] #vjt-arrow {
  left: -4px;
  top: 50%;
}

#vjt-arrow {
  width: 8px;
  height: 8px;
  position: absolute;
  z-index: -1;
}
#vjt-arrow::before {
  content: "";
  width: 8px;
  height: 8px;
  background-color: #333;
  transform: rotate(45deg);
  position: absolute;
}

.vjt-highlight {
  outline: 2px solid #0ea5e9;
  outline-offset: 4px;
  border-radius: 1px;
  position: relative;
  z-index: 9999;
}

.vjt-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.5rem;
}
.vjt-actions button {
  width: 100%;
  padding: 0.25rem 1rem;
  border: 1px solid #fff;
  border-radius: 4px;
  background-color: transparent;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.vjt-actions button:hover {
  background-color: #000;
  color: #fff;
}
```

## Light Theme

Here is an example of a light theme for the [New CSS File](#new-css-file) approach:

```css
[data-hidden] {
    display: none;
}

#vjt-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* [!code ++] */
    z-index: 9998;
}

#vjt-tooltip {
    background-color: rgb(241 245 249); /* [!code ++:2] */
    color: rgb(15 23 42);
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 13px;
    z-index: 9999;
    max-width: 300px;
    position: absolute;
}

#vjt-tooltip[data-arrow^=t] #vjt-arrow {
    bottom: -4px;
    right: 50%;
}

#vjt-tooltip[data-arrow^=b] #vjt-arrow {
    top: -4px;
    right: 50%;
}

#vjt-tooltip[data-arrow^=l] #vjt-arrow {
    right: -4px;
    top: 50%;
}

#vjt-tooltip[data-arrow^=r] #vjt-arrow {
    left: -4px;
    top: 50%;
}

#vjt-arrow {
    width: 8px;
    height: 8px;
    position: absolute;
    z-index: -1;
}
#vjt-arrow::before {
    content: "";
    width: 8px;
    height: 8px;
    background-color: rgb(241 245 249); /* [!code ++] */
    transform: rotate(45deg);
    position: absolute;
}

.vjt-highlight {
    outline: 2px solid #0ea5e9;
    outline-offset: 4px;
    border-radius: 1px;
    position: relative;
    z-index: 9999;
}

.vjt-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
    gap: 0.5rem;
}
.vjt-actions button {
    width: 100%;
    padding: 0.25rem 1rem;
    border: 1px solid rgb(15 23 42); /* [!code ++] */
    border-radius: 4px;
    background-color: transparent;
    color: rgb(15 23 42); /* [!code ++] */
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}
.vjt-actions button:hover {
    background-color: rgb(15 23 42); /* [!code ++:2] */
    color: rgb(241 245 249);
}
```

## Style Block

Change the theme by adding a style block to your component.

```vue
<script setup lang='ts'>
  //...
  import '@globalhive/vuejs-tour/dist/style.css';
</script>

<template>
  <VTour .../>
</template>

<style> /* Light Theme */
  #vjt-tooltip { /* [!code ++:15] */
    background-color: rgb(241 245 249);
    color: rgb(15 23 42);
  }
  #vjt-arrow::before {
    background-color: rgb(241 245 249);
  }
  .vjt-actions button {
    border: 1px solid rgb(15 23 42);
    color: rgb(15 23 42);
  }
  .vjt-actions button:hover {
    background-color: rgb(15 23 42);
    color: rgb(241 245 249);
  }
</style>
```

::: warning
If using the style block, make sure to not use the `scoped` attribute.
:::

## New CSS File

Second option is to create a new CSS file and import it in your component.

```vue
<script setup lang='ts'>
    //...
    import '@globalhive/vuejs-tour/dist/style.css'; // [!code --]
    import './custom-theme.css'; // [!code ++]
</script>
```

::: warning
If using the new CSS file approach, you have to include all the default styles in your custom theme.    
It's recommended to copy the default theme and modify it as needed.
:::

## Overriding Variables

To override the default theme, you can simply override the SCSS variables in your component.

* Create a new SCSS file `white.scss`.
* Override the variables.
* Import default theme.
* Import your file in the component.

::: code-group

```scss [white.scss]
$vjt__tooltip_color: rgb(15 23 42);
$vjt__tooltip_background: rgb(241 245 249);
$vjt__action_button_color: rgb(15 23 42);
$vjt__action_button_color_hover: rgb(241 245 249);
$vjt__action_button_background_hover: rgb(15 23 42);
$vjt__action_button_border: 1px solid rgb(15 23 42);

@import '@globalhive/vuejs-tour/src/style.scss';
```

```vue [Component]
<script setup lang='ts'>
  //...
  import '../white.scss';
</script>

<template>
  <VTour .../>
</template>
```

:::