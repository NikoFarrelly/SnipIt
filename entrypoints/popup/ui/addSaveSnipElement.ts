import {Snip} from "@/src/types";
import {saveClicked} from "@/entrypoints/popup/logic/saveClicked";

export const addSaveSnipElement = (url?: string, snip?: Snip) => {
    const addSnip = document.getElementById('addSnip');

    if (addSnip) {
        const saveSnip = document.createElement('div');
        saveSnip.id = 'saveSnip';
        saveSnip.className = 'saveSnipContainer';
        saveSnip.innerHTML = `
                <h6>Save this Snip?</h6>
        <div class="saveSnipInputs">
            <div class="text-input">
                <label class="text-input__title" for="url">URL:</label>
                <input class="input" id="url" type="text" value="${snip?.url ?? url}"/>
            </div>
            <div class="urlInfo">
                <p>Matches path</p>
                <p>(* - wildcard)</p>
            </div>
            <div class="pageLoadContainer">
                <label for="runOnPageLoad">Run on page load:</label>
                <div class="checkBoxContainer">
                    <input id="runOnPageLoad" type="checkbox" ${snip?.runOnPageLoad ?? 'checked'}/>
                </div>
            </div>

        </div>
        <div class="saveSnipButtonContainer">
            <button id="saveBtn" class="primary-button saveSnipButton">Save</button>
        </div>
        `
        saveSnip.addEventListener('click', saveClicked)

        addSnip.appendChild(saveSnip);
    }

}
