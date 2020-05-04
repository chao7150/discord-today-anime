import { Program } from "../consts";

export const parseFlag = (rawFlag: string): Program["Flag"] => {
  switch (rawFlag) {
    case "1":
      return "chu";
    case "2":
      return "new";
    case "4":
      return "final";
    case "8":
      return "rerun";
    default:
      return undefined;
  }
};
