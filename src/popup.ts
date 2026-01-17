interface SubmitResponseProps {
    removedElements: number;
    matchedElements: number;
    success: boolean;
}

type SubmitResponse = null | SubmitResponseProps;

document.getElementById("submitBtn")?.addEventListener("click", async () => {

    // const fromClassName = (document.getElementById("fromClass") as HTMLInputElement).value;
    const fromText = (document.getElementById("fromText") as HTMLInputElement).value;

    // const untilText = (document.getElementById("untilText") as HTMLInputElement).value;
    const untilClassName = (document.getElementById("untilClass") as HTMLInputElement).value;


    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    if (!tabs) return;
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.id) return;

    const submit: SubmitResponse = await browser.tabs.sendMessage(activeTab.id, {
        // fromClassName,
        fromText,
        // untilText,
        untilClassName
    })
    if (submit?.success) {
        const {removedElements} = submit;
        const removedElementsDOM = document.getElementById("removedElements");
        if (removedElementsDOM) {
            removedElementsDOM.innerText = `${removedElements}`;
        }
    }
})
