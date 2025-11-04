import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ITourStep } from '../../src/Types';
import {
  useFakeTimersPerTest,
  startAndWaitReady,
  waitForStepTransition,
  flushVue,
} from '../helpers/timers';
import { mountVTour } from '../helpers/mountVTour';

describe('VTour Component - Accessibility', () => {
  useFakeTimersPerTest();

  let steps: ITourStep[];

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = `
      <div id="step1">Target 1</div>
      <div id="step2">Target 2</div>
      <div id="step3">Target 3</div>
    `;

    steps = [
      { target: '#step1', content: 'Step 1 content' },
      { target: '#step2', content: 'Step 2 content' },
      { target: '#step3', content: 'Step 3 content' },
    ];
  });

  describe('ARIA Attributes', () => {
    it('should add role="dialog" to tooltip', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip).toBeTruthy();
      expect(tooltip?.getAttribute('role')).toBe('dialog');

      wrapper.unmount();
    });

    it('should add aria-modal when accessibility is enabled', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-modal')).toBe('true');

      wrapper.unmount();
    });

    it('should add default aria-label to tooltip', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-label')).toBe('Guided tour');

      wrapper.unmount();
    });

    it('should use custom aria-label from props', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        ariaLabel: 'Product feature tour',
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-label')).toBe('Product feature tour');

      wrapper.unmount();
    });

    it('should use step-specific aria-label when provided', async () => {
      const stepsWithLabels = [
        { target: '#step1', content: 'Step 1', ariaLabel: 'Welcome step' },
        {
          target: '#step2',
          content: 'Step 2',
          ariaLabel: 'Feature introduction',
        },
      ];

      const wrapper = mountVTour({
        steps: stepsWithLabels,
        autoStart: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-label')).toBe('Welcome step');

      wrapper.unmount();
    });

    it('should add aria-describedby linking to content', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      const ariaDescribedby = tooltip?.getAttribute('aria-describedby');
      expect(ariaDescribedby).toBeTruthy();

      const contentElement = document.querySelector(`#${ariaDescribedby}`);
      expect(contentElement).toBeTruthy();

      wrapper.unmount();
    });

    it('should add tabindex="0" to make tooltip focusable when a11y enabled', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('tabindex')).toBe('0');

      wrapper.unmount();
    });

    it('should not add tabindex when a11y disabled', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: false,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('tabindex')).toBeNull();

      wrapper.unmount();
    });
  });

  describe('ARIA Live Region', () => {
    it('should include aria-live region for step announcements', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion).toBeTruthy();
      expect(liveRegion?.getAttribute('aria-atomic')).toBe('true');
      expect(liveRegion?.textContent?.trim()).toContain('Step 1 of 3');

      wrapper.unmount();
    });

    it('should update live region when step changes', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      let liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 1 of 3');

      // Navigate to next step
      const component = wrapper.vm as any;
      await component.nextStep();
      await waitForStepTransition(wrapper);

      // Re-query the live region as it gets recreated with the new :key
      liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 2 of 3');

      wrapper.unmount();
    });

    it('should not include live region when a11y disabled', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: false,
      });

      await startAndWaitReady(wrapper);

      const liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion).toBeNull();

      wrapper.unmount();
    });
  });

  describe('Button Labels', () => {
    it('should add descriptive aria-labels to back button', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const component = wrapper.vm as any;
      await component.nextStep();
      await waitForStepTransition(wrapper);

      const backButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent?.includes('Back')
      );
      expect(backButton?.getAttribute('aria-label')).toContain(
        'Go to previous step'
      );
      // Currently on step 2 (currentStepIndex=1), button shows currentStepIndex not currentStepIndex+1
      expect(backButton?.getAttribute('aria-label')).toContain('step 1 of 3');

      wrapper.unmount();
    });

    it('should add descriptive aria-labels to skip button', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const skipButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent?.includes('Skip')
      );
      expect(skipButton?.getAttribute('aria-label')).toBe(
        'Skip tour and close'
      );

      wrapper.unmount();
    });

    it('should add descriptive aria-labels to next button', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const nextButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent?.includes('Next')
      );
      expect(nextButton?.getAttribute('aria-label')).toContain(
        'Go to next step'
      );
      expect(nextButton?.getAttribute('aria-label')).toContain('step 2 of 3');

      wrapper.unmount();
    });

    it('should change next button aria-label to "Finish tour" on last step', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: true,
      });

      await startAndWaitReady(wrapper);

      const component = wrapper.vm as any;

      // Navigate to last step
      await component.nextStep();
      await waitForStepTransition(wrapper);
      await component.nextStep();
      await waitForStepTransition(wrapper);

      const finishButton = Array.from(document.querySelectorAll('button')).find(
        (btn) => btn.textContent?.includes('Done')
      );
      expect(finishButton?.getAttribute('aria-label')).toBe('Finish tour');

      wrapper.unmount();
    });

    it('should not add aria-labels when a11y disabled', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: false,
      });

      await startAndWaitReady(wrapper);

      const buttons = Array.from(document.querySelectorAll('button'));
      buttons.forEach((btn) => {
        expect(btn.getAttribute('aria-label')).toBeNull();
      });

      wrapper.unmount();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should listen for keyboard events when keyboardNav enabled', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      wrapper.unmount();
      addEventListenerSpy.mockRestore();
    });

    it('should not listen for keyboard events when keyboardNav disabled', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: false,
      });

      await startAndWaitReady(wrapper);

      const keydownCalls = addEventListenerSpy.mock.calls.filter(
        (call) => call[0] === 'keydown'
      );
      expect(keydownCalls).toHaveLength(0);

      wrapper.unmount();
      addEventListenerSpy.mockRestore();
    });

    it('should close tour on Escape key', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      // Tour should be visible
      expect(document.querySelector('[id$="-tooltip"]')).toBeTruthy();

      // Simulate Escape key
      const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(escapeEvent);

      await flushVue();

      // Tour should be hidden
      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('data-hidden')).toBe('true');

      wrapper.unmount();
    });

    it('should go to next step on ArrowRight key', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      let liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 1 of 3');

      // Simulate ArrowRight key
      const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      window.dispatchEvent(arrowEvent);

      await waitForStepTransition(wrapper);

      // Re-query the live region as it gets recreated with the new :key
      liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 2 of 3');

      wrapper.unmount();
    });

    it('should go to previous step on ArrowLeft key', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      const component = wrapper.vm as any;

      // Go to step 2
      await component.nextStep();
      await waitForStepTransition(wrapper);

      let liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 2 of 3');

      // Simulate ArrowLeft key
      const arrowEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      window.dispatchEvent(arrowEvent);

      await waitForStepTransition(wrapper);

      // Re-query the live region as it gets recreated with the new :key
      liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 1 of 3');

      wrapper.unmount();
    });

    it('should go to next step on Enter key', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      let liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 1 of 3');

      // Simulate Enter key
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      window.dispatchEvent(enterEvent);

      await waitForStepTransition(wrapper);

      // Re-query the live region as it gets recreated with the new :key
      liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion?.textContent).toContain('Step 2 of 3');

      wrapper.unmount();
    });

    it('should not trigger next step when Enter is pressed on a button', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      const initialStep = wrapper.vm.currentStepIndex;

      // Create a button and simulate Enter key on it
      const button = document.createElement('button');
      document.body.appendChild(button);
      
      const enterEventOnButton = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
      });
      
      Object.defineProperty(enterEventOnButton, 'target', {
        value: button,
        enumerable: true,
      });
      
      window.dispatchEvent(enterEventOnButton);
      await flushVue();

      // Should still be on the same step
      expect(wrapper.vm.currentStepIndex).toBe(initialStep);

      document.body.removeChild(button);
      wrapper.unmount();
    });

    it('should remove keyboard listener on unmount', async () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: true,
      });

      await startAndWaitReady(wrapper);

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        expect.any(Function)
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe('Focus Management', () => {
    it('should focus tooltip when tour starts with a11y enabled', async () => {
      const wrapper = mountVTour({
        steps,
        enableA11y: true,
      });

      const component = wrapper.vm as any;
      await component.startTour();
      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]') as HTMLElement;
      expect(document.activeElement).toBe(tooltip);

      wrapper.unmount();
    });

    it('should restore focus to previous element when tour ends', async () => {
      // Create a focusable element and focus it
      const button = document.createElement('button');
      button.id = 'test-button';
      button.textContent = 'Test';
      document.body.appendChild(button);
      button.focus();

      expect(document.activeElement).toBe(button);

      const wrapper = mountVTour({
        steps,
        enableA11y: true,
      });

      const component = wrapper.vm as any;
      await component.startTour();
      await startAndWaitReady(wrapper);

      // Focus should move to tooltip
      const tooltip = document.querySelector('[id$="-tooltip"]') as HTMLElement;
      expect(document.activeElement).toBe(tooltip);

      // End tour
      await component.stopTour();
      await flushVue();

      // Focus should be restored to button
      expect(document.activeElement).toBe(button);

      wrapper.unmount();
      button.remove();
    });
  });

  describe('Accessibility Configuration', () => {
    it('should enable all a11y features by default', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-modal')).toBe('true');
      expect(tooltip?.getAttribute('tabindex')).toBe('0');

      const liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion).toBeTruthy();

      wrapper.unmount();
    });

    it('should respect enableA11y: false to disable ARIA features', async () => {
      const wrapper = mountVTour({
        steps,
        autoStart: true,
        enableA11y: false,
      });

      await startAndWaitReady(wrapper);

      const tooltip = document.querySelector('[id$="-tooltip"]');
      expect(tooltip?.getAttribute('aria-modal')).toBeNull();
      expect(tooltip?.getAttribute('tabindex')).toBeNull();

      const liveRegion = document.querySelector(
        '[role="status"][aria-live="polite"]'
      );
      expect(liveRegion).toBeNull();

      wrapper.unmount();
    });

    it('should respect keyboardNav: false to disable keyboard shortcuts', async () => {
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

      const wrapper = mountVTour({
        steps,
        autoStart: true,
        keyboardNav: false,
      });

      await startAndWaitReady(wrapper);

      const keydownCalls = addEventListenerSpy.mock.calls.filter(
        (call) => call[0] === 'keydown'
      );
      expect(keydownCalls).toHaveLength(0);

      wrapper.unmount();
      addEventListenerSpy.mockRestore();
    });
  });
});
