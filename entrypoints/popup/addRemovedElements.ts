import {getGlobalState} from "@/src/storage";

export const addRemovedElements = async () => {

    const snippedElementsContainer = document.getElementById("snippedElements") as HTMLElement;
    snippedElementsContainer.className = "snippedElements";

    const {snipsAllTime} = await getGlobalState();
    const snipsOnThisPage = '-'; // this is updated after init snips have run

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
export const updateSnipsAllTimeElement = (snipsAllTime: number): void => {
    const amount = document.getElementById('snippedTotalAmount');
    if (amount) amount.innerText = snipsAllTime + '';
}

