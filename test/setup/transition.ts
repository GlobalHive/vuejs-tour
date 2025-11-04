import { defineComponent, nextTick } from 'vue';
import { config } from '@vue/test-utils';

// A Transition stub that fires hooks immediately on the real element
const ImmediateTransition = defineComponent({
  name: 'ImmediateTransition',
  setup(_, { slots, attrs }) {
    return () => {
      const vnode = slots.default?.();
      // Deliver hooks on nextTick when the element is in the DOM
      nextTick(() => {
        // Try to find the element rendered by this Transition
        const el =
          document.querySelector('[id$="-tooltip"]') ??
          document.body.querySelector('[data-tour-root]') ??
          document.body.querySelector('[data-test-transition-target]');

        // Call hooks if present (Vue passes them as props like onBeforeEnter)
        // @ts-ignore - attrs carries onBeforeEnter/onEnter/onAfterEnter
        attrs.onBeforeEnter?.(el);
        // @ts-ignore
        if (attrs.onEnter) {
          // Vue enter hook receives (el, done)
          // @ts-ignore
          attrs.onEnter(el, () => {});
        }
        // @ts-ignore
        attrs.onAfterEnter?.(el);
      });
      return vnode as any;
    };
  },
});

config.global.stubs = {
  Transition: ImmediateTransition,
  TransitionGroup: {
    render() {
      return (this as any).$slots.default?.();
    },
  },
};
