import type { NanoPopPosition } from "nanopop";

export interface ITourStep {
    target: string;
    content: string;
    placement?: NanoPopPosition;
    onBefore?: () => Promise<void>;
    highlight?: boolean;
    backdrop?: boolean;
}