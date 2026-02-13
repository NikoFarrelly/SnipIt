import { getActiveTab } from "../../../src/utils";
import { addSaveSnipElement } from "@/entrypoints/popup/ui/addSaveSnipElement";
import { updateSnip } from "@/src/storage";
import {
  Snip,
  SnipClickFailure,
  SnipClickResponse,
  SnipClickResult,
} from "@/src/types";
import { updateAllTimeAndPageSnips } from "@/entrypoints/popup/ui/addRemovedElements";
import { updateAddSnipAmount } from "@/entrypoints/popup/ui/addSnipElement";
import { updateCardSnipAmount } from "@/entrypoints/popup/ui/addSnipsOnThisPageElement";
import { updateExpandedSnipAmount } from "@/entrypoints/popup/ui/addSnipCardExpandedElement";

interface SnipSuccess extends SnipClickResponse {}

interface SnipActiveTabFailure extends SnipClickFailure {}

interface SnipFailure {
  success: false;
  error: string;
}

interface SnipResult {
  url: string;
}

type SnipResponse =
  | ((SnipSuccess | SnipFailure) & SnipResult)
  | SnipActiveTabFailure;

/**
 * Handles executing 'snip' for SnipCards along with updating the card values.
 * @param cardSnip
 */
export const cardSnip = async ({
  cardSnip,
}: {
  cardSnip: Snip;
}): Promise<void> => {
  const res = await snip({
    fromText: cardSnip.fromText,
    untilClassName: cardSnip.untilClassName,
  });

  if (res.success) {
    const updatedSnip: Snip = {
      ...cardSnip,
      snipAmount: cardSnip.snipAmount + res.removedElements,
      currentPageSnipAmount: res.removedElements,
    };
    await updateSnip(cardSnip.id, updatedSnip);

    updateCardSnipAmount(cardSnip.id, res.removedElements + "");
    updateExpandedSnipAmount(cardSnip.id, res.removedElements + "");
  }
};

/**
 * Hanldes executing 'snip' for the addSnip element along with updating the UI.
 */
export const addSnip = async () => {
  const fromText = (document.getElementById("fromText") as HTMLInputElement)
    .value;
  const untilClassName = (
    document.getElementById("untilClass") as HTMLInputElement
  ).value;

  const res = await snip({
    fromText: fromText,
    untilClassName: untilClassName,
  });

  if (res.success) {
    const hasSaveSnipElement = !!document.getElementById("saveSnip");
    if (!hasSaveSnipElement) addSaveSnipElement(res.url);

    updateAddSnipAmount(res.removedElements + "");
  }
};

/**
 * Where the magic happens 🪄
 * Sends a message to the content script passing along snip props to be executed, then updates global snip stats.
 * @param fromText
 * @param untilClassName
 */
const snip = async ({
  fromText,
  untilClassName,
}: {
  fromText: string;
  untilClassName: string;
}): Promise<SnipResponse> => {
  const activeTab = await getActiveTab();
  if (!activeTab?.url || !activeTab?.id)
    return { success: false, error: "No active tab found." };

  const submit: SnipClickResult = await browser.tabs.sendMessage(activeTab.id, {
    action: "fireSnipOnClick",
    fromText,
    untilClassName,
  });

  if (submit.success) await updateAllTimeAndPageSnips(submit.removedElements);

  return { ...submit, url: activeTab.url };
};
