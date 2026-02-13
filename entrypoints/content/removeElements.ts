interface RemoveElementsProps {
  fromText: string;
  untilClassName: string;
}

export interface RemoveElementsResponse {
  removedElements: number;
  matchedElements: number;
}

/**
 * Receives messages from a listener to remove DOM elements on a webpage.
 * @param message
 */
export const removeElements = (
  message: RemoveElementsProps,
): RemoveElementsResponse => {
  const { fromText, untilClassName } = message;

  let matchedElements = 0;
  let removedElements = 0;

  const removalElements: Element[] = [];

  // from
  if (fromText) {
    const allElements = document.querySelectorAll("*");
    allElements.forEach((element) => {
      if (
        element.textContent.toLowerCase().trim() ===
        fromText.toLowerCase().trim()
      ) {
        removalElements.push(element);
        matchedElements++;
      }
    });
  }

  // until
  if (untilClassName) {
    removalElements.forEach((element: Element) => {
      const untilElement = element.closest(untilClassName);
      if (untilElement) {
        untilElement.remove();
        removedElements++;
      }
    });
  }

  return { removedElements, matchedElements };
};
