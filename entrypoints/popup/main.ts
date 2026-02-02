import {getActiveTab, getSnipsForURL} from "../../src/utils";
import {snipClicked} from "./snipClicked";
import {saveClicked} from "./saveClicked";
import {Snip} from "@/src/types";
import {addSnipsForURL} from "@/entrypoints/popup/snippedElements";


const main = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;
    // await deleteAllSnips();
    const snipsForURL = await getSnipsForURL(activeTab.url);
    await addSnipsForURL(snipsForURL);
}


main();


document.getElementById("snipBtn")?.addEventListener("click", snipClicked)

document.getElementById('saveBtn')?.addEventListener('click', saveClicked)
