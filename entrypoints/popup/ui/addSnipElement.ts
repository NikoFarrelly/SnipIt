import { Snip } from "@/src/types";
import { addSnip } from "@/entrypoints/popup/logic/snipClicked";

const INACTIVE_BUTTON_TITLE =
  "Inactive until a 'from' and 'until' are provided.";

export const addSnipElement = (snip?: Snip) => {
  const addSnipDetails = document.getElementById("addSnipDetails");

  if (addSnipDetails) {
    const addSnipContainer = document.createElement("div");
    addSnipContainer.id = "addSnip";
    addSnipContainer.className = "add-snip";
    addSnipContainer.innerHTML = `
    <div class="divider"></div>

    <div class="container-spacing item-gap">
        <h6>From element matching</h6>
        <div class="text-input">
            <label class="text-input__label" for="fromText">Text:</label>
            <input id="fromText" type="text" value="${snip?.fromText ?? ""}"/>
        </div>
    </div>

    <div class="container-spacing item-gap">
        <h6>Until element matching:</h6>
        <div class="text-input">
            <label class="text-input__label" for="untilClass">Class:</label>
            <input id="untilClass" type="text" value="${snip?.untilClassName ?? ""}"/>
        </div>
    </div>

    <div class="divider"></div>

    <div class="add-snip__actions">
        <div class="add-snip__action-item">
            <button class="button--primary" type="button" id="addSnipBtn" disabled title="${INACTIVE_BUTTON_TITLE}">
                Snip
            </button>
        </div>
        <div class="add-snip__action-item add-snip__action-item--info">
            <p>snipped</p>
            <p id="${snip?.id ? snip.id + "-" : ""}addSnipAmount" class="add-snip__amount">${snip?.snipAmount && snip.snipAmount > 0 ? snip.snipAmount : "-"}</p>
        </div>
    </div>
    <div class="divider"></div>
        `;

    const snipButton = addSnipContainer.querySelector("#addSnipBtn");
    if (snipButton) snipButton.addEventListener("click", addSnip);

    const fromInput = addSnipContainer.querySelector("#fromText");
    const untilInput = addSnipContainer.querySelector("#untilClass");
    if (fromInput && untilInput) {
      fromInput.addEventListener("input", validateAddSnip);
      untilInput.addEventListener("input", validateAddSnip);
    }

    addSnipDetails.appendChild(addSnipContainer);
  }
};

/**
 * Handles addSnip validation, From & Until inputs both require input before the 'Snip' button becomes active.
 */
const validateAddSnip = () => {
  const fromInput = document.getElementById("fromText") as HTMLInputElement;
  const untilInput = document.getElementById("untilClass") as HTMLInputElement;
  const snipButton = document.getElementById("addSnipBtn") as HTMLButtonElement;

  const hasFromInput = fromInput?.value?.trim()?.length > 0;
  const hasUntilInput = untilInput?.value?.trim()?.length > 0;

  if (hasFromInput && hasUntilInput && snipButton.disabled) {
    snipButton.disabled = false;
    snipButton.title = "active";
  } else if (!snipButton.disabled && !(hasFromInput && hasUntilInput)) {
    snipButton.disabled = true;
    snipButton.title = INACTIVE_BUTTON_TITLE;
  }
};

export const updateAddSnipAmount = (snipAmount: string) => {
  const addSnipAmount = document.getElementById("addSnipAmount");
  if (addSnipAmount) addSnipAmount.innerText = snipAmount;
};

export const closeAddSnipElement = () => {
  const addSnipDetails = document.getElementById("addSnipDetails");
  if (addSnipDetails) {
    (addSnipDetails as HTMLDetailsElement).open = false;
  }
};

export const resetAndCloseAddSnipElement = () => {
  const fromInput = document.getElementById("fromText");
  const untilInput = document.getElementById("untilClass");
  if (fromInput && untilInput) {
    (fromInput as HTMLInputElement).value = "";
    (untilInput as HTMLInputElement).value = "";
    updateAddSnipAmount("-");
    closeAddSnipElement();
  }
};

export const openAddSnipElement = () => {
  const addSnipDetails = document.getElementById("addSnipDetails");
  if (addSnipDetails) {
    (addSnipDetails as HTMLDetailsElement).open = true;
  }
};
