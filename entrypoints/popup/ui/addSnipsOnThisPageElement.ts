import {Snip} from "@/src/types";
import {cardSnip} from "@/entrypoints/popup/logic/snipClicked";
import {addSnipExpandedElement, snipClosed} from "@/entrypoints/popup/ui/addSnipCardExpandedElement";

/**
 * Setups up the snipsOnThisPage element
 * @param snips
 */
export const addSnipsOnThisPage = async (snips: Snip[]) => {
    if (snips.length > 0) {
        await addSnipsOnThisPageContainerElement();
        await addSnipCardElements(snips);
    }
}

/**
 * Sets up the container for the 'Snips on this page' element.
 */
const addSnipsOnThisPageContainerElement = async (): Promise<void> => {
    const snippedElementsContainer = document.getElementById("snipsOnThisPageContainer") as HTMLElement;

    const title = document.createElement("h6")
    title.innerText = "Snips on this page";
    snippedElementsContainer.appendChild(title);

    const snipsOnThisPage = document.createElement("div");
    snipsOnThisPage.className = 'snips-on-this-page';
    snipsOnThisPage.id = "snipsOnThisPage";
    snippedElementsContainer.appendChild(snipsOnThisPage);
}

/**
 * Adds all the snip cards to the 'Snips on this page' container.
 * @param snips
 */
const addSnipCardElements = async (snips: Snip[]): Promise<void> => {
    const container = document.getElementById("snipsOnThisPage");
    if (container) {

        snips.forEach(snip => {
            const card = document.createElement("article");
            card.className = "snip-card";
            card.id = snip.id;
            card.innerHTML = ` 
            <div class="snips-on-this-page__content">
                <div class="content__snip-text">
                    <p class="snip-text__URL" id="snipURL">${snip.url}</p>
                    <p class="snip-text--background-text">${snip.runOnPageLoad ? "Runs on page load" : "Runs on Snip"}</p>
                    <p class="snip-text--background-text">Snipped <span id="${snip.id}-cardSnipAmount" class="background-text__amount">${snip.currentPageSnipAmount > 0 ? snip.currentPageSnipAmount : '-'}</span></p>
                </div>
                <div class="content__snip-actions">
                    <button class="snip-actions__action" id="snipBtn">✂️</button>
                    <button class="snip-actions__action" id="expandSnip">+</button>
                </div>
            </div>`

            const snipBtn = card.querySelector('#snipBtn');
            if (snipBtn) snipBtn.addEventListener("click", async () => cardSnip({cardSnip: snip}));

            const expandSnip: HTMLElement | null = card.querySelector('#expandSnip');
            if (expandSnip) expandSnip.addEventListener('click', async () => {
                if (expandSnip.innerText === "+") {
                    expandSnip.innerText = "-"
                    await addSnipExpandedElement(snip);
                } else {
                    expandSnip.innerText = "+"
                    snipClosed(snip);
                }
            })

            container.appendChild(card)
        })
    }
}

const removeSnipCardElements = () => {
    const snipCardsContainer = document.getElementById("snipsOnThisPage");
    if (snipCardsContainer) while (snipCardsContainer.firstChild) snipCardsContainer.removeChild(snipCardsContainer.firstChild);
}

export const updateSnipCardElements = async (snips: Snip[]) => {
    removeSnipCardElements();
    if (snips.length > 0) await addSnipCardElements(snips);
}
