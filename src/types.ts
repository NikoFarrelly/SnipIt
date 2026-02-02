export type Snip = {
    url: string,
    runOnPageLoad: boolean,
    fromText: string,
    untilClassName: string,
    snipAmount: number
    id: string;
}

export type StoredSnip = {
    [id: string]: Snip
};
