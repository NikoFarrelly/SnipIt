browser.runtime.onMessage.addListener((message: {
    fromClassName?: string,
    fromText?: string,
    untilText?: string,
    untilClassName?: string
}, sender, sendResponse) => {
    const {
        // fromClassName,
        fromText,
        // untilText,
        untilClassName
    } = message;

    let matchedElements = 0;
    let removedElements = 0;

    const removalElements: Element[] = [];

    // from
    if (fromText) {
        // TODO could now become more specific and target 'text' tags - p, span, h1-h6,i,b, etc
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            if (element.textContent.trim() === fromText) {
                removalElements.push(element);
                matchedElements++;

            }
        })
    }

    // until
    if (untilClassName) {
        removalElements.forEach((element: Element) => {
            const untilElement = element.closest(`.${untilClassName}`);
            if (untilElement) {
                untilElement.remove();
                removedElements++;
            }
        })
    }

    sendResponse({success: true, removedElements, matchedElements});
    return true;
})
