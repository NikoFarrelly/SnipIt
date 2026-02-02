import {getActiveTab} from "../../src/utils";
import {snipClicked} from "./snipClicked";
import {saveClicked} from "./saveClicked";


const main = async () => {
    const activeTab = await getActiveTab();
    if (!activeTab || !activeTab?.url) return;
    // await deleteAllSnips();
    // await getSnipsForURL(activeTab.url);
}

main();


document.getElementById("snipBtn")?.addEventListener("click", snipClicked)

document.getElementById('saveBtn')?.addEventListener('click', saveClicked)
