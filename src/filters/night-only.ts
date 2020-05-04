import { Program } from "../consts";

export const nightOnlyFilter = (program: Program): boolean => {
  const start = new Date(program.StTime * 1000);
  return [0, 1, 2, 3, 21, 22, 23].includes(start.getHours());
};
