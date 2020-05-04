import { Program } from "../consts";

export const createUrls = (urls: Program["Urls"]): string | undefined => {
  if (urls === {}) {
    return undefined;
  }
  if ("公式" in urls) {
    return urls["公式"];
  }
  return Object.values(urls)[0];
};