import {getGlobalState, updateSnipsAllTime} from "@/src/storage";
import {getActiveTab, getSnipsForURL} from "@/src/utils";

/**
 * Adds the 'Removed Elements' UI.
 */
export const addRemovedElements = async () => {
    const snippedElementsContainer = document.getElementById("snippedElements");

    if (snippedElementsContainer) {
        snippedElementsContainer.className = "removed-elements";

        const data = await getRemovedElementsData();
        if (!data) return undefined;
        const {snipsOnThisPage, snipsAllTime} = data;

        const snippedElements = document.createElement("div");
        snippedElements.innerHTML = `
        <h6>Removed elements</h6>
        <div class="removed-elements-container">
            <div class="removed-elements-container__item">
                <p>on this page</p>
                <p class="removed-elements-container__item--amount" id="snippedPageAmount">${snipsOnThisPage > 0 ? snipsOnThisPage : '-'}</p>
            </div>
            <div class="removed-elements-container__item">
                <p>in total</p>
                <p class="removed-elements-container__item--amount" id="snippedTotalAmount">${snipsAllTime}</p>
            </div>
        </div>
   `
        snippedElementsContainer.appendChild(snippedElements);
    }
}

/**
 * Retrieves data for the 'Removed Elements' UI
 */
const getRemovedElementsData = async (): Promise<{ snipsAllTime: number, snipsOnThisPage: number } | null> => {
    const {snipsAllTime} = await getGlobalState();
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return null;

    const snipsForThisURL = await getSnipsForURL(activeTab.url);
    snipsForThisURL.filter(s => s.runOnPageLoad);
    const snipsOnThisPage = snipsForThisURL.reduce((prev, curr) => prev + curr.currentPageSnipAmount, 0)

    return {snipsAllTime, snipsOnThisPage};
}

/**
 * Updates both the UI and the global state.
 * @param snippedElements
 */
export const updateAllTimeAndPageSnips = async (snippedElements: number): Promise<void> => {
    await updateSnipsAllTime(snippedElements);
    updateOnThisPageSnipsElement(snippedElements);
}

/**
 * Updates the 'on this page' snips amount.
 * @param snipsOnThisPageAmount
 */
export const updateOnThisPageSnipsElement = (snipsOnThisPageAmount: number): void => {
    const amount = document.getElementById('snippedPageAmount');

    if (amount) {
        const amountNumber = isNaN(Number(amount.innerText)) ? 0 : Number(amount.innerText);
        amount.innerText = String(amountNumber + snipsOnThisPageAmount)
    }
}

/**
 * updates the 'all time snips' amount.
 * @param snipsAllTime
 */
export const updateSnipsAllTimeElement = (snipsAllTime: number): void => {
    const amount = document.getElementById('snippedTotalAmount');
    if (amount) amount.innerText = snipsAllTime + '';
}
