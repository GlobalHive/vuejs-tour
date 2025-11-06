import { nextTick } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { afterEach, beforeEach, vi } from 'vitest';

export function useFakeTimersPerTest() {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());
}

export async function flushVue() {
  await Promise.resolve();
  await flushPromises();
  await nextTick();
  await nextTick();
}

export async function runPending() {
  vi.runOnlyPendingTimers();
  await flushVue();
}

/**
 * Wait for isTransitioning to become false after a step transition.
 * Useful after calling nextStep(), lastStep(), or goToStep().
 */
export async function waitForStepTransition(wrapper: any) {
  for (let i = 0; i < 30; i++) {
    await runPending();
    const vm = wrapper.vm as any;
    const tip = document.querySelector<HTMLElement>('[id$="-tooltip"]');
    if (!vm.isTransitioning && tip?.getAttribute('data-hidden') === 'false') {
      // Extra flushes to ensure Vue re-renders the keyed step content
      await flushVue();
      await flushVue();
      return;
    }
  }
  const vm = wrapper.vm as any;
  throw new Error(
    `Step transition did not complete. isTransitioning=${vm.isTransitioning}, currentStepIndex=${vm.currentStepIndex}`
  );
}

/**
 * Start (if needed) and wait until tooltip exists and data-hidden="false".
 * Advances component's timed gates and waits for transition hooks to fire.
 */
export async function startAndWaitReady(wrapper: any) {
  if (!wrapper.props('autoStart')) {
    await (wrapper.vm as any).startTour();
  }
  await flushVue();

  // Advance the component's timed gates
  const startDelay = wrapper.props('startDelay') ?? 0;
  const teleportDelay = wrapper.props('teleportDelay') ?? 0;
  const transitionMs =
    wrapper.props('transitionDuration') ?? wrapper.props('transitionMs') ?? 0;

  // Advance startDelay to trigger the setTimeout callback
  if (startDelay > 0) {
    vi.advanceTimersByTime(startDelay);
  } else {
    // Even with 0 delay, need to run the pending timer
    vi.runOnlyPendingTimers();
  }
  await flushVue();

  // Now advance teleportDelay (inside the startDelay callback)
  if (teleportDelay > 0) {
    vi.advanceTimersByTime(teleportDelay);
  } else {
    vi.runOnlyPendingTimers();
  }
  await flushVue();

  // Advance any transition duration
  if (transitionMs > 0) {
    vi.advanceTimersByTime(transitionMs);
    await flushVue();
  }

  // Drain any remaining 0ms timers/microtasks and allow async operations to complete
  for (let i = 0; i < 30; i++) {
    await runPending();

    const vm = wrapper.vm as any;
    const tip = document.querySelector<HTMLElement>('[id$="-tooltip"]');

    if (
      tip &&
      vm.tourVisible &&
      !vm.isTransitioning &&
      tip.getAttribute('data-hidden') === 'false'
    ) {
      return tip;
    }
  }

  const finalTip = document.querySelector<HTMLElement>('[id$="-tooltip"]');
  const vm = wrapper.vm as any;
  throw new Error(
    `Tooltip not ready. tourVisible=${vm.tourVisible}, isTransitioning=${vm.isTransitioning}, ` +
      `data-hidden="${finalTip?.getAttribute('data-hidden')}", hasContent=${!!finalTip?.querySelector('[id$="-content"]')}`
  );
}
