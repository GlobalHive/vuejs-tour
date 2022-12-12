# Styling

::: warning
VueJS Tour is written for Vue 3 composition api. There are no plans to support Vue 2.x
:::

## SASS/SCSS

VueJS Tour uses `scss` for styling. You can override the default styles by using the following variables.
    
```scss:no-line-numbers
@import "@globalhive/vuejs-tour/src/style/style.scss";
```

| Variable                               | Default                         |
|----------------------------------------|---------------------------------|
| `$vjt__tooltip_color`                  | #fff                            |
| `$vjt__tooltip_z_index`                | 9999                            |
| `$vjt__tooltip_font_size`              | 13px                            |
| `$vjt__tooltip_arrow_size`             | 8px                             |
| `$vjt__tooltip_background`             | #333                            |
| `$vjt__tooltip_border_radius`          | 4px                             |
| `$vjt__tooltip_max_width`              | 300px                           |
| `$vjt__highlight_offset`               | 4px                             |
| `$vjt__highlight_color`                | #0EA5E9FF                       |
| `$vjt__highlight_outline_radius`       | 4px                             |
| `$vjt__highlight_outline`              | 1px solid $vjt__highlight_color |
| `$vjt__action_button_color`            | #fff                            |
| `$vjt__action_button_font_size`        | 13px                            |
| `$vjt__action_button_color_hover`      | #fff                            |
| `$vjt__action_button_padding`          | 4px 16px                        |
| `$vjt__action_button_border_radius`    | 4px                             |
| `$vjt__action_button_background_hover` | #000                            |
| `$vjt__action_button_border`           | 1px solid #fff                  |
| `$vjt__action_button_background`       | transparent                     |

::: tip
Override the variables before importing the scss file.<br>
<u>Don't import the css file if you are using scss.</u>
:::

## CSS

You can also override the default styles by using the following classes.


| Class Name                                               | Description              |
|----------------------------------------------------------|--------------------------|
| `#vjt-tooltip`                                           | Step container           |
| `#vjt-tooltip[data-popper-placement^=top] #vjt-arrow`    | Step arrow on top        |
| `#vjt-tooltip[data-popper-placement^=bottom] #vjt-arrow` | Step arrow on bottom     |
| `#vjt-tooltip[data-popper-placement^=left] #vjt-arrow`   | Step arrow at left side  |
| `#vjt-tooltip[data-popper-placement^=right] #vjt-arrow`  | Step arrow at right side |
| `#vjt-arrow`                                             | Step arrow               |
| `#vjt-arrow:before`                                      | Step arrow :before       |
| `.vjt-highlight`                                         | Highlight style          |
| `.vjt-actions`                                           | Actions container        |
| `.vjt-actions button`                                    | Action buttons           |
| `.vjt-actions button:hover`                              | Action buttons :hover    |


## Theme

Or create your own theme and import it instead of the default theme.

```scss
$vjt__tooltip_color: #fff;
$vjt__tooltip_z_index: 9999;
$vjt__tooltip_font_size: 13px;
$vjt__tooltip_arrow_size: 8px;
$vjt__tooltip_background: #333;
$vjt__tooltip_border_radius: 4px;
$vjt__tooltip_max_width: 300px;

$vjt__highlight_offset: 4px !default;
$vjt__highlight_color: #0EA5E9FF !default;
$vjt__highlight_outline_radius: 4px !default;
$vjt__highlight_outline: 1px solid $vjt__highlight_color !default;

$vjt__action_button_color: #fff;
$vjt__action_button_font_size: 13px;
$vjt__action_button_color_hover: #fff;
$vjt__action_button_padding: 4px 16px;
$vjt__action_button_border_radius: 4px;
$vjt__action_button_background_hover: #000;
$vjt__action_button_border: 1px solid #fff;
$vjt__action_button_background: transparent;

[data-hidden] {
  display: none;
}

#vjt-tooltip {
  background-color: $vjt__tooltip_background;
  color: $vjt__tooltip_color;
  padding: 0.5rem;
  border-radius: $vjt__tooltip_border_radius;
  font-size: $vjt__tooltip_font_size;
  z-index: $vjt__tooltip_z_index;
  max-width: $vjt__tooltip_max_width;
}

#vjt-tooltip[data-popper-placement^='top'] {
  #vjt-arrow {
    bottom: -$vjt__tooltip_arrow_size/2;
  }
}

#vjt-tooltip[data-popper-placement^='bottom'] {
  #vjt-arrow {
    top: -$vjt__tooltip_arrow_size/2;
  }
}

#vjt-tooltip[data-popper-placement^='left'] {
  #vjt-arrow {
    right: -$vjt__tooltip_arrow_size/2;
  }
}

#vjt-tooltip[data-popper-placement^='right'] {
  #vjt-arrow {
    left: -$vjt__tooltip_arrow_size/2;
  }
}

#vjt-arrow {
  width: $vjt__tooltip_arrow_size;
  height: $vjt__tooltip_arrow_size;
  position: absolute;
  z-index: -1;

  &::before {
    content: "";
    width: $vjt__tooltip_arrow_size;
    height: $vjt__tooltip_arrow_size;
    background-color: $vjt__tooltip_background;
    transform: rotate(45deg);
    position: absolute;
  }
}

.vjt-highlight {
  outline: $vjt__highlight_outline;
  outline-offset: $vjt__highlight_offset;
  border-radius: $vjt__highlight_outline_radius;
}

.vjt-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.5rem;

  button {
    width: 100%;
    padding: 0.25rem 1rem;
    border: $vjt__action_button_border;
    border-radius: $vjt__action_button_border_radius;
    background-color: $vjt__action_button_background;
    color: $vjt__action_button_color;
    font-size: $vjt__action_button_font_size;
    font-weight: 500;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: $vjt__action_button_background_hover;
      color: $vjt__action_button_color_hover;
    }
  }
}
```
::: tip
You can create your own theme in sass, scss or css.<br>
As long as the classes are the same.
:::
