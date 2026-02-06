import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {addSnipElement, openAddSnipElement} from "@/entrypoints/popup/ui/addSnipElement";
import {addRemovedElements} from "@/entrypoints/popup/ui/addRemovedElements";
import {addSnipsOnThisPage} from "@/entrypoints/popup/ui/addSnipsOnThisPageElement";

const buildPopupUI = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;

    await addRemovedElements();
    const snipsForURL = await getSnipsForURL(activeTab.url);
    await addSnipsOnThisPage(snipsForURL);
    addSnipElement();
    if (snipsForURL.length === 0) openAddSnipElement();
}

buildPopupUI();
