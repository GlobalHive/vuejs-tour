<script setup lang="ts">
import { createPopper, type NanoPop } from "nanopop";
import {
  computed,
  type ComputedRef,
  onMounted,
  type Reactive,
  reactive,
  type Ref,
  ref,
  onUnmounted
} from "vue";
import type { ITourStep } from "../Types.ts";
import jump from "jump.js";

export interface IVTourProps {
  name?: string;
  steps: ITourStep[];
  backdrop?: boolean;
  autoStart?: boolean;
  startDelay?: number;
  highlight?: boolean;
  margin?: number;
  buttonLabels?: {
    next: string;
    back: string;
    done: string;
    skip: string;
  };
  saveToLocalStorage?: "never" | "step" | "end";
  hideSkip?: boolean;
  hideArrow?: boolean;
  noScroll?: boolean;
  resizeTimeout?: number;
}
export interface IVTourData {
  currentStep: number;
  lastStep: number;
  nextStep: number;
  getCurrentStep: ComputedRef<ITourStep>;
  getLastStep: ComputedRef<ITourStep>;
  getNextStep: ComputedRef<ITourStep>;
}

const __saveKey = computed(() => "vjt-" + (props.name || "default"));

const _VTour: Ref<NanoPop | undefined> = ref(undefined);
const _Tooltip: Ref<HTMLElement | undefined> = ref(undefined);
const _Backdrop: Ref<HTMLElement | undefined> = ref(undefined);
const _CurrentStep: Reactive<IVTourData> = reactive({
  currentStep: 0,
  lastStep: 0,
  nextStep: 1,
  getCurrentStep: computed(() => props.steps[_CurrentStep.currentStep]),
  getLastStep: computed(() => props.steps[_CurrentStep.lastStep]),
  getNextStep: computed(() => props.steps[_CurrentStep.nextStep]),
});
const props = defineProps<IVTourProps>();
const emit = defineEmits<{
  onTourStart: [];
  onTourEnd: [];
  onTourStep: [];
}>();
defineExpose({
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
const getNextLabel: ComputedRef<String> = computed(() => {
  if (_CurrentStep.currentStep === props.steps.length - 1)
    return props.buttonLabels?.done || "Done";
  return props.buttonLabels?.next || "Next";
});

const getClipPath = ref("");

function startTour(): void {
  if (localStorage.getItem(__saveKey.value) === "true")
    return;
  if (props.saveToLocalStorage === "step") {
    _CurrentStep.currentStep = parseInt(
      localStorage.getItem(__saveKey.value) || "0"
    );
    if (_CurrentStep.currentStep > 0) {
      _CurrentStep.lastStep = Math.max(_CurrentStep.currentStep - 1, 0);
      _CurrentStep.nextStep = _CurrentStep.currentStep + 1;
    }
  } else _CurrentStep.currentStep = 0;

  setTimeout(async () => {
    await beforeStep(_CurrentStep.currentStep);
    
    const targetElement = document.querySelector(
      `${_CurrentStep.getCurrentStep.target}`
    ) as HTMLElement;
    
    if (!targetElement) {
      return;
    }
    
    if (!_Tooltip.value) {
      return;
    }
    
    if (!_VTour.value) {
      _VTour.value = createPopper(
        targetElement,
        _Tooltip.value,
        {
          position: _CurrentStep.getCurrentStep.placement || "right",
          margin:
            props.margin ||
            (props.highlight || _CurrentStep.getCurrentStep.highlight ? 14 : 8),
        }
      );
    }
    updatePosition();
    emit("onTourStart");
  }, props.startDelay);
}

function stopTour(): void {
  _Backdrop.value?.setAttribute("data-hidden", "");
  document
    .querySelectorAll(".vjt-highlight")!
    .forEach((element) => element.classList.remove("vjt-highlight"));
  _Tooltip.value?.setAttribute("data-hidden", "");
}

function resetTour(restart: boolean): void {
  stopTour();
  _CurrentStep.currentStep = 0;
  _CurrentStep.lastStep = 0;
  _CurrentStep.nextStep = 1;
  localStorage.removeItem(__saveKey.value);
  if (restart) startTour();
}

async function nextStep() {
  await beforeStep(_CurrentStep.nextStep);
  _CurrentStep.lastStep = _CurrentStep.currentStep;
  _CurrentStep.currentStep++;
  if (_CurrentStep.currentStep > props.steps.length - 1) {
    endTour();
    return;
  }
  _CurrentStep.nextStep = _CurrentStep.currentStep + 1;
  updatePosition();
}

async function lastStep() {
  await beforeStep(_CurrentStep.lastStep);
  _CurrentStep.currentStep = _CurrentStep.lastStep;
  _CurrentStep.lastStep--;
  if (_CurrentStep.lastStep === -1) {
    _CurrentStep.lastStep = 0;
  }
  if (_CurrentStep.currentStep < 0) {
    endTour();
    return;
  }
  _CurrentStep.nextStep = _CurrentStep.currentStep + 1;
  updatePosition();
}

function endTour(): void {
  stopTour();
  if (props.saveToLocalStorage !== "never")
    localStorage.setItem(__saveKey.value, "true");
  emit("onTourEnd");
}

function goToStep(step: number): void {
  beforeStep(step);
  _CurrentStep.currentStep = step;
  _CurrentStep.lastStep = Math.max(step - 1, 0);
  _CurrentStep.nextStep = step + 1;
  updatePosition();
}

async function beforeStep(step: number): Promise<void> {
  await props.steps[step]?.onBefore?.();
}

async function updatePosition(): Promise<void> {
  const targetElement = document.querySelector(
    `${_CurrentStep.getCurrentStep.target}`
  ) as HTMLElement;
  
  if (!targetElement || !_Tooltip.value || !_VTour.value) {
    return;
  }

  await new Promise<void>((resolve) => {
    updateHighlight();
    updateBackdrop();
    _Tooltip.value!.setAttribute("data-hidden", "");
    if (!props.noScroll && !_CurrentStep.getCurrentStep.noScroll) {
      jump(targetElement, {
        duration: 500,
        offset: -100,
        callback: () => {
          resolve();
        },
      });
    } else resolve();
  });
  
  _Tooltip.value.removeAttribute("data-hidden");
  _Tooltip.value.setAttribute(
    "data-arrow",
    _VTour.value.update({
      reference: targetElement,
      position: _CurrentStep.getCurrentStep.placement || "right",
    }) || "right"
  );
  if (props.saveToLocalStorage === "step")
    localStorage.setItem(__saveKey.value, _CurrentStep.currentStep.toString());
  await _CurrentStep.getCurrentStep.onAfter?.();
  emit("onTourStep");
}

function updateHighlight(): void {
  document
    .querySelectorAll(".vjt-highlight")
    .forEach((element) => element.classList.remove("vjt-highlight"));
  if (!props.highlight && !_CurrentStep.getCurrentStep.highlight) return;
  
  const targetElement = document.querySelector(
    `${_CurrentStep.getCurrentStep.target}`
  ) as HTMLElement;
  
  if (!targetElement) {
    return;
  }
  
  targetElement.classList.add("vjt-highlight");
  getClipPath.value = getClipPathValues(".vjt-highlight");
}

function updateBackdrop(): void {
  if (props.backdrop || _CurrentStep.getCurrentStep.backdrop)
    _Backdrop.value?.removeAttribute("data-hidden");
  else _Backdrop.value?.setAttribute("data-hidden", "");
}

const redrawLayers = () => {
  if(localStorage.getItem(__saveKey.value) === "true") return;
  // Only redraw if the tour is currently active (tooltip is visible)
  if (_Tooltip.value?.hasAttribute("data-hidden")) return;
  updatePosition();
};

let resizeTimer: ReturnType<typeof setTimeout> | undefined = undefined;
const debounceTime = computed(() => props.resizeTimeout || 250);

const onResizeEnd = () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { redrawLayers();}, debounceTime.value);
}

