import { Program } from "../consts";
import { isNightProgram } from "./night-only";

export const isPopularProgram =
  ({
    whitelist,
    blacklist,
  }: {
    whitelist: ReadonlyArray<string>;
    blacklist: ReadonlyArray<string>;
  }) =>
  (program: Program): boolean => {
    // フェイルセーフとしてホワイトリストを優先する
    if (whitelist.includes(program.Title)) {
      return true;
    }
    if (blacklist.includes(program.Title)) {
      return false;
    }
    return isNightProgram(program);
  };
