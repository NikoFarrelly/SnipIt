import { getAllSnips } from "./storage";

/**
 * Grabs the active tab i.e. the current tab the user is on.
 * @return Tab | null
 */
export const getActiveTab = async (): Promise<Browser.tabs.Tab | null> => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tabs?.[0] ?? null;
};

/**
 * Ensures a unique ID.
 * @Returns string
 */
export const generateID = (): string => {
  const allSnips = getAllSnips();
  const uniqueIDs = Object.keys(allSnips);
  // handle possible hash collisions
  let id = getRandomSequence();
  while (uniqueIDs.includes(id)) {
    id = getRandomSequence();
  }
  return id;
};

/**
 * Generates an ID with a length of 8.
 * @Returns string
 */
const getRandomSequence = (length = 8): string => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};
