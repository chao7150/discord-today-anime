import { Program } from "../consts";

export const isTokyoWatchableChannelProgram = (program: Program): boolean => {
  /**
   * @see http://cal.syoboi.jp/mng?Action=ShowChList
   * NHK総合
   * NHK Eテレ
   * フジテレビ
   * 日本テレビ
   * TBS
   * テレビ朝日
   * テレビ東京
   * TOKYO MX
   */
  return [1, 2, 3, 4, 5, 6, 7, 19].includes(program.ChID);
};
