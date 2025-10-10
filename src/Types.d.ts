import type { NanoPopPosition } from 'nanopop';

/**
 * Configuration for a single step in a tour
 */
export interface ITourStep {
  /** CSS selector for the target element */
  readonly target: string;

  /** HTML content to display in the tooltip */
  readonly content: string;

  /** Position of the tooltip relative to target (defaults to 'right') */
  readonly placement?: NanoPopPosition;

  /** Callback executed before showing this step */
  readonly onBefore?: () => Promise<void> | void;

  /** Callback executed after showing this step */
  readonly onAfter?: () => Promise<void> | void;

  /** Whether to highlight the target element for this step */
  readonly highlight?: boolean;

  /** Whether to show backdrop for this step */
  readonly backdrop?: boolean;

  /** Whether to disable auto-scrolling for this step */
  readonly noScroll?: boolean;
}

/**
 * LocalStorage save strategy options
 */
export type SaveToLocalStorage = 'never' | 'step' | 'end';

/**
 * Button label configuration
 */
export interface ButtonLabels {
  readonly next: string;
  readonly back: string;
  readonly done: string;
  readonly skip: string;
}

/**
 * Main VTour component props
 */
export interface VTourProps {
  /** Unique name for the tour (used for localStorage keys) */
  readonly name?: string;

  /** Array of tour steps */
  readonly steps: readonly ITourStep[];

  /** Whether to show backdrop by default */
  readonly backdrop?: boolean;

  /** Whether to automatically start the tour when component is mounted */
  readonly autoStart?: boolean;

  /** Delay in milliseconds before starting the tour */
  readonly startDelay?: number;

  /** Whether to highlight target elements by default */
  readonly highlight?: boolean;

  /** Margin in pixels around the tooltip */
  readonly margin?: number;

  /** Custom button labels */
  readonly buttonLabels?: Partial<ButtonLabels>;

  /** When to save tour progress to localStorage */
  readonly saveToLocalStorage?: SaveToLocalStorage;

  /** Whether to hide the skip button */
  readonly hideSkip?: boolean;

  /** Whether to hide the arrow pointing to target */
  readonly hideArrow?: boolean;

  /** Whether to disable auto-scrolling by default */
  readonly noScroll?: boolean;

  /** Debounce timeout for resize events in milliseconds */
  readonly resizeTimeout?: number;
}

/**
 * Tour events emitted by the component
 */
export interface VTourEvents {
  /** Emitted when the tour starts */
  onTourStart: [];

  /** Emitted when the tour ends */
  onTourEnd: [];

  /** Emitted when a step is shown (with step index) */
  onTourStep: [step: number];
}

/**
 * Tour events for defineEmits (Vue emit constraint format)
 */
export interface VTourEmits {
  onTourStart: [];
  onTourEnd: [];
  onTourStep: [step: number];
}

/**
 * Internal tour state data structure
 */
export interface VTourData {
  currentStep: number;
  lastStep: number;
  nextStep: number;
  getCurrentStep: ITourStep;
  getLastStep: ITourStep;
  getNextStep: ITourStep;
}

/**
 * Public API methods exposed by the VTour component
 */
export interface VTourExposedMethods {
  /** Start the tour */
  startTour: () => Promise<void>;

  /** Move to the next step */
  nextStep: () => Promise<void>;

  /** Move to the previous step */
  lastStep: () => Promise<void>;

  /** End the tour */
  endTour: () => void;

  /** Stop the tour without saving completion */
  stopTour: () => void;

  /** Navigate to a specific step by index */
  goToStep: (stepIndex: number) => Promise<void>;

  /** Reset tour state and optionally restart */
  resetTour: (shouldRestart?: boolean) => void;

  /** Update tooltip position */
  updatePosition: () => Promise<void>;

  /** Update element highlights */
  updateHighlight: () => void;

  /** Update backdrop visibility */
  updateBackdrop: () => void;
}
