<script setup lang="ts">
import { createPopper, type NanoPop } from 'nanopop';
import { computed, nextTick, onMounted, onUnmounted, reactive, ref } from 'vue';
import jump from 'jump.js';
import type {
  VTourProps,
  VTourEmits,
  VTourData,
  VTourExposedMethods,
} from '../Types';

// Props with defaults
const props = withDefaults(defineProps<VTourProps>(), {
  name: '',
  backdrop: false,
  autoStart: false,
  startDelay: 0,
  highlight: false,
  margin: 8,
  defaultPlacement: 'right',
  saveToLocalStorage: 'never',
  hideSkip: false,
  hideArrow: false,
  noScroll: false,
  resizeTimeout: 250,
});

// Emit definitions using standardized VTourEmits type
const emit = defineEmits<VTourEmits>();

// Reactive state with cleaner naming
const saveKey = computed(() => (props.name ? `vjt-${props.name}` : 'vjt-tour'));
const vTour = ref<NanoPop>();

const currentStepIndex = ref(0);
const lastStepIndex = ref(0);
const nextStepIndex = ref(1);

const getCurrentStep = computed(() => props.steps[currentStepIndex.value]);
const getLastStep = computed(() => props.steps[lastStepIndex.value]);
const getNextStep = computed(() => props.steps[nextStepIndex.value]);

// Reactive data structure for compatibility
const _CurrentStep: VTourData = reactive({
  currentStep: currentStepIndex,
  lastStep: lastStepIndex,
  nextStep: nextStepIndex,
  getCurrentStep,
  getLastStep,
  getNextStep,
});

const getNextLabel = computed(() => {
  const isLastStep = currentStepIndex.value === props.steps.length - 1;
  return isLastStep
    ? (props.buttonLabels?.done ?? 'Done')
    : (props.buttonLabels?.next ?? 'Next');
});

const getClipPath = ref('');

// Reactive visibility controls for modal behavior
const tourVisible = ref(false);
const backdropVisible = ref(false);
const currentPlacement = ref('right');
const isTransitioning = ref(false); // Hide tooltip during step transitions

// Unique IDs and classes for this tour instance (based on name prop)
// Empty name = backward compatible IDs (vjt-tooltip, vjt-backdrop)
// Non-empty name = scoped IDs (vjt-myname-tooltip, vjt-myname-backdrop)
const tourId = computed(() => (props.name ? `vjt-${props.name}` : 'vjt'));
const tooltipId = computed(() => `${tourId.value}-tooltip`);
const backdropId = computed(() => `${tourId.value}-backdrop`);
const arrowId = computed(() => `${tourId.value}-arrow`);
const highlightClass = computed(() =>
  props.name ? `vjt-highlight-${props.name}` : 'vjt-highlight'
);

// Cache DOM element references (populated after Teleport renders)
const _Tooltip = ref<HTMLElement>();
const _Backdrop = ref<HTMLElement>();

// Constants for timing and positioning
const TELEPORT_RENDER_DELAY = 100; // ms to wait for Vue Teleport to render DOM elements

// Default jump.js scroll options (can be overridden via props)
const DEFAULT_JUMP_OPTIONS = {
  duration: 500,
  offset: -100,
  easing: 'easeInOutQuad' as const,
  a11y: false,
};

// Helper to check if tour was completed and saved to localStorage
const isTourCompleted = (): boolean => {
  return localStorage.getItem(saveKey.value) === 'true';
};

