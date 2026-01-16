import '@testing-library/jest-dom';
import { beforeAll, beforeEach, vi } from 'vitest';
import * as sass from 'sass';
import * as fs from 'fs';
import * as path from 'path';

// Compile SCSS once before all tests
let compiledCSS = '';
beforeAll(() => {
  const scssPath = path.resolve(__dirname, '../src/style/style.scss');
  const scssContent = fs.readFileSync(scssPath, 'utf-8');
  const compiled = sass.compileString(scssContent, {
    loadPaths: [path.resolve(__dirname, '../src/style')],
  });
  compiledCSS = compiled.css;
});

// Mock nanopop to avoid real DOM positioning
vi.mock('nanopop', () => ({
  createPopper: vi.fn(() => ({
    update: vi.fn(() => 'right'),
    destroy: vi.fn(),
  })),
}));

// Mock jump.js - it takes options with a callback
vi.mock('jump.js', () => ({
  default: vi.fn((target: any, options: any) => {
    // Call the callback immediately if provided
    if (options && options.callback) {
      options.callback();
    }
  }),
}));

// Global test setup
beforeEach(() => {
  // Clear localStorage before each test
  localStorage.clear();

  // Reset all mocks
  vi.clearAllMocks();

  // Clean up DOM but ensure body exists for Teleport
  if (document.body) {
    document.body.innerHTML = '';
  } else {
    const body = document.createElement('body');
    document.documentElement.appendChild(body);
  }
  if (document.head) {
    document.head.innerHTML = '';
  } else {
    const head = document.createElement('head');
    document.documentElement.insertBefore(head, document.body);
  }
  
  // Re-inject compiled CSS for each test
  if (compiledCSS) {
    const style = document.createElement('style');
    style.textContent = compiledCSS;
    document.head.appendChild(style);
  }
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
