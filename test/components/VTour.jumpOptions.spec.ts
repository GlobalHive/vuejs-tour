import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ITourStep } from '../../src/Types';
import jump from 'jump.js';
import { useFakeTimersPerTest, startAndWaitReady } from '../helpers/timers';
import { mountVTour } from '../helpers/mountVTour';

// Mock jump.js
vi.mock('jump.js', () => ({
  default: vi.fn((target, options) => {
    // Immediately call the callback
    if (options?.callback) {
      options.callback();
    }
  }),
}));

describe('VTour Component - Jump Options', () => {
  useFakeTimersPerTest();

  const steps: ITourStep[] = [
    {
      target: '#step1',
      content: 'Step 1',
    },
    {
      target: '#step2',
      content: 'Step 2',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="step1">Target 1</div>
      <div id="step2">Target 2</div>
    `;
  });

  it('should use default jump options when none provided', async () => {
    const wrapper = mountVTour({ steps, noScroll: false });

    await startAndWaitReady(wrapper);

    expect(jump).toHaveBeenCalled();
    const callArgs = (jump as any).mock.calls[0][1];

    // Should use default values (a11y follows enableA11y prop which defaults to true via mountVTour)
    expect(callArgs.duration).toBe(500);
    expect(callArgs.offset).toBe(-100);
    expect(callArgs.easing).toBe('easeInOutQuad');
    expect(callArgs.a11y).toBe(true); // mountVTour defaults enableA11y to true

    wrapper.unmount();
  });

  it('should use global jump options from props', async () => {
    const wrapper = mountVTour({
      steps,
      noScroll: false,
      jumpOptions: {
        duration: 1000,
        offset: -200,
        a11y: true,
      },
    });

    await startAndWaitReady(wrapper);

    expect(jump).toHaveBeenCalled();
    const callArgs = (jump as any).mock.calls[0][1];

    // Should use global custom values
    expect(callArgs.duration).toBe(1000);
    expect(callArgs.offset).toBe(-200);
    expect(callArgs.a11y).toBe(true);
    expect(callArgs.easing).toBe('easeInOutQuad'); // Default still applies

    wrapper.unmount();
  });

  it('should use step-specific jump options that override global options', async () => {
    const stepsWithOptions: ITourStep[] = [
      {
        target: '#step1',
        content: 'Step 1',
        jumpOptions: {
          duration: 300,
          offset: -50,
        },
      },
    ];

    const wrapper = mountVTour({
      steps: stepsWithOptions,
      noScroll: false,
      jumpOptions: {
        duration: 1000,
        offset: -200,
        a11y: true,
      },
    });

    await startAndWaitReady(wrapper);

    expect(jump).toHaveBeenCalled();
    const callArgs = (jump as any).mock.calls[0][1];

    // Step options should override global options
    expect(callArgs.duration).toBe(300);
    expect(callArgs.offset).toBe(-50);
    expect(callArgs.a11y).toBe(true); // From global
    expect(callArgs.easing).toBe('easeInOutQuad'); // From default

    wrapper.unmount();
  });

  it('should not scroll when noScroll is enabled', async () => {
    const wrapper = mountVTour({
      steps,
      noScroll: true,
      jumpOptions: {
        duration: 1000,
      },
    });

    await startAndWaitReady(wrapper);

    // jump.js should not be called when noScroll is true
    expect(jump).not.toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should support custom easing function', async () => {
    const customEasing = (t: number, b: number, c: number, d: number) => {
      return (c * t) / d + b;
    };

    const wrapper = mountVTour({
      steps,
      noScroll: false,
      jumpOptions: {
        easing: customEasing,
      },
    });

    await startAndWaitReady(wrapper);

    expect(jump).toHaveBeenCalled();
    const callArgs = (jump as any).mock.calls[0][1];

    // Should use custom easing function
    expect(callArgs.easing).toBe(customEasing);

    wrapper.unmount();
  });

  it('should respect enableA11y prop for jump.js a11y option', async () => {
    // Test with enableA11y: false
    const wrapper1 = mountVTour({ steps, enableA11y: false, noScroll: false });

    await startAndWaitReady(wrapper1);

    expect(jump).toHaveBeenCalled();
    const callArgs1 = (jump as any).mock.calls[0][1];
    expect(callArgs1.a11y).toBe(false);

    wrapper1.unmount();
    vi.clearAllMocks();

    // Test with enableA11y: true (explicit)
    const wrapper2 = mountVTour({ steps, enableA11y: true, noScroll: false });

    await startAndWaitReady(wrapper2);

    expect(jump).toHaveBeenCalled();
    const callArgs2 = (jump as any).mock.calls[0][1];
    expect(callArgs2.a11y).toBe(true);

    wrapper2.unmount();
  });
});
