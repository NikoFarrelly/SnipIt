import {getActiveTab, getSnipsForURL} from "../../../src/utils";
import {generateUniqueID, saveSnip} from "../../../src/storage";
import {Snip} from "@/src/types";
import {updateSnipCardElements} from "@/entrypoints/popup/ui/addSnipsOnThisPageElement";
import {resetAndCloseAddSnipElement} from "@/entrypoints/popup/ui/addSnipElement";
import {resetSaveSnipElement} from "@/entrypoints/popup/ui/addSaveSnipElement";

export const saveClicked = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab?.url) return;

    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;
    const url = (document.getElementById('url') as HTMLInputElement).value;
    const runOnPageLoad = (document.getElementById('runOnPageLoad') as HTMLInputElement).checked;
    const snippedAmount = (document.getElementById("addSnipAmount") as HTMLParagraphElement);
    const parsedAmount = snippedAmount?.innerText ? parseInt(snippedAmount.innerText) : 0;

    if (fromText && untilClassName && url) {
        const snip: Snip = {
            id: generateUniqueID(),
            url: url,
            fromText,
            untilClassName,
            runOnPageLoad: runOnPageLoad,
            snipAmount: parsedAmount,
            currentPageSnipAmount: parsedAmount,
        }
        await saveSnip(snip)
        resetAndCloseAddSnipElement();
        resetSaveSnipElement();
        const snipsForThisURL = await getSnipsForURL(activeTab.url);
        await updateSnipCardElements(snipsForThisURL);
    }
}
