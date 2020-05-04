import { Program } from "../consts";

export const parseUrls = (rawUrls: string): Program["Urls"] => {
  if (rawUrls === "") {
    return {};
  }
  return rawUrls.split("\n").reduce<Program["Urls"]>((acc, line) => {
    const [url, owner] = line.split("\t");
    return { ...acc, [owner]: url };
  }, {});
};
