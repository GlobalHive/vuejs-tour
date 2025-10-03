import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Mock nanopop to avoid real DOM positioning
vi.mock('nanopop', () => ({
  createPopper: vi.fn(() => ({
    update: vi.fn(() => 'right'),
    destroy: vi.fn(),
  })),
}));

// Mock jump.js if still used
vi.mock('jump.js', () => ({
  default: vi.fn(() => Promise.resolve()),
}));

// Global test setup
beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Reset all mocks
  vi.clearAllMocks();

  // Clean up DOM
  document.body.innerHTML = '';
  document.head.innerHTML = '';
});

// Mock scrollTo for smooth scrolling tests
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  bottom: 100,
  right: 100,
  x: 0,
  y: 0,
  toJSON: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '0px';
  thresholds = [0];
  takeRecords = vi.fn(() => []);
};

// Mock ResizeObserver
global.ResizeObserver = class {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
};
