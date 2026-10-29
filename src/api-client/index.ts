import { toTokyoDate, zeroPadding } from "../utils/time";
import { RawSyoboiResponse } from "./consts";

export interface SyoboiParams {
  start?: Date;
  end?: Date;
}

export const format = (date: Date): string => {
  const tokyoDate = toTokyoDate(date);
  return `${tokyoDate.getUTCFullYear()}${zeroPadding(
    (tokyoDate.getUTCMonth() + 1).toString(),
    2
  )}${zeroPadding(tokyoDate.getUTCDate().toString(), 2)}${zeroPadding(
    tokyoDate.getUTCHours().toString(),
    2
  )}${zeroPadding(tokyoDate.getUTCMinutes().toString(), 2)}`;
};

/**
 * @see https://docs.cal.syoboi.jp/spec/rss2.php/
 * 引数がないときは現在から24時間後までに開始するアニメを取得する
 */
export const fetch = async (
  params?: SyoboiParams | undefined
): Promise<RawSyoboiResponse> => {
  const query = new URLSearchParams({ alt: "json" });
  if (params?.start) {
    query.set("start", format(params.start));
  }
  if (params?.end) {
    query.set("end", format(params.end));
  }
  const response = await globalThis.fetch(
    `http://cal.syoboi.jp/rss2.php?${query}`
  );
  if (!response.ok) {
    throw new Error(`cal.syoboi.jp が ${response.status} を返しました`);
  }
  return (await response.json()) as RawSyoboiResponse;
};
