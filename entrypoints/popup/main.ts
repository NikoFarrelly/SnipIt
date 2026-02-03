import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {addSnipsOnThisPage} from "@/entrypoints/popup/snippedElements";
import {addSnipElement} from "@/entrypoints/popup/addSnipElement";
import {addRemovedElements} from "@/entrypoints/popup/addRemovedElements";

const buildPopupUI = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;

    await addRemovedElements(activeTab.url);
    await addSnipsOnThisPage(await getSnipsForURL(activeTab.url));
    addSnipElement();
}

buildPopupUI();