const startTour = async (): Promise<void> => {
  if (isTourCompleted()) return;

  if (props.saveToLocalStorage === 'step') {
    const savedStep = localStorage.getItem(saveKey.value);
    currentStepIndex.value = parseInt(savedStep || '0', 10);

    if (currentStepIndex.value > 0) {
      lastStepIndex.value = Math.max(currentStepIndex.value - 1, 0);
      nextStepIndex.value = currentStepIndex.value + 1;
    }
  } else {
    currentStepIndex.value = 0;
  }

  startDelayTimer = setTimeout(async () => {
    await beforeStep(currentStepIndex.value);

    const currentStepData = getCurrentStep.value;

    if (!currentStepData) {
      console.warn('No step data available');
      return;
    }

    const targetElement = document.querySelector(
      currentStepData.target
    ) as HTMLElement;

    if (!targetElement) {
      console.warn(`Tour target element not found: ${currentStepData.target}`);
      return;
    }

    // Wait for Teleport to render DOM elements, then cache references
    await new Promise((resolve) => {
      teleportDelayTimer = setTimeout(resolve, TELEPORT_RENDER_DELAY);
    });

    if (!_Tooltip.value) {
      _Tooltip.value = document.querySelector(
        `#${tooltipId.value}`
      ) as HTMLElement;
    }

    if (!_Backdrop.value) {
      _Backdrop.value = document.querySelector(
        `#${backdropId.value}`
      ) as HTMLElement;
    }

    if (!_Tooltip.value) {
      console.warn('Tooltip element not found in DOM');
      return;
    }

    // Show tour content (but keep hidden via isTransitioning) so nanopop can calculate dimensions
    tourVisible.value = true;
    isTransitioning.value = true;

    // Wait for Vue to render the content in the DOM with proper dimensions
    await nextTick();

    if (!vTour.value) {
      // Calculate margin: use prop margin, or increase to 14px if highlighting is enabled
      const shouldHighlight = props.highlight || currentStepData.highlight;
      const calculatedMargin = props.margin || (shouldHighlight ? 14 : 8);

      vTour.value = createPopper(targetElement, _Tooltip.value, {
        position: currentStepData.placement || props.defaultPlacement,
        margin: calculatedMargin,
      });
    }

    await updatePosition();

    // Show tooltip after positioning is complete
    isTransitioning.value = false;

    emit('onTourStart');
  }, props.startDelay);
};

const stopTour = (): void => {
  // Clear any pending timeouts
  clearTimeout(startDelayTimer);
  clearTimeout(teleportDelayTimer);

  // Hide tour and backdrop immediately
  // Both must be set to prevent CSS visibility conflicts with fixed-position elements
  tourVisible.value = false;
  backdropVisible.value = false;
  isTransitioning.value = false;

  // Remove highlights for this tour instance only
  document
    .querySelectorAll(`.${highlightClass.value}`)
    .forEach((element) => element.classList.remove(highlightClass.value));

  // Destroy nanopop instance so it can be recreated on next tour start
  if (vTour.value) {
    vTour.value = undefined;
  }
};
const resetTour = (shouldRestart = false): void => {
  stopTour();
  currentStepIndex.value = 0;
  lastStepIndex.value = 0;
  nextStepIndex.value = 1;
  localStorage.removeItem(saveKey.value);
  if (shouldRestart) startTour();
};

const nextStep = async (): Promise<void> => {
  await beforeStep(nextStepIndex.value);

  // Hide tooltip during transition to prevent content flash
  isTransitioning.value = true;

  lastStepIndex.value = currentStepIndex.value;
  currentStepIndex.value++;

  if (currentStepIndex.value > props.steps.length - 1) {
    endTour();
    return;
  }

  nextStepIndex.value = currentStepIndex.value + 1;
  await updatePosition();

  // Show tooltip after positioning is complete
  isTransitioning.value = false;
};

const lastStep = async (): Promise<void> => {
  await beforeStep(lastStepIndex.value);

  // Hide tooltip during transition to prevent content flash
  isTransitioning.value = true;

  currentStepIndex.value = lastStepIndex.value;
  lastStepIndex.value = Math.max(lastStepIndex.value - 1, 0);

  if (currentStepIndex.value < 0) {
    endTour();
    return;
  }

  nextStepIndex.value = currentStepIndex.value + 1;
  await updatePosition();

  // Show tooltip after positioning is complete
  isTransitioning.value = false;
};

const endTour = (): void => {
  stopTour();
  if (props.saveToLocalStorage !== 'never') {
    localStorage.setItem(saveKey.value, 'true');
  }
  emit('onTourEnd');
};

