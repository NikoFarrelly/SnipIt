browser.runtime.onMessage.addListener((message: {
    fromText: string,
    untilClassName: string
}, sender, sendResponse) => {
    const {removedElements, matchedElements} = removeElements(message);
    sendResponse({success: true, removedElements, matchedElements});
    return true;
})

interface RemoveElementsProps {
    fromText: string
    untilClassName: string
}

const removeElements = (message: RemoveElementsProps) => {
    const {
        fromText,
        untilClassName
    } = message;

    let matchedElements = 0;
    let removedElements = 0;

    const removalElements: Element[] = [];

    // from
    if (fromText) {
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

    return {removedElements, matchedElements};
}
