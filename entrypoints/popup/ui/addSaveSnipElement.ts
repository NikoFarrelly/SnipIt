import {Snip} from "@/src/types";
import {saveClicked} from "@/entrypoints/popup/logic/saveClicked";

export const addSaveSnipElement = (url?: string, snip?: Snip) => {
    const addSnip = document.getElementById('addSnip');

    if (addSnip) {
        const saveSnip = document.createElement('div');
        saveSnip.id = 'saveSnip';
        saveSnip.className = 'save-snip';
        saveSnip.innerHTML = `
        <h6>Save this Snip?</h6>
        <div class="save-snip__inputs">
            <div class="text-input">
                <label class="text-input__title" for="url">URL:</label>
                <input class="input" id="url" type="text" value="${snip?.url ?? url}"/>
            </div>
            <div class="url-info">
                <p>Matches path</p>
                <p>(* - wildcard)</p>
            </div>
            <div class="page-load">
                <label for="runOnPageLoad">Run on page load:</label>
                <input id="runOnPageLoad" type="checkbox" ${snip?.runOnPageLoad ?? 'checked'}/>
            </div>
        </div>
        <div class="save-snip__button-container">
            <button id="saveBtn" class="primary-button save-snip__button">Save</button>
        </div>
        `
        const saveBtn = saveSnip.querySelector('#saveBtn');
        if (saveBtn) saveBtn.addEventListener('click', saveClicked)

        addSnip.appendChild(saveSnip);
    }
}
