<script setup lang="ts">
import {createPopper, type NanoPop} from "nanopop";
import {computed, type ComputedRef, onMounted, type Reactive, reactive, type Ref, ref, useSlots} from "vue";
import type {ITourStep} from "../Types.ts";

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
    prev: string;
    done: string;
    skip: string;
  };
  saveToLocalStorage?: 'never' | 'step' | 'end';
}
interface IVTourData {
  currentStep: number;
  lastStep: number;
  getCurrentStep: ComputedRef<ITourStep>;
  getLastStep: ComputedRef<ITourStep>;
}

const _VTour: Ref<NanoPop | undefined> = ref();
const _Tooltip: Ref<HTMLElement | undefined> = ref();
const _CurrentStep: Reactive<IVTourData> = reactive({
  currentStep: 0,
  lastStep: 0,
  getCurrentStep: computed(() => props.steps[_CurrentStep.currentStep]),
  getLastStep: computed(() => props.steps[_CurrentStep.lastStep]),
});
const props = defineProps<IVTourProps>()
const slots = useSlots()
const emit = defineEmits<{
  onTourStart: [],
  onTourEnd: []
}>()

function startTour(){
  if(localStorage.getItem('vjt-' + (props.name || 'default')) === 'true') return;
  if(props.saveToLocalStorage === 'step') _CurrentStep.currentStep = parseInt(localStorage.getItem('vjt-' + (props.name || 'default')) || '0');

  setTimeout(() => {
    if(!_VTour.value){
      _VTour.value = createPopper(document.querySelector(`${_CurrentStep.getCurrentStep.target}`) as HTMLElement, _Tooltip.value!, {
        position: _CurrentStep.getCurrentStep.placement || 'right',
        margin: props.margin || 8,
      });
    }
    if(props.backdrop) document.querySelector('#vjt-backdrop')!.removeAttribute('data-hidden');
    updatePosition();
    emit("onTourStart");
  }, props.startDelay);
}

function resetTour(){
  _CurrentStep.currentStep = 0;
  _CurrentStep.lastStep = 0;
  localStorage.removeItem('vjt-' + (props.name || 'default'));
  startTour();
}

function nextStep(){
  _CurrentStep.lastStep = _CurrentStep.currentStep;
  _CurrentStep.currentStep++;
  if(_CurrentStep.currentStep > props.steps.length -1){
    endTour();
    return;
  }
  updatePosition();
}

function lastStep(){
  _CurrentStep.currentStep = _CurrentStep.lastStep;
  _CurrentStep.lastStep--;
  if(_CurrentStep.lastStep === -1){
    _CurrentStep.lastStep = 0;
  }
  if(_CurrentStep.currentStep < 0){
    endTour();
    return;
  }
  updatePosition();
}

function endTour(){
  if(props.backdrop) document.querySelector('#vjt-backdrop')!.setAttribute('data-hidden', '');
  _Tooltip.value!.setAttribute('data-hidden', '');
  if(props.saveToLocalStorage !== 'never') localStorage.setItem('vjt-' + (props.name || 'default'), 'true');
  emit("onTourEnd");
}

function goToStep(step: number){
  _CurrentStep.currentStep = step;
  _CurrentStep.lastStep = step - 1;
  if(_CurrentStep.lastStep === -1){
    _CurrentStep.lastStep = 0;
  }
  updatePosition();
}

function updatePosition(){
  _Tooltip.value!.removeAttribute('data-hidden');
  _Tooltip.value!.setAttribute('data-arrow', _VTour.value!.update({
    reference: document.querySelector(`${_CurrentStep.getCurrentStep.target}`) as HTMLElement,
  }) || 'right');
  if(props.saveToLocalStorage === 'step') localStorage.setItem('vjt-' + (props.name || 'default'), _CurrentStep.currentStep.toString());
}

onMounted(() => {
  _Tooltip.value = document.querySelector('#vjt-tooltip') as HTMLElement;
  if(props.autoStart) startTour();
});
</script>

<template>
  <button @click="resetTour">asd</button>
  <div id="vjt-backdrop" data-hidden></div>
  <div id="vjt-tooltip" role="tooltip" data-arrow="r" data-hidden >
    <slot name="content" v-bind="{  }">
      <div v-html="_CurrentStep.getCurrentStep?.content"></div>
    </slot>
    <slot name="actions" v-bind="{  }">
      <div class="vjt-actions">
        <button v-if="_CurrentStep.lastStep < _CurrentStep.currentStep" type="button" @click.prevent="lastStep()" v-text="'Back'"></button>
        <button type="button" @click.prevent="endTour()" v-text="'Skip'"></button>
        <button type="button" @click.prevent="nextStep()" v-text="'Next'"></button>
      </div>
    </slot>
    <div id="vjt-arrow"></div>
  </div>
</template>