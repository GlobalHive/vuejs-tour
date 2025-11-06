import { mount } from '@vue/test-utils';
import VTour from '../../src/components/VTour.vue';

export function mountVTour(overrides: any = {}) {
  const base = {
    steps: overrides.steps ?? [{ target: 'body', content: 'x' }],
    autoStart: overrides.autoStart ?? true,
    enableA11y: overrides.enableA11y ?? true,
    keyboardNav: overrides.keyboardNav ?? true,
    // Zero all delays/durations
    startDelay: 0,
    teleportDelay: 0,
    resizeTimeout: 0,
    // Disable scrolling in tests to avoid timing issues with jump.js
    noScroll: overrides.noScroll ?? true,
  };
  return mount(VTour, {
    props: { ...base, ...overrides },
    attachTo: document.body,
  });
}
