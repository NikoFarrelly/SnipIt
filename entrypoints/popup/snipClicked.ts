import {getActiveTab} from "../../src/utils";


interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;


export const snipClicked = async () => {

    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;
    const activeTab = await getActiveTab();
    if (!activeTab?.url || !activeTab?.id) return;
    const submit: SubmitResponse = await browser.tabs.sendMessage(activeTab.id, {
        fromText,
        untilClassName
    })

    if (submit?.success) {
        updateSnipAmounts(submit)
        prefillURL(activeTab.url);
    }
}


const updateSnipAmounts = (submit: NonNullable<SubmitResponse>) => {
    const removedElementsDOM = document.getElementById("snippedAmount");
    if (removedElementsDOM) {
        removedElementsDOM.innerText = `${submit.removedElements}`;
    }
}

const prefillURL = (url: string) => {
    const urlInput = document.getElementById('url') as HTMLInputElement | null;
    if (urlInput) {
        urlInput.value = url;
    }
}
