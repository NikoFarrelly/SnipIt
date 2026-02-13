export default defineBackground({
    persistent: true,
    type: 'module',
    main() {
        browser.runtime.onMessage.addListener(async (request, sender) => {
            if (request.action === 'fireSnipForTab' && sender?.tab) return {success: true, tab: sender.tab};
            return false;
        })
    },
})
