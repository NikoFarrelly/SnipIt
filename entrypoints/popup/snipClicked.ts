import {getActiveTab} from "../../src/utils";
import {addSaveSnipElement} from "@/entrypoints/popup/addSaveSnipElement";
import {updateSnip} from "@/src/storage";
import {Snip} from "@/src/types";
import {updateAllTimeAndPageSnips} from "@/entrypoints/popup/addRemovedElements";

// TODO set states per success
interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;

/**
 * Executes snip which run on load.
 * Takes the snip to run.
 * @param initSnip
 *
 * Returns the number of removed elements.
 * @return number
 */
export const initSnip = async ({initSnip}: { initSnip: Snip }): Promise<number> => {
    const res = await snip({fromText: initSnip.fromText, untilClassName: initSnip.untilClassName})
    if (res?.success && res?.removedElements) {
        const updatedSnip = {
            ...initSnip,
            removedElements: initSnip.snipAmount + res.removedElements,
            currentPageSnipAmount: res.removedElements,
        }
        await updateSnip(initSnip.id, updatedSnip)
        return res.removedElements;
    }
    return 0;
}

// handles snipCard & expandedSnip
export const cardSnip = async ({cardSnip}: { cardSnip: Snip }): Promise<void> => {
    const res = await snip({fromText: cardSnip.fromText, untilClassName: cardSnip.untilClassName});
    // TODO setup types per success so if success then removedElements exists
    if (res?.success && res?.removedElements) {
        const updatedSnip: Snip = {
            ...cardSnip,
            snipAmount: cardSnip.snipAmount + res.removedElements,
            currentPageSnipAmount: res.removedElements,
        }
        await updateSnip(cardSnip.id, updatedSnip)

        // update DOM
        const cardSnipAmount = document.getElementById(cardSnip.id + '-cardSnipAmount');
        if (cardSnipAmount) cardSnipAmount.innerText = res.removedElements + '';

        const expandedCardSnipAmount = document.getElementById(cardSnip.id + '-expandedSnipAmount');
        if (expandedCardSnipAmount) expandedCardSnipAmount.innerText = res.removedElements + '';

        // TODO update global snip values
    }
}

// handles addSnipElement
export const addSnip = async () => {
    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;

    const res = await snip({fromText: fromText, untilClassName: untilClassName});
    // TODO add types for success
    if (res?.success && res?.removedElements) {
        const saveSnipElement = document.getElementById('saveSnip');
        if (!saveSnipElement) await addSaveSnipElement(res.url)

        // update DOM
        const addSnipAmount = document.getElementById('addSnipAmount');
        if (addSnipAmount) addSnipAmount.innerText = res.removedElements + '';
    }
}

const snip = async ({fromText, untilClassName}: {
    fromText: string,
    untilClassName: string,
}) => {
    const activeTab = await getActiveTab();
    if (!activeTab?.url || !activeTab?.id) return;

    const submit: SubmitResponse = await browser.tabs.sendMessage(activeTab.id, {
        fromText,
        untilClassName
    })

    if (submit?.success) await updateAllTimeAndPageSnips(submit.removedElements)

    return {...submit, url: activeTab.url};
}
