export const zeroPadding = (str: string, len: number): string =>
  ("0".repeat(len) + str).slice(-len);