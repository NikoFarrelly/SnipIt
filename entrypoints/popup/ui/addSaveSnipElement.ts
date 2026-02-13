import { Snip } from "@/src/types";
import { saveClicked } from "@/entrypoints/popup/logic/saveClicked";

const INACTIVE_BUTTON_TITLE = "Inactive until a valid 'url' is provided.";

export const addSaveSnipElement = (url?: string, snip?: Snip) => {
  const addSnip = document.getElementById("addSnip");

  if (addSnip) {
    const saveSnip = document.createElement("div");
    saveSnip.id = "saveSnip";
    saveSnip.className = "save-snip";
    saveSnip.innerHTML = `
        <h6>Save this Snip?</h6>
        <div class="save-snip__inputs">
            <div class="text-input">
                <label class="text-input__label" for="url">URL:</label>
                <input class="input" id="url" type="text" value="${snip?.url ?? url}"/>
            </div>
            <div class="save-snip__url-info">
                <p>Matches path</p>
                <p>(* - wildcard)</p>
            </div>
            <div class="save-snip__page-load">
                <label for="runOnPageLoad">Run on page load:</label>
                <input id="runOnPageLoad" type="checkbox" ${snip?.runOnPageLoad ?? "checked"}/>
            </div>
        </div>
        <div class="save-snip__buttons">
            <button id="saveBtn" class="button--primary save-snip__button" title="active">Save</button>
        </div>
        `;
    const saveBtn = saveSnip.querySelector("#saveBtn");
    if (saveBtn) saveBtn.addEventListener("click", saveClicked);

    const urlInput = saveSnip.querySelector("#url");
    if (urlInput) urlInput.addEventListener("input", validateSaveSnip);

    addSnip.appendChild(saveSnip);
  }
};
// NOTE: URL is prefilled, so there's no need to begin with a disabled state.

/**
 * Handles 'save' snip button validation.
 * Becomes active while there is a valid URL provided.
 * @param e
 */
const validateSaveSnip = (e: Event) => {
  const urlInputValue = (e.target as HTMLInputElement)?.value?.trim();
  const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
  const hasURLValue = urlInputValue?.length > 0 && isValidURL(urlInputValue);

  if (hasURLValue && saveBtn) {
    saveBtn.disabled = false;
    saveBtn.title = "active";
  } else if (!hasURLValue && saveBtn) {
    saveBtn.disabled = true;
    saveBtn.title = INACTIVE_BUTTON_TITLE;
  }
};

/**
 * Provides light validation that the URL provided is valid.
 * @param url
 */
const isValidURL = (url: string) => {
  try {
    const constructedURL = new URL(url);
    if (constructedURL.host.length === 0)
      throw new Error("URL must have a valid host.");
    return true;
  } catch (e) {
    return false;
  }
};

export const resetSaveSnipElement = () => {
  const urlInput = document.getElementById("url");
  const runOnPageLoad = document.getElementById("runOnPageLoad");

  if (urlInput && runOnPageLoad) {
    (urlInput as HTMLInputElement).value = "";
    (runOnPageLoad as HTMLInputElement).checked = true;
  }
};
