<script setup lang="ts">
import '../src/style/style.scss'
import VTour from "./components/VTour.vue";
import type {ITourStep} from "./Types.ts";

const steps: ITourStep[] = [
  {
    target: '[data-step="0"]',
    content: 'This is the first step',
  },
  {
    target: '[data-step="1"]',
    content: 'This is the second step',
  },
]
</script>

<template>
  <div data-step="0" style="background: #303030; height: 200px; width: 200px; margin: 64px; color: whitesmoke; padding: 24px">
    TEST DIV
  </div>

  <div data-step="1" style="background: #303030; height: 200px; width: 200px; margin: 64px; color: whitesmoke; padding: 24px">
    TEST DIV
  </div>

  <VTour :steps="steps" autoStart saveToLocalStorage="step"/>
</template>

<style scoped>

</style>