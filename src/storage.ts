import {Snip} from "./types";

const GLOBAL_STATE_KEY = 'globalState';

interface GlobalState {
    snipsAllTime: number;
}

export const getGlobalState = async (): Promise<GlobalState> => {
    const storedGlobalState = await browser.storage.local.get(GLOBAL_STATE_KEY);
    if (storedGlobalState?.[GLOBAL_STATE_KEY]) return storedGlobalState[GLOBAL_STATE_KEY] as GlobalState;

    const initGlobalState: GlobalState = {
        snipsAllTime: 0,
    }
    return initGlobalState;
}

export const setGlobalState = async (updatedGlobalState: GlobalState) => {
    const globalStateToSave = {[GLOBAL_STATE_KEY]: updatedGlobalState};
    await browser.storage.local.set(globalStateToSave);
}

/**
 * Returns all Snips
 * @Returns Snip[]
 */
export const getAllSnips = async (): Promise<Snip[]> => {
    const allSnips = [];
    const keys = (await browser.storage.local.getKeys()).filter(k => k !== GLOBAL_STATE_KEY)
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
