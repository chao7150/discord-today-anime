import { zeroPadding } from "../utils/time";

export const formatTime = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  return `${zeroPadding(date.getHours().toString(), 2).slice()}:${zeroPadding(
    date.getMinutes().toString(),
    2
  )}`;
};