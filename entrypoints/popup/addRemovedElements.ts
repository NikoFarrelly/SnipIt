import {getSnipsForURL} from "@/src/utils";
import {getAllSnips} from "@/src/storage";

export const addRemovedElements = async (currentURL: string) => {

    const snippedElementsContainer = document.getElementById("snippedElements") as HTMLElement;
    snippedElementsContainer.className = "snippedElements";

    const snipsOnThisPage = (await getSnipsForURL(currentURL)).filter(s => s.runOnPageLoad).reduce((acc, curr) => acc + curr.snipAmount, 0)
    const snipsAllTime = (await getAllSnips()).reduce((acc, curr) => acc + curr.snipAmount, 0);

    const snippedElements = document.createElement("div");
    snippedElements.innerHTML = `
        <h6>Removed elements</h6>
        <div class="snippedElementsContainer">
            <div class="snippedElementsItem">
                <p>on this page</p>
                <p class="snippedPageAmount snippedAmount" id="snippedPageAmount">${snipsOnThisPage}</p>
            </div>
            <div class="snippedElementsItem">
                <p>in total</p>
                <p class="snippedTotalAmount snippedAmount" id="snippedTotalAmount">${snipsAllTime}</p>
            </div>
        </div>
   `

    snippedElementsContainer.appendChild(snippedElements);
}

export const updateOnThisPageSnips = (snipsOnThisPageAmount: number): void => {
    const amount = document.getElementById('snippedPageAmount');
    if (amount) amount.innerText = snipsOnThisPageAmount + '';
}
export const updateSnipsAllTime = (snipsAllTime: number): void => {
    const amount = document.getElementById('snippedTotalAmount');
    if (amount) amount.innerText = snipsAllTime + '';
}