const goToStep = async (stepIndex: number): Promise<void> => {
  if (stepIndex < 0 || stepIndex >= props.steps.length) {
    console.warn(`Invalid step index: ${stepIndex}`);
    return;
  }

  await beforeStep(stepIndex);

  // Hide tooltip during transition to prevent content flash
  isTransitioning.value = true;

  currentStepIndex.value = stepIndex;
  lastStepIndex.value = Math.max(stepIndex - 1, 0);
  nextStepIndex.value = stepIndex + 1;
  await updatePosition();

  // Show tooltip after positioning is complete
  isTransitioning.value = false;
};
const beforeStep = async (step: number): Promise<void> => {
  const stepData = props.steps[step];
  if (stepData?.onBefore) {
    await stepData.onBefore();
  }
};

// Helper function to set the placement attribute for CSS styling
// Sets data-arrow attribute based on tooltip placement so CSS can style the arrow accordingly
const setPlacementAttribute = (placement: string | null | undefined): void => {
  if (!placement || !_Tooltip.value) return;

  _Tooltip.value.setAttribute('data-arrow', placement);
  currentPlacement.value = placement;
};

// Core positioning logic - updates tooltip, highlight, and backdrop without scrolling or events
const updateTooltipPosition = (): void => {
  const currentStepData = getCurrentStep.value;
  if (!currentStepData || !vTour.value) return;

  const targetElement = document.querySelector(
    currentStepData.target
  ) as HTMLElement;

  if (!targetElement) return;

  // Update highlight and backdrop for current position
  updateHighlight();
  updateBackdrop();

  // Update popper position and set placement attribute
  // Nanopop automatically handles viewport edge detection and will flip placement if needed
  // Nanopop v2.x returns the actual placement but doesn't automatically set the data-arrow attribute
  const actualPlacement = vTour.value.update({
    reference: targetElement,
    position: currentStepData.placement || props.defaultPlacement,
  });

  setPlacementAttribute(actualPlacement || props.defaultPlacement);
};

// Full position update with optional scrolling, callbacks, and events
const updatePosition = async (): Promise<void> => {
  const currentStepData = getCurrentStep.value;
  if (!currentStepData) return;

  const targetElement = document.querySelector(
    currentStepData.target
  ) as HTMLElement;

  if (!targetElement || !_Tooltip.value || !vTour.value) {
    return;
  }

  // Scroll to target first if needed
  if (!props.noScroll && !currentStepData.noScroll) {
    await new Promise<void>((resolve) => {
      // Merge default options with global and step-specific options
      // Priority: step options > global options > defaults
      const scrollOptions = {
        ...DEFAULT_JUMP_OPTIONS,
        ...props.jumpOptions,
        ...currentStepData.jumpOptions,
        callback: () => resolve(),
      } as any; // jump.js has incomplete type definitions

      jump(targetElement, scrollOptions);
    });
  }

  // Update tooltip position (includes highlight, backdrop, and nanopop positioning)
  updateTooltipPosition();

  if (props.saveToLocalStorage === 'step') {
    localStorage.setItem(saveKey.value, currentStepIndex.value.toString());
  }

  if (currentStepData.onAfter) {
    await currentStepData.onAfter();
  }

  emit('onTourStep', currentStepIndex.value);
};

const updateHighlight = (): void => {
  // Remove existing highlights for this tour instance only
  document
    .querySelectorAll(`.${highlightClass.value}`)
    .forEach((element) => element.classList.remove(highlightClass.value));

  const currentStepData = getCurrentStep.value;

  // Check if highlighting is disabled or no step data
  if (!currentStepData || (!props.highlight && !currentStepData.highlight)) {
    return;
  }

  const targetElement = document.querySelector(
    currentStepData.target
  ) as HTMLElement;

  if (!targetElement) {
    return;
  }

  targetElement.classList.add(highlightClass.value);
  getClipPath.value = getClipPathValues(`.${highlightClass.value}`);
};

const updateBackdrop = (): void => {
  const currentStepData = getCurrentStep.value;
  // Show backdrop if global backdrop is enabled OR step has backdrop
  const shouldShowBackdrop = props.backdrop || !!currentStepData?.backdrop;

  backdropVisible.value = shouldShowBackdrop;
};

