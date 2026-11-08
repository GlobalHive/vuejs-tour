# The Step Type

The Step type is `ITourStep` and it has the following properties:

```typescript
export interface ITourStep {
    target: string; // The target element to attach the step to
    content: string; // The content of the step
    placement?: NanoPopPosition; // The placement of the step
    onBefore?: () => Promise<void>; // Called before the step is shown
    onAfter?: () => Promise<void>; // Called after the step is shown
    highlight?: boolean; // Highlight the target element
    backdrop?: boolean; // Show a backdrop if set
    enabled?: boolean; // Include the step in the tour (defaults to true)
    noScroll?: boolean; // Disable scrolling if set
}
```

Use `enabled` to conditionally include a step in the tour. Disabled steps are skipped during navigation:

```typescript
const shouldShowAccountStep = await loadAccountStatus();
const steps = [
    { target: '#welcome', content: 'Welcome!' },
    {
        target: '#account',
        content: 'Review your account',
        enabled: shouldShowAccountStep,
    },
];
```
