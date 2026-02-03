export type Snip = {
    url: string;
    runOnPageLoad: boolean;
    fromText: string;
    untilClassName: string;
    snipAmount: number;
    currentPageSnipAmount: number;
    id: string;
}

export type StoredSnip = {
    [id: string]: Snip
};
