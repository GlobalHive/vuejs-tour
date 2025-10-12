<script setup lang="ts">
import { createPopper, type NanoPop } from 'nanopop';
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import jump from 'jump.js';
import type {
  VTourProps,
  VTourEmits,
  VTourData,
  VTourExposedMethods,
} from '../Types';

// Props with defaults
const props = withDefaults(defineProps<VTourProps>(), {
  name: 'default',
  backdrop: false,
  autoStart: false,
  startDelay: 0,
  highlight: false,
  margin: 8,
  saveToLocalStorage: 'never',
  hideSkip: false,
  hideArrow: false,
  noScroll: false,
  resizeTimeout: 250,
});

// Emit definitions using standardized VTourEmits type
const emit = defineEmits<VTourEmits>();

// Reactive state with cleaner naming
const saveKey = computed(() => `vjt-${props.name}`);
const vTour = ref<NanoPop>();
const tooltip = ref<HTMLElement>();
const backdrop = ref<HTMLElement>();

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

const startTour = async (): Promise<void> => {
  if (localStorage.getItem(saveKey.value) === 'true') return;

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

  setTimeout(async () => {
    await beforeStep(currentStepIndex.value);

    const currentStepData = getCurrentStep.value;
    if (!currentStepData) {
      console.warn('No step data available');
      return;
    }

    const targetElement = document.querySelector(
      currentStepData.target
    ) as HTMLElement;

    if (!targetElement || !tooltip.value) {
      console.warn(`Tour target element not found: ${currentStepData.target}`);
      return;
    }

    if (!vTour.value) {
      vTour.value = createPopper(targetElement, tooltip.value, {
        position: currentStepData.placement || 'right',
        margin:
          props.margin ||
          (props.highlight || currentStepData.highlight ? 14 : 8),
      });
    }

    await updatePosition();
    emit('onTourStart');
  }, props.startDelay);
};

const stopTour = (): void => {
  backdrop.value?.setAttribute('data-hidden', '');
  document
    .querySelectorAll('.vjt-highlight')
    .forEach((element) => element.classList.remove('vjt-highlight'));
  tooltip.value?.setAttribute('data-hidden', '');
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
  lastStepIndex.value = currentStepIndex.value;
  currentStepIndex.value++;

  if (currentStepIndex.value > props.steps.length - 1) {
    endTour();
    return;
  }

  nextStepIndex.value = currentStepIndex.value + 1;
  await updatePosition();
};

const lastStep = async (): Promise<void> => {
  await beforeStep(lastStepIndex.value);
  currentStepIndex.value = lastStepIndex.value;
  lastStepIndex.value = Math.max(lastStepIndex.value - 1, 0);

  if (currentStepIndex.value < 0) {
    endTour();
    return;
  }

  nextStepIndex.value = currentStepIndex.value + 1;
  await updatePosition();
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
  currentStepIndex.value = stepIndex;
  lastStepIndex.value = Math.max(stepIndex - 1, 0);
  nextStepIndex.value = stepIndex + 1;
  await updatePosition();
};

const beforeStep = async (step: number): Promise<void> => {
  const stepData = props.steps[step];
  if (stepData?.onBefore) {
    await stepData.onBefore();
  }
};

const updatePosition = async (): Promise<void> => {
  const currentStepData = getCurrentStep.value;
  if (!currentStepData) {
    console.warn('No current step data available');
    return;
  }

  const targetElement = document.querySelector(
    currentStepData.target
  ) as HTMLElement;

  if (!targetElement || !tooltip.value || !vTour.value) {
    console.warn('Cannot update position: missing required elements');
    return;
  }

  updateHighlight();
  updateBackdrop();
  tooltip.value.setAttribute('data-hidden', '');

  if (!props.noScroll && !currentStepData.noScroll) {
    await new Promise<void>((resolve) => {
      jump(targetElement, {
        duration: 500,
        offset: -100,
        callback: resolve,
      });
    });
  }

  tooltip.value.removeAttribute('data-hidden');
  const arrowPosition =
    vTour.value.update({
      reference: targetElement,
      position: currentStepData.placement || 'right',
    }) || 'right';

  tooltip.value.setAttribute('data-arrow', arrowPosition);

  if (props.saveToLocalStorage === 'step') {
    localStorage.setItem(saveKey.value, currentStepIndex.value.toString());
  }

  if (currentStepData.onAfter) {
    await currentStepData.onAfter();
  }

  emit('onTourStep', currentStepIndex.value);
};

