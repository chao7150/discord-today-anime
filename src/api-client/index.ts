import axios from "axios";
import { zeroPadding } from "../utils/time";
import { RawSyoboiResponse } from "./consts";

export interface SyoboiParams {
  start?: Date;
  end?: Date;
}

export const format = (date: Date): string => {
  return `${date.getFullYear()}${zeroPadding(
    (date.getMonth() + 1).toString(),
    2
  )}${zeroPadding(date.getDate().toString(), 2)}${zeroPadding(
    date.getHours().toString(),
    2
  )}${zeroPadding(date.getMinutes().toString(), 2)}`;
};

/**
 * @see https://docs.cal.syoboi.jp/spec/rss2.php/
 * 引数がないときは現在から24時間後までに開始するアニメを取得する
 */
export const fetch = async (
  params?: SyoboiParams | undefined
): Promise<RawSyoboiResponse> => {
  console.log(params);
  return axios
    .get<RawSyoboiResponse>("http://cal.syoboi.jp/rss2.php", {
      params: {
        alt: "json",
        start: params?.start && format(params.start),
        end: params?.end && format(params.end),
      },
    })
    .then((r) => r.data);
};