// Redraw layers for resize/scroll events - updates position without scrolling or events
const redrawLayers = (): void => {
  if (isTourCompleted()) return;
  if (!tourVisible.value) return; // Only redraw if tour is active

  updateTooltipPosition();
};

// Resize handling with debounce
let resizeTimer: ReturnType<typeof setTimeout> | undefined;
let startDelayTimer: ReturnType<typeof setTimeout> | undefined;
let teleportDelayTimer: ReturnType<typeof setTimeout> | undefined;

const onResizeEnd = (): void => {
  if (isTourCompleted()) return;

  clearTimeout(resizeTimer);
  redrawLayers();

  resizeTimer = setTimeout(() => {
    redrawLayers();
  }, props.resizeTimeout);
};

// Utility functions
function getClipPathValues(targetSelector: string): string {
  // Guard against SSR environment where document is not available
  if (typeof document === 'undefined') return '';

  const targetElement = document.querySelector(targetSelector) as HTMLElement;
  if (!targetElement) return '';

  const rect = targetElement.getBoundingClientRect();
  return `polygon(
    0% 0%,
    0% 100%,
    ${rect.left}px 100%,
    ${rect.left}px ${rect.top}px,
    ${rect.right}px ${rect.top}px,
    ${rect.right}px ${rect.bottom}px,
    ${rect.left}px ${rect.bottom}px,
    ${rect.left}px 100%,
    100% 100%,
    100% 0%
  )`;
}

// Initialize clip path (will be updated when highlight is applied)
getClipPath.value = '';

// Scroll handling to update position during scroll
const onScroll = (): void => {
  if (isTourCompleted()) return;
  if (!tourVisible.value) return; // Only update if tour is active

  redrawLayers();
};

// Lifecycle hooks
onMounted(() => {
  // Vue refs will be set automatically for Teleported elements
  // No need to manually query DOM for refs

  if (props.autoStart) {
    startTour();
  }

  window.addEventListener('resize', onResizeEnd);
  window.addEventListener('scroll', onScroll, true); // Use capture phase to catch all scrolls
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('resize', onResizeEnd);
  window.removeEventListener('scroll', onScroll, true);

  // Clear all timers
  clearTimeout(resizeTimer);
  clearTimeout(startDelayTimer);
  clearTimeout(teleportDelayTimer);

  // Ensure tour is stopped and cleaned up when component unmounts
  if (tourVisible.value) {
    stopTour();
  }
});

// Expose public API
defineExpose<VTourExposedMethods>({
  startTour,
  nextStep,
  lastStep,
  endTour,
  stopTour,
  goToStep,
  resetTour,
  updatePosition,
  updateHighlight,
  updateBackdrop,
});
</script>

<template>
  <Teleport to="body">
    <div
      class="vjt-modal-overlay"
      :class="{ 'vjt-tour-active': tourVisible }"
      :data-hidden="!tourVisible"
    >
      <div
        :id="backdropId"
        :data-hidden="!backdropVisible"
        :style="{ 'clip-path': getClipPath }"
      />
      <div
        :id="tooltipId"
        role="tooltip"
        :data-hidden="!tourVisible || isTransitioning"
      >
        <div v-if="tourVisible" :key="`step-${currentStepIndex}`">
          <div :id="arrowId" v-if="!hideArrow"></div>
          <slot
            name="content"
            :current-step-index="currentStepIndex"
            :current-step-data="getCurrentStep"
          >
            <div v-html="_CurrentStep.getCurrentStep?.content" />
          </slot>

          <slot
            name="actions"
            :lastStep="lastStep"
            :nextStep="nextStep"
            :endTour="endTour"
            :getNextLabel="getNextLabel"
            :props="props"
            :_CurrentStep="_CurrentStep"
          >
            <div class="vjt-actions">
              <button
                v-if="lastStepIndex < currentStepIndex"
                type="button"
                @click.prevent="lastStep"
              >
                {{ props.buttonLabels?.back || 'Back' }}
              </button>

              <button
                v-if="!props.hideSkip"
                type="button"
                @click.prevent="endTour"
              >
                {{ props.buttonLabels?.skip || 'Skip' }}
              </button>

              <button type="button" @click.prevent="nextStep">
                {{ getNextLabel }}
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
