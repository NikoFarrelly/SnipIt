import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {addSnipsForURL} from "@/entrypoints/popup/snippedElements";
import {addSnip} from "@/entrypoints/popup/addSnip";


const main = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;
    // await deleteAllSnips();
    const snipsForURL = await getSnipsForURL(activeTab.url);
    await addSnipsForURL(snipsForURL);

    addSnip();
}


main();



