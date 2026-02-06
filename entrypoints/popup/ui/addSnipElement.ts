import {Snip} from "@/src/types";
import {addSnip} from "@/entrypoints/popup/logic/snipClicked";

export const addSnipElement = (snip?: Snip) => {
    const addSnipDetails = document.getElementById('addSnipDetails');

    if (addSnipDetails) {
        const addSnipContainer = document.createElement("div");
        addSnipContainer.id = "addSnip"
        addSnipContainer.className = 'add-snip'
        addSnipContainer.innerHTML = `
    <div class="divider"></div>

    <div class="container-spacing item-gap">
        <h6>From element matching</h6>
        <div class="text-input">
            <label class="text-input__title" for="fromText">Text:</label>
            <input id="fromText" type="text" value="${snip?.fromText ?? ''}"/>
        </div>
    </div>

    <div class="container-spacing item-gap">
        <h6>Until element matching:</h6>
        <div class="text-input">
            <label class="text-input__title" for="untilClass">Class:</label>
            <input id="untilClass" type="text" value="${snip?.untilClassName ?? ''}"/>
        </div>
    </div>

    <div class="divider"></div>

    <div class="snip-container">
        <div class="snip-container__items">
            <button class="primary-button" type="button" id="snipBtn">
                Snip
            </button>
        </div>
        <div class="snip-container__items snip-container__info">
            <p>snipped</p>
            <p id="${snip?.id ? snip.id + '-' : ''}addSnipAmount" class="info__amount">${snip?.snipAmount && snip.snipAmount > 0 ? snip.snipAmount : '-'}</p>
        </div>
    </div>
    <div class="divider"></div>
        `

        const snipButton = addSnipContainer.querySelector('#snipBtn');
        if (snipButton) snipButton.addEventListener('click', addSnip)

        addSnipDetails.appendChild(addSnipContainer);
    }
}

export const updateAddSnipAmount = (snipAmount: number) => {
    const addSnipAmount = document.getElementById('addSnipAmount');
    if (addSnipAmount) addSnipAmount.innerText = snipAmount + '';
}

export const closeAddSnipElement = () => {
    const addSnipDetails = document.getElementById("addSnipDetails") as HTMLDetailsElement;
    if (addSnipDetails) {
        addSnipDetails.open = false;
    }
}

export const openAddSnipElement = () => {
    const addSnipDetails = document.getElementById("addSnipDetails") as HTMLDetailsElement;
    if (addSnipDetails) {
        addSnipDetails.open = true;
    }
}