const updateHighlight = (): void => {
  // Remove existing highlights
  document
    .querySelectorAll('.vjt-highlight')
    .forEach((element) => element.classList.remove('vjt-highlight'));

  const currentStepData = getCurrentStep.value;
  if (!props.highlight && !currentStepData?.highlight) return;

  if (!currentStepData) {
    console.warn('No current step data for highlight');
    return;
  }

  const targetElement = document.querySelector(
    currentStepData.target
  ) as HTMLElement;

  if (!targetElement) {
    console.warn(`Highlight target not found: ${currentStepData.target}`);
    return;
  }

  targetElement.classList.add('vjt-highlight');
  getClipPath.value = getClipPathValues('.vjt-highlight');
};

const updateBackdrop = (): void => {
  const currentStepData = getCurrentStep.value;
  const shouldShowBackdrop = props.backdrop || currentStepData?.backdrop;

  if (shouldShowBackdrop) {
    backdrop.value?.removeAttribute('data-hidden');
  } else {
    backdrop.value?.setAttribute('data-hidden', '');
  }
};

// Add missing redrawLayers function from old version
const redrawLayers = (): void => {
  if (localStorage.getItem(saveKey.value) === 'true') return;
  updatePosition();
};

// Resize handling with debounce
let resizeTimer: ReturnType<typeof setTimeout> | undefined;

const onResizeEnd = (): void => {
  if (localStorage.getItem(saveKey.value) === 'true') return;

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

// Initialize clip path (only in browser environment)
if (typeof document !== 'undefined') {
  getClipPath.value = getClipPathValues('.vjt-highlight');
}

// Lifecycle hooks
onMounted(() => {
  tooltip.value = document.querySelector('#vjt-tooltip') as HTMLElement;
  backdrop.value = document.querySelector('#vjt-backdrop') as HTMLElement;

  if (props.autoStart) {
    startTour();
  }

  window.addEventListener('resize', onResizeEnd);
});

onUnmounted(() => {
  window.removeEventListener('resize', onResizeEnd);
  clearTimeout(resizeTimer);
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
  <div
    id="vjt-backdrop"
    ref="backdrop"
    data-hidden
    :style="{ 'clip-path': getClipPath }"
  />
  <div
    id="vjt-tooltip"
    ref="tooltip"
    role="tooltip"
    data-arrow="right"
    data-hidden
  >
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
          class="vjt-btn vjt-btn-back"
          @click.prevent="lastStep"
        >
          {{ props.buttonLabels?.back || 'Back' }}
        </button>

        <button
          v-if="!props.hideSkip"
          type="button"
          class="vjt-btn vjt-btn-skip"
          @click.prevent="endTour"
        >
          {{ props.buttonLabels?.skip || 'Skip' }}
        </button>

        <button
          type="button"
          class="vjt-btn vjt-btn-next"
          @click.prevent="nextStep"
        >
          {{ getNextLabel }}
        </button>
      </div>
    </slot>

    <div v-if="!props.hideArrow" id="vjt-arrow" class="vjt-arrow" />
  </div>
</template>

<style scoped>
.vjt-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.vjt-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vjt-btn:hover {
  background: #f5f5f5;
}

.vjt-btn-next {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.vjt-btn-next:hover {
  background: #0056b3;
}

.vjt-arrow {
  width: 0;
  height: 0;
  position: absolute;
}
</style>
