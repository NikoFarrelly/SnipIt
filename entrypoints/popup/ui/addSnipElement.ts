import {Snip} from "@/src/types";
import {addSnip} from "@/entrypoints/popup/logic/snipClicked";

export const addSnipElement = (snip?: Snip) => {

    const addSnipDetails = document.getElementById('addSnipDetails');

    if (addSnipDetails) {
        const addSnipContainer = document.createElement("div");
        addSnipContainer.id = "addSnip"
        addSnipContainer.innerHTML = `
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
            <p id="${snip?.id ? snip.id + '-' : ''}addSnipAmount" class="snipContainerAmount">${snip?.snipAmount && snip.snipAmount > 0 ? snip.snipAmount : '-'}</p>
        </div>
    </div>
    <div class="divider"></div>
        `

        const snipButton = addSnipContainer.querySelector('#snipBtn');
        if (snipButton) snipButton.addEventListener('click', addSnip)

        addSnipDetails.appendChild(addSnipContainer);
    }
}
