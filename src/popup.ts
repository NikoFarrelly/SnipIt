interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;

let activeTab: browser.tabs.Tab;

const main = async () => {

    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    if (!tabs) return;
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.url) return;

    prefillURL(activeTab.url);
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

    if (!activeTab?.id) return;


    const submit: SubmitResponse = await browser.tabs.sendMessage(activeTab.id, {
        fromText,
        untilClassName
    })

    if (submit?.success) {
        const {removedElements} = submit;
        const removedElementsDOM = document.getElementById("snippedAmount");
        if (removedElementsDOM) {
            removedElementsDOM.innerText = `${removedElements}`;
        }
    }
})
