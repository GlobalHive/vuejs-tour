# Multiple Tours

To create multiple tours, use the `steps` and `name` props to switch between different tours.

### Defining the tours

First define the steps for each tour.

Option 1 — recommended when the component has the “prop‑change watcher” enabled (auto‑restart on `name`/`steps` change). No manual start needed except the initial start.

```vue{3-8,12}
<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const tourSteps1 = [...];
  const tourSteps2 = [...];
  const tourSteps = ref(tourSteps1);
  const tourName = ref('tour1');

  // Start the first tour once mounted (or use autoStart on the component)
  const vTour = ref();
  onMounted(() => vTour.value?.startTour());
</script>

<template>
  <VTour :steps="tourSteps" :name="tourName" ref="vTour" />
  ...
</template>
```

In this case we’re creating two tours, `tour1` and `tour2`, each with their corresponding steps `tourSteps1` and `tourSteps2`. The `tourSteps` and `tourName` refs are reactive and can be changed at runtime.

### Switching between tours

If the watcher is enabled, simply switch the reactive values; the tour will auto‑restart.

```vue{14-22}
<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  const tourSteps1 = [...];
  const tourSteps2 = [...];
  const tourSteps = ref(tourSteps1);
  const tourName = ref('tour1');
  const vTour = ref();
  onMounted(() => vTour.value?.startTour());

  function switchTour() {
    if (tourName.value === 'tour1') {
      tourSteps.value = tourSteps2;
      tourName.value = 'tour2';
    } else {
      tourSteps.value = tourSteps1;
      tourName.value = 'tour1';
    }
    // No need to call startTour() here when the watcher is enabled.
  }
</script>

<template>
  <VTour :steps="tourSteps" :name="tourName" ref="vTour" />
  ...
</template>
```

If you do NOT use the watcher, you can still support hot‑switching by calling `startTour()` after changing props:

```vue{16}
function switchTour() {
  if (tourName.value === 'tour1') {
    tourSteps.value = tourSteps2;
    tourName.value = 'tour2';
  } else {
    tourSteps.value = tourSteps1;
    tourName.value = 'tour1';
  }
  vTour.value?.startTour(); // manual restart when watcher is disabled
}
```

Notes

- Prefer replacing the steps array (immutable update) over mutating it in place so the change is detected reliably.
- For multiple, fully independent tours on the same page, give each `VTour` a unique `name`. IDs, highlight classes, and localStorage keys are scoped by `name`, so tours won’t collide.

# Saving Progress

You can save a user’s progress in the browser’s localStorage so they can resume later.

## Using the `saveToLocalStorage` prop

Set the `saveToLocalStorage` prop on `VTour` to control if/when progress is saved. Accepted values: `never`, `step`, `end`. The default is `never`.

```vue
<script setup lang="ts">
// ...
const steps = [...];
</script>

<template>
  <!-- No persistence (default) -->
  <VTour :steps="steps" autoStart />

  <!-- Save current step index after each step -->
  <VTour :steps="steps" name="onboarding" autoStart saveToLocalStorage="step" />

  <!-- Mark tour as completed only at the end -->
  <VTour :steps="steps" name="tips" autoStart saveToLocalStorage="end" />
</template>
```

Notes

- Keys are scoped by the tour’s `name`. The storage key is `vjt-${name}`. If `name` is empty, the key is `vjt-tour`.
- With multiple tours, give each tour a unique `name` so their progress is isolated.

### `never`

No progress is saved. Each start begins from the first step (unless you manually control steps).

### `step`

Saves the current step index after each step. If the user leaves mid‑tour, the next start resumes at the saved step for that tour’s `name`.

- Key format: `localStorage.setItem('vjt-<name>', '<stepIndex>')`
- Works per tour. Switching `name` switches the storage key, so tours don’t affect each other.

### `end`

Saves only when the tour completes. If the user exits before completion, the next start begins at the first step.

- Completion flag: `localStorage.setItem('vjt-<name>', 'true')`
- When this flag is present, subsequent `startTour()` calls will no‑op unless you reset.

### Resetting or clearing progress

- Programmatic reset (recommended): call `resetTour()` to clear state and, if desired, restart.
- Manual clear: `localStorage.removeItem('vjt-<name>')`

### Multiple tours and hot‑switching

- Multiple independent tours: Use distinct `name` values to keep DOM ids, highlight classes, and storage keys separate.
- Swapping tours at runtime (changing `name` and/or `steps`):
  - Each tour resumes from its own saved state (for `step`) or completion flag (for `end`), based on the new `name`.
  - If you keep the watcher that restarts on prop changes, switching `name`/`steps` will auto‑restart the visible tour using the correct per‑name key.

Small copy edit: “everytime” → “every time”.
