import {Snip} from "@/src/types";
import {getAllSnips, getGlobalState, setGlobalState, updateSnip} from "@/src/storage";
import {removeElements} from "@/entrypoints/content/removeElements";
import {updateSnipsAllTimeElement} from "@/entrypoints/popup/ui/addRemovedElements";

/**
 * Given URL returns all matching snips.
 * @param url
 * @returns Snip[]
 */
export const getSnipsForURL = async (url: string): Promise<Snip[]> => {
    const allSnips = await getAllSnips();
    return allSnips.filter(matchingSnips(url));
}

/**
 * Filter func which returns snips that match the provided URL.
 * @param givenUrl
 */
const matchingSnips = (givenUrl: string): ({url}: Snip) => boolean => {
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


/**
 * Reset 'currentPageSnipAmount' of snips to 0.
 * 'currentPageSnipAmount' is a transient value that should be lost on reloading a page.
 * @param snips
 */
export const resetCurrentPageSnipAmount = async (snips: Snip[]) => {
    for (const snip of snips) await updateSnip(snip.id, {...snip, currentPageSnipAmount: 0});
}

/**
 * Executes snips which run on load and updates their 'currentPageSnipAmount'.
 * @param snips
 */
export const runSnipsOnLoad = async (snips: Snip[]) => {
    for (const snip of snips) {
        const {removedElements} = removeElements({
            fromText: snip.fromText,
            untilClassName: snip.untilClassName
        });
        if (removedElements > 0) {
            const updatedSnip: Snip = {
                ...snip,
                snipAmount: snip.snipAmount + removedElements,
                currentPageSnipAmount: removedElements,
            }
            await Promise.all([updateSnip(snip.id, updatedSnip), updateSnipsAllTime(removedElements)])
        } else if (snip.currentPageSnipAmount > 0) {
            await updateSnip(snip.id, {...snip, currentPageSnipAmount: 0})
        }
    }
}

/**
 * Updates global stats for total snipped elements & related UI.
 * @param snippedElements
 */
export const updateSnipsAllTime = async (snippedElements: number): Promise<void> => {
    const currGlobalState = await getGlobalState();
    const updatedSnipsAllTime = currGlobalState.snipsAllTime + snippedElements
    const updatedGlobalState = {
        ...currGlobalState,
        snipsAllTime: currGlobalState.snipsAllTime + snippedElements,
    }
    await setGlobalState(updatedGlobalState);
    updateSnipsAllTimeElement(updatedSnipsAllTime);
}
