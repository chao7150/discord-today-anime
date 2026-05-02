import { Program } from "../consts";
import { toTokyoDate } from "../utils/time";

export const isNightProgram = (program: Program): boolean => {
  const start = toTokyoDate(program.StTime);
  return [0, 1, 2, 3, 21, 22, 23].includes(start.getUTCHours());
};