onMounted(() => {
  _Tooltip.value = document.querySelector("#vjt-tooltip") as HTMLElement;
  _Backdrop.value = document.querySelector("#vjt-backdrop") as HTMLElement;
  if (props.autoStart) startTour();

  window.addEventListener("resize", onResizeEnd);
});

onUnmounted(() => {
  window.removeEventListener("resize", onResizeEnd);
});

function getClipPathValues(targetSelector: string): string {
  const targetElement = document.querySelector(targetSelector) as HTMLElement;
  if (!targetElement) return "";

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
</script>

<template>
  <div id="vjt-backdrop" data-hidden :style="'clip-path: ' + getClipPath"></div>
  <div id="vjt-tooltip" role="tooltip" data-arrow="r" data-hidden>
    <slot name="content" v-bind="{ _CurrentStep }">
      <div v-html="_CurrentStep.getCurrentStep?.content"></div>
    </slot>
    <slot name="actions" v-bind="{ lastStep, nextStep, endTour, _CurrentStep, getNextLabel, props }">
      <div class="vjt-actions">
        <button v-if="_CurrentStep.lastStep < _CurrentStep.currentStep" type="button" @click.prevent="lastStep()" v-text="props.buttonLabels?.back || 'Back'"></button>
        <button v-if="!props.hideSkip" type="button" @click.prevent="endTour()" v-text="props.buttonLabels?.skip || 'Skip'"></button>
        <button type="button" @click.prevent="nextStep()" v-text="getNextLabel"></button>
      </div>
    </slot>
    <div id="vjt-arrow" v-if="!props.hideArrow"></div>
  </div>
</template>
