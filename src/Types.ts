import type { NanoPopPosition } from "nanopop";

export interface ITourStep {
    target: string;
    content: string;
    placement?: NanoPopPosition;
    highlight?: boolean;
    backdrop?: boolean;
}