import {getActiveTab} from "../../src/utils";
import {saveSnip} from "@/entrypoints/popup/saveSnip";
import {updateSnip} from "@/src/storage";
import {Snip} from "@/src/types";

// TODO set states per success
interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;


// handles snipCard & expandedSnip
export const cardSnip = async ({cardSnip}: { cardSnip: Snip }): Promise<void> => {
    const res = await snip({fromText: cardSnip.fromText, untilClassName: cardSnip.untilClassName});
    // TODO setup types per success so if success then removedElements exists
    if (res?.success && res?.removedElements) {
        const updatedSnip: Snip = {
            ...cardSnip,
            snipAmount: cardSnip.snipAmount + res.removedElements
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
    if (res?.success) {
        await saveSnip(res.url)

        // update DOM
        const addSnipAmount = document.getElementById('addSnipAmount');
        if (addSnipAmount) addSnipAmount.innerText = res.removedElements + '';

        // TODO update global snip values
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

    return {...submit, url: activeTab.url};
}
