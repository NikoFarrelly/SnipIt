import {Snip} from "@/src/types";
import {deleteSnips, getSnipById, updateSnip} from "@/src/storage";
import {cardSnip} from "@/entrypoints/popup/logic/snipClicked";

/**
 * Setups up the snipsOnThisPage element
 * @param snips
 */
export const addSnipsOnThisPage = async (snips: Snip[]) => {
    if (snips.length > 0) {
        await snippedElementsSetup();
        await addSnipCards(snips);
    }
}

/**
 * Setups up the container for snipped elements
 */
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

/**
 * Adds all the snips to the DOM.
 * @param snips
 */
const addSnipCards = async (snips: Snip[]): Promise<void> => {
    const container = document.getElementById("snipsOnThisPage") as HTMLElement;
    snips.forEach(snip => {
        const card = document.createElement("article");
        card.className = "snipCard";
        card.id = snip.id;
        card.innerHTML = ` 
            <div class="snipCardContent">
                <div class="snipText">
                    <p class="snipURL" id="snipURL">${snip.url}</p>
                    <p class="snipBackgroundText">${snip.runOnPageLoad ? "Runs on page load" : "Runs on Snip"}</p>
                    <p class="snipBackgroundText">Snipped <span id="${snip.id}-cardSnipAmount" class="snipBackgroundTextAmount">${snip.currentPageSnipAmount > 0 ? snip.currentPageSnipAmount : '-'}</span></p>
                </div>
                <div class="snipActions">
                    <button role="button" class="snipAction snipBtn" id="snipBtn">✂️</button>
                    <button class="snipAction expandSnip" id="expandSnip">+</button>
                </div>
            </div>`

        const snipBtn = card.querySelector('#snipBtn');
        if (snipBtn) snipBtn.addEventListener("click", async () => cardSnip({cardSnip: snip}));

        const expandSnip = card.getElementsByClassName('expandSnip')[0] as HTMLElement;
        expandSnip.addEventListener('click', async () => {
            if (expandSnip.innerText === "+") {
                expandSnip.innerText = "-"
                await snipExpanded(snip);
            } else {
                expandSnip.innerText = "+"
                await snipClosed(snip);
            }
        })

        container.appendChild(card)
    })
}

const snipClosed = async (snip: Snip): Promise<void> => {
    const expandedSnip = document.getElementById(snip.id + '-expanded');
    if (expandedSnip) expandedSnip.remove();

    const cardExpandSnip = document.getElementById('expandSnip');
    if (cardExpandSnip) {
        cardExpandSnip.innerText = "+"
    }
}

const snipRemoved = async (snip: Snip): Promise<void> => {
    await snipClosed(snip);

    const container = document.getElementById(snip.id);
    if (container) {
        container.remove();
    }
}


const snipExpanded = async (givenSnip: Snip): Promise<void> => {
    const container = document.getElementById(givenSnip.id) as HTMLElement;
    // get the latest snip value, as it may have changed from previous updates
    const snip = await getSnipById(givenSnip.id);
    if (!snip?.id) return;

    const snipExpanded = document.createElement("div");
    snipExpanded.id = snip.id + "-expanded";
    snipExpanded.innerHTML = `
        <div class="divider"></div>
        <div class="container-spacing item-gap">
            <h6>From element matching</h6>
            <div class="text-input">
                <label class="text-input__title" for="fromText">Text:</label>
                <input id="fromText" type="text" value="${snip.fromText}"/>
            </div>
        </div>


        <div class="container-spacing item-gap">
            <h6>Until element matching:</h6>
            <div class="text-input">
                <label class="text-input__title" for="untilClass">Class:</label>
                <input class="input" id="untilClass" type="text" value="${snip.untilClassName}"/>
            </div>
        </div>

        <div class="divider"></div>

        <div class="snip-container">
            <div class="snip-container__items button-container">
                <button class="primary-button" type="button" id="snipBtn">
                    Snip
                </button>
            </div>
            <div class="snip-container__items snip-container__info">
                <p>snipped</p>
                <p id="${snip.id}-expandedSnipAmount" class="info__amount">${snip.currentPageSnipAmount > 0 ? snip.currentPageSnipAmount : '-'}</p>
            </div>
        </div>
    </div>
    <div class="divider"></div>
    <div class="saveSnipContainer">
        <h6>Update this Snip?</h6>
        <div class="saveSnipInputs">
            <div class="text-input">
                <label class="text-input__title" for="url">URL:</label>
                <input class="input" id="url" type="text" value="${snip.url}"/>
            </div>
            <div class="urlInfo">
                <p>Matches path</p>
                <p>(* - wildcard)</p>
            </div>
            <div class="pageLoadContainer">
                <label for="runOnPageLoad">Run on page load:</label>
                <div class="checkBoxContainer">
                    <input id="runOnPageLoad" type="checkbox" ${snip.runOnPageLoad && 'checked'}/>
                </div>
            </div>

        </div>
        <div class="updateSnipButtonContainer">
            <button id="deleteBtn" class="tertiary-button updateSnipButton">Delete</button>
            <button id="updateBtn" class="primary-button updateSnipButton">Update</button>
        </div>
        <div class="divider"></div>
   `

    const snipBtn = snipExpanded.querySelector('#snipBtn');
    if (snipBtn) snipBtn.addEventListener("click", async () => {
        await cardSnip({cardSnip: snip});
    })

    const deleteButton = snipExpanded.querySelector('#deleteBtn') as HTMLElement;
    deleteButton.addEventListener('click', async () => {
        await deleteSnips(snip.id)
        await snipRemoved(snip);
    })

    const updateButton = snipExpanded.querySelector('#updateBtn') as HTMLElement;
    updateButton.addEventListener('click', async () => {

        const fromText = (snipExpanded.querySelector('#fromText') as HTMLInputElement)?.value;
        const untilClassName = (snipExpanded.querySelector('#untilClass') as HTMLInputElement)?.value;
        const runOnPageLoad = (snipExpanded.querySelector('#runOnPageLoad') as HTMLInputElement)?.checked;
        const url = (snipExpanded.querySelector('#url') as HTMLInputElement)?.value;

        const updatedSnip: Snip = {
            ...snip,
            fromText,
            untilClassName,
            url,
            runOnPageLoad,
        }

        await updateSnip(snip.id, updatedSnip)
        await snipClosed(snip);
    })

    container.appendChild(snipExpanded);
}
