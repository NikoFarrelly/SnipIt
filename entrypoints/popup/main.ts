import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {addSnipsOnThisPage} from "@/entrypoints/popup/ui/snippedElements";
import {addSnipElement} from "@/entrypoints/popup/ui/addSnipElement";
import {addRemovedElements} from "@/entrypoints/popup/ui/addRemovedElements";

const buildPopupUI = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;

    await addRemovedElements();
    await addSnipsOnThisPage(await getSnipsForURL(activeTab.url));
    addSnipElement();
}

buildPopupUI();
