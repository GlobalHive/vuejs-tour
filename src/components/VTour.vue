<template>
  <div id="vjt-tooltip" data-hidden role="tooltip">
    <slot name="content" v-bind="{getCurrentStepContent}">
      <div v-html="getCurrentStepContent"></div>
    </slot>
    <slot name="actions" v-bind="{ endTour, nextStep, prevStep }">
      <div class="vjt-actions">
        <button type="button" @click.prevent="endTour">Skip</button>
        <button v-if="currentStep > 0" type="button" @click.prevent="prevStep">Back</button>
        <button type="button" v-text="getNextText" @click.prevent="nextStep"></button>
      </div>
    </slot>
    <div id="vjt-arrow" data-popper-arrow></div>
  </div>
</template>

<script setup>
import { createPopper } from "@popperjs/core";
import { computed, onMounted, ref } from "vue";
import jump from "jump.js";

const popper = ref(null);

const currentStep = ref(0);
const maxSteps = computed(() => {
  return props.steps.length - 1;
});
const getStep = computed(() => {
  return props.steps[currentStep.value];
});
const getNextText = computed(() => {
  return currentStep.value === maxSteps.value ? "Finish" : "Next";
});
const getCurrentStepContent = computed(() => {
  return getStep.value.content;
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
  }
});
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
    popper.value = createPopper(document.querySelector(`${getStep.value.target}`), document.getElementById("vjt-tooltip"), {
      placement: `${getStep.value.placement ? getStep.value.placement : "top"}`,
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
  }, props.startDelay);
}

async function nextStep() {
  if (currentStep.value < maxSteps.value) {
    getStep.value.onNext ? await getStep.value.onNext() : null;
    currentStep.value++;
    recalculatePopper(currentStep.value - 1);
    return;
  }
  endTour();
}

async function prevStep() {
  if (currentStep.value > 0) {
    getStep.value.onPrev ? await getStep.value.onPrev() : null;
    currentStep.value--;
    recalculatePopper(currentStep.value + 1);
  }
}

function endTour() {
  document.getElementById("vjt-tooltip").setAttribute("data-hidden", "");
  document.querySelector(".vjt-highlight").classList.remove("vjt-highlight");
  popper.value.destroy();
  localStorage.setItem("vjt-tour", "true");
}

function resetTour() {
  currentStep.value = 0;
  localStorage.removeItem("vjt-tour");
  startTour();
}

function highlightTarget(lastStep = null) {
  document.querySelector(`${getStep.value.target}`).classList.add("vjt-highlight");
  if (lastStep != null) {
    document.querySelector(`${props.steps[lastStep].target}`).classList.remove("vjt-highlight");
  }
}

function recalculatePopper(lastStep) {
  popper.value.setOptions({
    placement: `${getStep.value.placement ? getStep.value.placement : "top"}`
  });
  popper.value.state.elements.reference = document.querySelector(`${getStep.value.target}`);
  popper.value.update();
  jump(document.querySelector(`${getStep.value.target}`), {
    duration: 500,
    offset: -100
  });
  highlightTarget(lastStep);
}

onMounted(() => {
  if (props.autoStart) {
    startTour();
  }
});
</script>
