import VTour from './components/VTour.vue';

export { VTour };
export type {
  ITourStep,
  VTourProps,
  VTourEvents,
  VTourEmits,
  VTourData,
  VTourExposedMethods,
  ButtonLabels,
  SaveToLocalStorage,
  JumpOptions,
} from './Types';

// Re-export NanoPopPosition from nanopop for user convenience
export type { NanoPopPosition } from 'nanopop';
