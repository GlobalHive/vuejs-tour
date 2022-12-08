<template>
  <div id="vjt-tooltip" role="tooltip" data-hidden>
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
  endTour
});

async function startTour() {
  await setTimeout(() => {
    document.getElementById("vjt-tooltip").removeAttribute("data-hidden");
    popper.value = createPopper(document.querySelector(`${getStep.value.target}`), document.getElementById("vjt-tooltip"), {
      placement: `${getStep.value.placement ? getStep.value.placement : "top"}`,
      modifiers: [
        {
          name: "arrow",
          options: {
            element: document.getElementById("vjt-arrow")
          }
        },
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
    currentStep.value++;
    recalculatePopper(currentStep.value - 1);
    return;
  }
  endTour();
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
    recalculatePopper(currentStep.value + 1);
  }

}

function endTour() {
  document.getElementById("vjt-tooltip").setAttribute("data-hidden", "");
  document.querySelector(".vjt-highlight").classList.remove("vjt-highlight");
  popper.value.destroy();
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
  highlightTarget(lastStep);
}

onMounted(() => {
  if (props.autoStart) {
    startTour();
  }
});
</script>

<style lang="scss">
$vjt__tooltip_color: #fff;
$vjt__tooltip_z_index: 9999;
$vjt__tooltip_font_size: 13px;
$vjt__tooltip_arrow_size: 8px;
$vjt__tooltip_background: #333;
$vjt__tooltip_border_radius: 4px;

$vjt__highlight_margin: 4px;
$vjt__highlight_padding: 4px;
$vjt__highlight_color: #0EA5E9FF;
$vjt__highlight_border_radius: 4px;
$vjt__highlight_border: 1px solid #0EA5E9FF;

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
  border: $vjt__highlight_border;
  border-radius: $vjt__highlight_border_radius;
  padding: $vjt__highlight_padding;
  margin: $vjt__highlight_margin;
  box-shadow: 0 0 10px $vjt__highlight_color;
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
</style>
