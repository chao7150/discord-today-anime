import { Program } from "../consts";

export const createUrls = (urls: Program["Urls"]): string | undefined => {
  if (Object.keys(urls).length === 0) {
    return undefined;
  }
  if ("公式" in urls) {
    return urls["公式"];
  }
  return Object.values(urls)[0];
};