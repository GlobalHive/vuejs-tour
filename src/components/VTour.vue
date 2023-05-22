<template>
  <div id="vjt-tooltip" data-hidden role="tooltip">
    <slot name="content" v-bind="{ step }">
      <div v-html="step.getCurrentStep.content"></div>
    </slot>
    <slot name="actions" v-bind="{ endTour, nextStep, prevStep, step }">
      <div class="vjt-actions">
        <button type="button" @click.prevent="endTour" v-text="props.buttonLabels.skip"></button>
        <button v-if="step.currentStep > 0" type="button" v-text="props.buttonLabels.prev" @click.prevent="prevStep"></button>
        <button type="button" v-text="getNextText" @click.prevent="nextStep"></button>
      </div>
    </slot>
    <div id="vjt-arrow" data-popper-arrow></div>
  </div>
</template>

<script setup>
import { createPopper } from "@popperjs/core";
import { computed, onMounted, reactive, ref } from "vue";
import jump from "jump.js";

const popper = ref(null);
const step = reactive({
  currentStep: 0,
  lastStep: null,
  getCurrentStep: computed(() => {
    return props.steps[step.currentStep];
  }),
  getLastStep: computed(() => {
    return props.steps[step.lastStep];
  }),
});
const maxSteps = computed(() => {
  return props.steps.length - 1;
});
const getNextText = computed(() => {
  return step.currentStep === maxSteps.value ? props.buttonLabels.finish : props.buttonLabels.next;
});

const props = defineProps({
  steps: {
    type: Array,
    required: true
  },
  autoStart: {
    type: Boolean,
    default: false
  },
  startDelay: {
    type: Number,
    default: 0
  },
  highlight: {
    type: Boolean,
    default: false
  },
  buttonLabels: {
    type: Object,
    default: () => {
      return {
        next: "Next",
        prev: "Back",
        finish: "Finish",
        skip: "Skip"
      };
    }
  },
});
const emit = defineEmits(["onTourStart", "onTourEnd"]);
defineExpose({
  startTour,
  nextStep,
  prevStep,
  endTour,
  resetTour
});

async function startTour() {
  if (localStorage.getItem("vjt-tour") === "true") return;
  await setTimeout(() => {
    document.getElementById("vjt-tooltip").removeAttribute("data-hidden");
    popper.value = createPopper(document.querySelector(`${step.getCurrentStep.target}`), document.getElementById("vjt-tooltip"), {
      placement: `${step.getCurrentStep.placement ? step.getCurrentStep.placement : "top"}`,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8]
          }
        }
      ]
    });
    props.highlight ? highlightTarget() : null;
    emit("onTourStart");
  }, props.startDelay);
}
function highlightTarget() {
  let _currentStep = document.querySelector(`${step.getCurrentStep.target}`);
  let _lastStep = document.querySelector(`${step.getLastStep?.target}`);
  _currentStep.classList.add("vjt-highlight");
  if (_lastStep != null && _currentStep !== _lastStep) _lastStep.classList.remove("vjt-highlight");
}
async function nextStep() {
  if (step.currentStep < maxSteps.value) {
    step.getCurrentStep.onNext ? await step.getCurrentStep.onNext() : null;
    step.lastStep = step.currentStep;
    step.currentStep++;
    while(document.querySelector(`${step.getCurrentStep.target}`) === null) {
      step.currentStep++;
    }
    recalculatePopper();
    return;
  }
  endTour();
}
async function prevStep() {
  if (step.currentStep > 0) {
    step.getCurrentStep.onPrev ? await step.getCurrentStep.onPrev() : null;
    step.lastStep = step.currentStep;
    step.currentStep--;
    while(document.querySelector(`${step.getCurrentStep.target}`) === null) {
      step.currentStep--;
    }
    recalculatePopper();
  }
}
function endTour() {
  document.getElementById("vjt-tooltip").setAttribute("data-hidden", "");
  document.querySelector(".vjt-highlight")?.classList.remove("vjt-highlight");
  popper.value.destroy();
  localStorage.setItem("vjt-tour", "true");
  jump(document.body, {
    duration: 500,
  });
  emit("onTourEnd");
}
function resetTour() {
  step.currentStep = 0;
  step.lastStep = 0;
  localStorage.removeItem("vjt-tour");
  startTour();
}
async function recalculatePopper() {
  popper.value.setOptions({
    placement: `${step.getCurrentStep.placement ? step.getCurrentStep.placement : "top"}`
  });
  popper.value.state.elements.reference = document.querySelector(`${step.getCurrentStep.target}`);
  popper.value.update();
  jump(document.querySelector(`${step.getCurrentStep.target}`), {
    duration: 500,
    offset: -100
  });
  props.highlight ? highlightTarget() : null;
  step.getCurrentStep.onShow ? await step.getCurrentStep.onShow() : null;
}

onMounted(() => {
  if (props.autoStart) {
    startTour();
  }
});
</script>
