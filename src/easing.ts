// Robert Penner's easing functions
// Credit: http://robertpenner.com/easing/
// Ported for ES6 from: https://github.com/jaxgeller/ez.js

export type EasingFunction = (
  t: number,
  b: number,
  c: number,
  d: number
) => number;

// Quadratic
export const easeInQuad: EasingFunction = (t, b, c, d) => {
  t /= d;
  return c * t * t + b;
};

export const easeOutQuad: EasingFunction = (t, b, c, d) => {
  t /= d;
  return -c * t * (t - 2) + b;
};

export const easeInOutQuad: EasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

// Cubic
export const easeInCubic: EasingFunction = (t, b, c, d) => {
  t /= d;
  return c * t * t * t + b;
};

export const easeOutCubic: EasingFunction = (t, b, c, d) => {
  t /= d;
  t--;
  return c * (t * t * t + 1) + b;
};

export const easeInOutCubic: EasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};

// Quartic
export const easeInQuart: EasingFunction = (t, b, c, d) => {
  t /= d;
  return c * t * t * t * t + b;
};

export const easeOutQuart: EasingFunction = (t, b, c, d) => {
  t /= d;
  t--;
  return -c * (t * t * t * t - 1) + b;
};

export const easeInOutQuart: EasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t * t + b;
  t -= 2;
  return (-c / 2) * (t * t * t * t - 2) + b;
};

// Quintic
export const easeInQuint: EasingFunction = (t, b, c, d) => {
  t /= d;
  return c * t * t * t * t * t + b;
};

export const easeOutQuint: EasingFunction = (t, b, c, d) => {
  t /= d;
  t--;
  return c * (t * t * t * t * t + 1) + b;
};

export const easeInOutQuint: EasingFunction = (t, b, c, d) => {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t * t * t + 2) + b;
};

// Map of easing function names to implementations
export const easingFunctions: Record<string, EasingFunction> = {
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
};
