import {removeElements} from "@/entrypoints/content/removeElements";
import {getSnipsForURL, resetCurrentPageSnipAmount, runSnipsOnLoad} from "@/src/snips.utils";

export default defineContentScript({
    runAt: 'document_idle',
    matches: ['<all_urls>'],
    world: 'ISOLATED',
    main() {

        // fire snips on load
        browser.runtime.sendMessage({
            action: 'fireSnipForTab',
        }, async (response: { success: boolean, tab: globalThis.Browser.tabs.Tab }) => {
            if (response.success && response.tab.active && response.tab.url) {
                const snipsForURL = (await getSnipsForURL(response.tab.url))

                const snipsOnSnip = snipsForURL.filter(s => !s.runOnPageLoad && s.currentPageSnipAmount > 0);
                await resetCurrentPageSnipAmount(snipsOnSnip)

                const snipsOnLoad = snipsForURL.filter(s => s.runOnPageLoad);
                await runSnipsOnLoad(snipsOnLoad);
            }
        })

        // Snip via click
        browser.runtime.onMessage.addListener(
            function (request, _, sendResponse) {
                if (request.action === 'fireSnipOnClick') {
                    if (!request?.fromText || !request?.untilClassName) return sendResponse({
                        error: 'No props given to remove elements.',
                        success: false
                    })
                    const {fromText, untilClassName} = request;
                    const {removedElements, matchedElements} = removeElements({fromText, untilClassName});

                    sendResponse({success: true, removedElements, matchedElements});
                    return true;
                }
            })

    }
})
