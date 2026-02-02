import {getActiveTab} from "../../src/utils";
import {generateUniqueID, saveSnip} from "../../src/storage";

export const saveClicked = async () => {
    const activeTab = await getActiveTab();
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
}
