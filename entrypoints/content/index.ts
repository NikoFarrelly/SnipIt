import {FireSnipOnClickAction, Snip} from "@/src/types";
import {removeElements} from "@/entrypoints/content/removeElements";
import {getSnipsForURL} from "@/src/utils";
import {updateSnip, updateSnipsAllTime} from "@/src/storage";

export default defineContentScript({
    runAt: 'document_idle',
    matches: ['<all_urls>'],
    world: 'ISOLATED',
    main() {

        // fire snips on load
        browser.runtime.sendMessage({
            action: 'fireSnipForTab',
        }, async (response: { success: boolean, tab: globalThis.Browser.tabs.Tab }) => {
            if (response?.success && response?.tab?.active && response?.tab?.url) {
                const snipsForURL = (await getSnipsForURL(response.tab.url))

                const snipsOnSnip = snipsForURL.filter(s => !s.runOnPageLoad && s.currentPageSnipAmount > 0);
                await resetCurrentPageSnipAmount(snipsOnSnip)

                const snipsOnLoad = snipsForURL.filter(s => s.runOnPageLoad);
                await runSnipsOnLoad(snipsOnLoad);
            }
        })

        // Run intentionally via click
        browser.runtime.onMessage.addListener(
            function (request: FireSnipOnClickAction, _, sendResponse) {
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

/**
 * Reset 'currentPageSnipAmount' of snips to 0.
 * 'currentPageSnipAmount' is a transient value that should be lost on reloading a page.
 * @param snips
 */
const resetCurrentPageSnipAmount = async (snips: Snip[]) => {
    for (const snip of snips) await updateSnip(snip.id, {...snip, currentPageSnipAmount: 0});
}

/**
 * Executes snips which run on load and updates their 'currentPageSnipAmount'.
 * @param snips
 */
const runSnipsOnLoad = async (snips: Snip[]) => {
    for (const snip of snips) {
        const {removedElements} = removeElements({
            fromText: snip.fromText,
            untilClassName: snip.untilClassName
        });
        if (removedElements > 0) {
            const updatedSnip: Snip = {
                ...snip,
                snipAmount: snip.snipAmount + removedElements,
                currentPageSnipAmount: removedElements,
            }
            await Promise.all([updateSnip(snip.id, updatedSnip), updateSnipsAllTime(removedElements)])
        } else if (snip.currentPageSnipAmount > 0) {
            await updateSnip(snip.id, {...snip, currentPageSnipAmount: 0})
        }
    }
    // update snips on this page + all time?
}
