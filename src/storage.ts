import {Snip} from "./types";

export const getAllSnips = async (): Promise<Snip[]> => {
    const allSnips = [];
    const keys = await browser.storage.local.getKeys()
    for await (const key of keys) {
        const storedSnip = await browser.storage.local.get(key)
        if (storedSnip) {
            const parsedData = JSON.parse(<string>storedSnip[key])
            if (parsedData) allSnips.push(parsedData);
        }
    }
    return allSnips;
}

export const getSnipById = async (id: string): Promise<Snip | null> => {

    const storedSnip = await browser.storage.local.get(id)
    if (storedSnip) return JSON.parse(<string>storedSnip[id]);

    return null;
}

export const saveSnip = async (snip: Snip) => {
    const snipToSave = {[snip.id]: JSON.stringify(snip)}
    await browser.storage.local.set(snipToSave);
}

export const updateSnip = async (id: string, updatedData: Snip) => {
    const stringifiedData = {[id]: JSON.stringify(updatedData)}
    await browser.storage.local.set(stringifiedData);
}

export const deleteSnips = async (id: string | string[]) => await browser.storage.local.remove(id)
export const deleteAllSnips = async () => browser.storage.local.clear();

/**
 * Ensures a unique ID.
 * @Returns string
 */
export const generateUniqueID = (): string => {
    const allSnips = getAllSnips();
    const uniqueIDs = Object.keys(allSnips);
    let id = generateID();
    while (uniqueIDs.includes(id)) {
        id = generateID()
    }
    return id;
}

/**
 * Generates an ID with a length of 8.
 * @Returns string
 */
const generateID = (): string => {
    const idLength = 8;
    return Math.random().toString(36).substring(2, idLength + 2);
}
