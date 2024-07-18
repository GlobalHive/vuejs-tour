import type { NanoPopPosition } from "nanopop";

export interface ITourStep {
    target: string;
    content: string;
    placement?: NanoPopPosition;
    onBefore?: () => Promise<void>;
    onAfter?: () => Promise<void>;
    highlight?: boolean;
    backdrop?: boolean;
}