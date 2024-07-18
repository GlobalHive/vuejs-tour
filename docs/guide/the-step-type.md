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
    noScroll?: boolean; // Disable scrolling if set
}
```