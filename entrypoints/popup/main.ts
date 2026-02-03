import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {addSnipsForURL} from "@/entrypoints/popup/snippedElements";
import {addSnipElement} from "@/entrypoints/popup/addSnipElement";


const main = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;
    // await deleteAllSnips();
    const snipsForURL = await getSnipsForURL(activeTab.url);
    await addSnipsForURL(snipsForURL);

    addSnipElement();
}


main();



