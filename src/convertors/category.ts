import { Program } from "../consts";

export const parseCategory = (rawCategory: string): Program["Cat"] => {
  switch (rawCategory) {
    case "1":
      return "anime";
    case "10":
      return "anime_rerun";
    case "7":
      return "ova";
    case "5":
      return "anime_related";
    case "4":
      return "tokusatsu";
    case "8":
      return "movie";
    case "3":
      return "tv";
    case "2":
      return "radio";
    case "6":
      return "memo";
    case "0":
      return "others";
    default:
      return undefined;
  }
};
