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
  
  // Create a mount point that doesn't interfere with target elements
  const mountPoint = document.createElement('div');
  mountPoint.id = 'vtour-mount';
  document.body.appendChild(mountPoint);
  
  return mount(VTour, {
    props: { ...base, ...overrides },
    attachTo: mountPoint,
    global: {
      stubs: {
        Teleport: false, // Don't stub Teleport
      },
    },
  });
}
