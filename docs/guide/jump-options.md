# Jump Options

VueJS Tour now supports customizable scroll animation options via the [jump.js](https://github.com/callmecavs/jump.js) library.

## Available Options

```typescript
interface JumpOptions {
  /** Duration of scroll animation in milliseconds (default: 500) */
  duration?: number;

  /** Vertical offset in pixels from target element (default: -100) */
  offset?: number;

  /** Callback function to execute after scroll completes */
  callback?: () => void;

  /**
   * Easing function name (default: 'easeInOutQuad')
   * Valid values: 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic',
   * 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart',
   * 'easeInQuint', 'easeOutQuint', 'easeInOutQuint'
   */
  easing?: string;

  /** Whether to focus the element for accessibility (default: false) */
  a11y?: boolean;
}
```

## Global Configuration

Set default jump options for all steps in the tour:

```vue
<template>
  <VTour
    :steps="steps"
    :jump-options="{
      duration: 1000,
      offset: -50,
      easing: 'easeInOutQuad',
      a11y: true,
    }"
  />
</template>
```

## Per-Step Configuration

Override global options for specific steps:

```typescript
const steps = [
  {
    target: '#step1',
    content: 'This step uses global jump options',
  },
  {
    target: '#step2',
    content: 'This step uses custom scroll options',
    jumpOptions: {
      duration: 300, // Faster scroll
      offset: -200, // More space at top
      easing: 'easeInCubic', // Different easing
    },
  },
];
```

## Disabling Scroll

You can disable scrolling globally or per-step using the existing `noScroll` prop:

```vue
<!-- Disable scrolling for entire tour -->
<VTour :steps="steps" :no-scroll="true" />
```

```typescript
// Disable scrolling for specific step
const steps = [
  {
    target: '#step1',
    content: 'This step will not scroll',
    noScroll: true,
  },
];
```

## Priority

When multiple jump option sources are provided, they are merged with the following priority:

1. **Step-specific options** (highest priority)
2. **Global prop options**
3. **Default values** (lowest priority)

Example:

```typescript
// Global defaults
const globalJumpOptions = {
  duration: 1000,
  offset: -100,
  a11y: true,
};

// Step overrides
const steps = [
  {
    target: '#step1',
    content: 'Step 1',
    jumpOptions: {
      duration: 300, // Only override duration
      // offset: still -100 from global
      // a11y: still true from global
    },
  },
];
```

## Available Easing Functions

VueJS Tour supports the following built-in easing function names:

- `'easeInQuad'` - Quadratic acceleration
- `'easeOutQuad'` - Quadratic deceleration
- `'easeInOutQuad'` - Quadratic acceleration and deceleration (default)
- `'easeInCubic'` - Cubic acceleration
- `'easeOutCubic'` - Cubic deceleration
- `'easeInOutCubic'` - Cubic acceleration and deceleration
- `'easeInQuart'` - Quartic acceleration
- `'easeOutQuart'` - Quartic deceleration
- `'easeInOutQuart'` - Quartic acceleration and deceleration
- `'easeInQuint'` - Quintic acceleration
- `'easeOutQuint'` - Quintic deceleration
- `'easeInOutQuint'` - Quintic acceleration and deceleration

Example usage:

```vue
<template>
  <VTour
    :steps="steps"
    :jump-options="{
      duration: 800,
      easing: 'easeInOutCubic', // Smoother animation
    }"
  />
</template>
```

### Understanding Easing Types

- **In** (e.g., `easeInQuad`) - Starts slow, ends fast (acceleration)
- **Out** (e.g., `easeOutQuad`) - Starts fast, ends slow (deceleration)
- **InOut** (e.g., `easeInOutQuad`) - Starts slow, speeds up, then slows down (smooth)
- **Quad/Cubic/Quart/Quint** - The strength of the curve (higher = more dramatic)
