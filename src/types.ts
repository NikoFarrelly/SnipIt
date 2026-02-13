import {RemoveElementsResponse} from "@/entrypoints/content/removeElements";

export type Snip = {
    url: string;
    runOnPageLoad: boolean;
    fromText: string;
    untilClassName: string;
    snipAmount: number;
    currentPageSnipAmount: number;
    id: string;
}

export type SnipClickResult = SnipClickFailure | SnipClickSuccess;

export interface SnipClickFailure {
    success: false;
    error: string;
}

export interface SnipClickSuccess extends RemoveElementsResponse {
    success: true;
}

export interface SnipClickResponse extends RemoveElementsResponse {
    success: boolean;
}
