import {Snip} from "@/src/types";

const snippedElementsSetup = async (): Promise<void> => {
    const snippedElementsContainer = document.getElementById("snipsOnThisPageContainer") as HTMLElement;
    snippedElementsContainer.className = "snippedElements";

    const title = document.createElement("h6")
    title.innerText = "Snips on this page";

    const snipsOnThisPage = document.createElement("div");
    snipsOnThisPage.className = 'snipsOnThisPage';
    snipsOnThisPage.id = "snipsOnThisPage";

    snippedElementsContainer.appendChild(title);
    snippedElementsContainer.appendChild(snipsOnThisPage);
}

export const addSnipsForURL = async (snips: Snip[]) => {
    if (snips.length > 0) {
        await snippedElementsSetup();
        await addSnipCards(snips);
    }
}

const addSnipCards = async (snips: Snip[]): Promise<void> => {
    const container = document.getElementById("snipsOnThisPage") as HTMLElement;
    snips.forEach(snip => {
        const card = document.createElement("div");
        card.className = "snipCard";
        card.innerHTML = ` <div class="snipText">
                <p class="snipURL">${snip.url}</p>
                <p class="snipBackgroundText">Runs on page load</p>
                <p class="snipBackgroundText">Snipped <span class="snipBackgroundTextAmount">0</span></p>
            </div>
            <div class="snipActions">
                <div role="button" class="snipAction">✂️</div>
                <div role="button" class="snipAction">+</div>
            </div>`
        container.appendChild(card)
    })
}
