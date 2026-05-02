const JST_OFFSET_MILLISECONDS = 9 * 60 * 60 * 1000;

export const zeroPadding = (str: string, len: number): string =>
  ("0".repeat(len) + str).slice(-len);

export const toTokyoDate = (date: Date | number): Date => {
  const milliseconds = date instanceof Date ? date.getTime() : date * 1000;
  return new Date(milliseconds + JST_OFFSET_MILLISECONDS);
};