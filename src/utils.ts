// utils

import {getAllSnips} from "./storage";
import {Snip} from "./types";

export const getSnipsForURL = async (url: string) => {
    const allSnips = await getAllSnips();
    return allSnips.filter(matchingSnips(url));
}

export const matchingSnips = (givenUrl: string) => {
    const strippedGivenUrl = givenUrl.replace(/\/\*$/, ''); // Remove trailing /* if present

    return ({url}: Snip): boolean => {
        if (url === givenUrl) return true;

        if (url.endsWith('*')) {
            const baseUrl = url.slice(0, -1); // Remove the '*' character
            return strippedGivenUrl.startsWith(baseUrl);
        } else if (url.endsWith('/*')) {
            const baseUrl = url.slice(0, -2); // Remove the '/*' characters
            return strippedGivenUrl === baseUrl;
        }

        return false;
    };
}

export const getActiveTab = async (): Promise<Browser.tabs.Tab | null> => {
    const tabs = (await browser.tabs.query({
        active: true,
        currentWindow: true
    }));
    return tabs?.[0] ?? null;
}
