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
  if(_VTour.value) return;

  console.log(props.saveToLocalStorage)

  switch(props.saveToLocalStorage){
    case 'step':
      console.log(getLocalStorageData());
      if(getLocalStorageData() === 'true') return;
      if(getLocalStorageData()){
        _CurrentStep.currentStep = parseInt(getLocalStorageData()!);
        console.log(parseInt(getLocalStorageData()!))
        console.log(_CurrentStep.currentStep)
        _CurrentStep.lastStep = (parseInt(getLocalStorageData()!) - 1) >= 0 ? parseInt(getLocalStorageData()!) - 1 : 0;
      }
      break;
    case 'end':
      if(getLocalStorageData() === 'true') return;
      break;
  }

  // Check if Target exists
  //checkTarget();

  setTimeout(() => {
    _VTour.value = createPopper(document.querySelector(`${_CurrentStep.getCurrentStep.target}`) as HTMLElement, _Tooltip.value!, {
      position: _CurrentStep.getCurrentStep.placement || 'right',
      margin: props.margin || 8,
    });
    _Tooltip.value!.removeAttribute('data-hidden');
    if(props.backdrop) document.querySelector('#vjt-backdrop')!.removeAttribute('data-hidden');
    _VTour.value!.update();
    if(props.saveToLocalStorage === 'step') setLocalStorageData(_CurrentStep.currentStep.toString());
    emit("onTourStart");
  }, props.startDelay);
}

function getLocalStorageData(){
  return localStorage.getItem('vjt-' + props.name || 'default');
}

function setLocalStorageData(value: string){
  localStorage.setItem('vjt-' + (props.name || 'default'), value);
}

function checkTarget(){
  while(!document.querySelector(`${_CurrentStep.getCurrentStep.target}`)){
    if(_CurrentStep.currentStep > props.steps.length){
      return;
    }
    _CurrentStep.currentStep++;
  }
}

onMounted(() => {
  _Tooltip.value = document.querySelector('#vjt-tooltip') as HTMLElement;
  if(props.autoStart) startTour();
});
</script>

<template>
  <div id="vjt-backdrop" data-hidden></div>
  <div id="vjt-tooltip" role="tooltip" data-arrow="r" data-hidden>
    <slot name="content" v-bind="{  }">
      <div v-html="_CurrentStep.getCurrentStep.content"></div>
    </slot>
    <slot name="actions" v-bind="{  }">
      <div class="vjt-actions">
        <button type="button" @click.prevent="" v-text="'asd'"></button>
        <button type="button" @click.prevent="" v-text="'asd'"></button>
        <button type="button" @click.prevent="" v-text="'asd'"></button>
      </div>
    </slot>
    <div id="vjt-arrow"></div>
  </div>
</template>