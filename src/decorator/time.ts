const zeroPadding = (str: string, len: number): string =>
  ("0".repeat(len) + str).slice(-len);

export const formatTime = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  return `${zeroPadding(date.getHours().toString(), 2).slice()}:${zeroPadding(
    date.getMinutes().toString(),
    2
  )}`;
};