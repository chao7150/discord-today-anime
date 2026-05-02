import { zeroPadding } from "../utils/time";
import { toTokyoDate } from "../utils/time";

export const formatTime = (timeStamp: number): string => {
  const date = toTokyoDate(timeStamp);
  return `${zeroPadding(date.getUTCHours().toString(), 2)}:${zeroPadding(
    date.getUTCMinutes().toString(),
    2
  )}`;
};