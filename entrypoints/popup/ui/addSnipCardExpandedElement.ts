import {Snip} from "@/src/types";
import {deleteSnips, getSnipById, updateSnip} from "@/src/storage";
import {cardSnip} from "@/entrypoints/popup/logic/snipClicked";

export const addSnipExpandedElement = async (givenSnip: Snip): Promise<void> => {
    const container = document.getElementById(givenSnip.id) as HTMLElement;
    // get the latest snip value, as it may have changed from previous updates.
    const snip = await getSnipById(givenSnip.id);
    if (!snip?.id) return;

    const snipExpanded = document.createElement("div");
    snipExpanded.id = snip.id + "-expanded";
    snipExpanded.innerHTML = `
        <div class="divider"></div>
        <div class="container-spacing item-gap">
            <h6>From element matching</h6>
            <div class="text-input">
                <label class="text-input__label" for="fromText">Text:</label>
                <input id="fromText" type="text" value="${snip.fromText}"/>
            </div>
        </div>

        <div class="container-spacing item-gap">
            <h6>Until element matching:</h6>
            <div class="text-input">
                <label class="text-input__label" for="untilClass">Class:</label>
                <input class="input" id="untilClass" type="text" value="${snip.untilClassName}"/>
            </div>
        </div>

        <div class="divider"></div>

        <div class="add-snip__actions">
            <div class="add-snip__action-item">
                <button class="button--primary" type="button" id="snipBtn">
                    Snip
                </button>
            </div>
            <div class="add-snip__action-item add-snip__action-item--info">
                <p>snipped</p>
                <p id="${snip.id}-expandedSnipAmount" class="info__amount">${snip.currentPageSnipAmount > 0 ? snip.currentPageSnipAmount : '-'}</p>
            </div>
        </div>
        
    </div>
    
    <div class="divider"></div>
    
    <div class="save-snip">
        <h6>Update this Snip?</h6>
        <div class="save-snip__inputs">
        
            <div class="text-input">
                <label class="text-input__label" for="url">URL:</label>
                <input class="input" id="url" type="text" value="${snip.url}"/>
            </div>
            <div class="save-snip__url-info">
                <p>Matches path</p>
                <p>(* - wildcard)</p>
            </div>
            <div class="save-snip__page-load">
                <label for="runOnPageLoad">Run on page load:</label>
                    <input id="runOnPageLoad" type="checkbox" ${snip.runOnPageLoad && 'checked'}/>
            </div>

        </div>
        
        <div class="save-snip__actions">
            <button id="deleteBtn" class="button--tertiary actions__button">Delete</button>
            <button id="updateBtn" class="button--primary actions__button">Update</button>
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
        snipRemoved(snip);
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
        snipClosed(snip);
    })

    container.appendChild(snipExpanded);
}

/**
 * Given Snip it's card is found & closed.
 * @param snip
 */
export const snipClosed = (snip: Snip): void => {
    const expandedSnip = document.getElementById(snip.id + '-expanded');
    if (expandedSnip) expandedSnip.remove();

    const cardExpandSnip = document.getElementById('expandSnip');
    if (cardExpandSnip) {
        cardExpandSnip.innerText = "+"
    }
}

/**
 * Given Snip it's card is found & removed.
 * @param snip
 */
const snipRemoved = (snip: Snip): void => {
    snipClosed(snip);

    const container = document.getElementById(snip.id);
    if (container) container.remove();
}

export const updateExpandedSnipAmount = (id: string, amount: string) => {
    const expandedCardSnipAmount = document.getElementById(id + '-expandedSnipAmount');
    if (expandedCardSnipAmount) expandedCardSnipAmount.innerText = amount;
}
