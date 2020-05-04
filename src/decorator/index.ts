import { SyoboiResponse, Program } from "../consts";
import { formatTime } from "./time";
import { createUrls } from "./urls";

type Field = { name: string; value: string };

const decorateField = (item: Program): Field => ({
  name: `${formatTime(item.StTime)} ${item.ChName}`,
  value: `[${item.Title}](${createUrls(item.Urls)})`,
});

export const messageDecorator = (programs: SyoboiResponse["items"]): any => {
  return {
    embed: {
      title: "24時間以内に放送開始するアニメ",
      url: "https://cal.syoboi.jp/",
      fields: programs
        .filter((item) => [1, 2, 3, 4, 5, 6, 7, 19].includes(item.ChID))
        .map(decorateField),
    },
  };
};
