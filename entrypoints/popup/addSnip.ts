import {Snip} from "@/src/types";
import {snipClicked} from "@/entrypoints/popup/snipClicked";

export const addSnip = (snip?: Snip) => {

    const addSnipContainer = document.getElementById('addSnipContainer');

    if (addSnipContainer) {
        const addSnip = document.createElement("div");
        addSnip.id = "addSnip"
        addSnip.innerHTML = `
    <div class="divider"></div>

    <div class="container-spacing itemGap">
        <h6>From element matching</h6>
        <div class="inputContainer">
            <label class="inputTitle" for="fromText">Text:</label>
            <input id="fromText" type="text" value="${snip?.fromText ?? ''}"/>
        </div>
    </div>


    <div class="container-spacing itemGap">
        <h6>Until element matching:</h6>
        <div class="inputContainer">
            <label class="inputTitle" for="untilClass">Class:</label>
            <input class="input" id="untilClass" type="text" value="${snip?.untilClassName ?? ''}"/>
        </div>
    </div>

    <div class="divider"></div>

    <div class="snipContainer">
        <div class="snipContainerItems buttonContainer">
            <button class="primaryButton" type="button" id="snipBtn">
                Snip
            </button>
        </div>
        <div class="snipContainerItems snipContainerInfo">
            <p>snipped</p>
            <p id="snippedAmount" class="snipContainerAmount">${snip?.snipAmount ?? '-'}</p>
        </div>
    </div>
    <div class="divider"></div>
        `

        const snipButton = addSnip.querySelector('#snipBtn');
        if (snipButton) {
            snipButton.addEventListener('click', snipClicked)
        }

        addSnipContainer.appendChild(addSnip);
    }
}


// TODO snipBtn is disabled until from/until is fulfilled
// TODO should I swap to using a form?
// TODO need to set a format to functions which add an element, something like 'add{ElementName}', or '{elementName}Element'
