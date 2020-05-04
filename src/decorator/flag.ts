import { Program } from "../consts";

export const createFlagString = (flag: Program["Flag"]): string => {
  switch (flag) {
    case "chu":
      return "[注] ";
    case "new":
      return "[新] ";
    case "final":
      return "[終] ";
    case "rerun":
      return "[再] ";
    default:
      return "";
  }
};
