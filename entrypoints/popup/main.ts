interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;

let activeTab: globalThis.Browser.tabs.Tab;

const main = async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    if (!tabs) return;
    activeTab = tabs[0];
    if (!activeTab || !activeTab.url) return;
    // await deleteAllSnips();
    // await getSnipsForURL(activeTab.url);
}

main();

const prefillURL = (url: string) => {
    const urlInput = document.getElementById('url') as HTMLInputElement | null;
    if (urlInput) {
        urlInput.value = url;
    }
}


document.getElementById("snipBtn")?.addEventListener("click", async () => {

    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;

    if (!activeTab?.url || !activeTab.id) return;
    const submit: SubmitResponse = await browser.tabs.sendMessage(activeTab.id, {
        fromText,
        untilClassName
    })

    if (submit?.success) {
        updateSnipAmounts(submit)

        prefillURL(activeTab.url);
    }
})

document.getElementById('saveBtn')?.addEventListener('click', async () => {
    if (!activeTab?.url) return;

    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;
    const url = (document.getElementById('url') as HTMLInputElement).value;
    const runOnPageLoad = (document.getElementById('runOnPageLoad') as HTMLInputElement).checked;

    // TODO add validation
    if (fromText && untilClassName && url && runOnPageLoad) {
        const snip = {
            id: generateUniqueID(),
            url: url,
            fromText,
            untilClassName,
            runOnPageLoad: runOnPageLoad,
            snipAmount: 0, // TODO
        }
        await saveSnip(snip)
    }
})

const updateSnipAmounts = (submit: NonNullable<SubmitResponse>) => {
    const removedElementsDOM = document.getElementById("snippedAmount");
    if (removedElementsDOM) {
        removedElementsDOM.innerText = `${submit.removedElements}`;
    }
}


// remove

// types
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


// utils
export const getSnipsForURL = async (url: string) => {
    const allSnips = await getAllSnips();
    return allSnips.filter(matchingSnips(url));
}

export const matchingSnips = (givenUrl: string) => {
    const strippedGivenUrl = givenUrl.replace(/\/\*$/, ''); // Remove trailing /* if present

    return ({url}: Snip): boolean => {
        if (url === givenUrl) return true;

        if (url.endsWith('*')) {
            const baseUrl = url.slice(0, -1); // Remove the '*' character
            return strippedGivenUrl.startsWith(baseUrl);
        } else if (url.endsWith('/*')) {
            const baseUrl = url.slice(0, -2); // Remove the '/*' characters
            return strippedGivenUrl === baseUrl;
        }

        return false;
    };
}

// filesystem
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
