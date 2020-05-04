import { SyoboiResponse, Program } from "../consts";
import { formatTime } from "./time";
import { createUrls } from "./urls";
import { createFlagString } from "./flag";

type Field = { name: string; value: string };

const decorateField = (item: Program): Field => ({
  name: `${formatTime(item.StTime)} ${item.ChName}`,
  value: `${createFlagString(item.Flag)}[${item.Title}](${createUrls(
    item.Urls
  )})`,
});

export const messageDecorator = (programs: SyoboiResponse["items"]): any => {
  return {
    embed: {
      title: "24時間以内に放送開始するアニメ",
      url: "https://cal.syoboi.jp/",
      fields: programs.map(decorateField),
    },
  };
};
