import {getActiveTab, getSnipsForURL} from "../../../src/utils";
import {generateUniqueID, saveSnip} from "../../../src/storage";
import {Snip} from "@/src/types";
import {snipClosed} from "@/entrypoints/popup/ui/addSnipCardExpandedElement";
import {updateSnipCardElements} from "@/entrypoints/popup/ui/addSnipsOnThisPageElement";
import {closeAddSnipElement} from "@/entrypoints/popup/ui/addSnipElement";

export const saveClicked = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab?.url) return;

    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;
    const url = (document.getElementById('url') as HTMLInputElement).value;
    const runOnPageLoad = (document.getElementById('runOnPageLoad') as HTMLInputElement).checked;

    // TODO add validation
    if (fromText && untilClassName && url) {
        const snip: Snip = {
            id: generateUniqueID(),
            url: url,
            fromText,
            untilClassName,
            runOnPageLoad: runOnPageLoad,
            snipAmount: 0, // TODO
            currentPageSnipAmount: 0, // TODO
        }
        await saveSnip(snip)
        closeAddSnipElement();
        const snipsForThisURL = await getSnipsForURL(activeTab.url);
        await updateSnipCardElements(snipsForThisURL);
    }
}
