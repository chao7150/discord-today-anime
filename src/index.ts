import { Client, Message } from "discord.js";
import { fetch } from "./api-client";
import { SyoboiResponse } from "./api-client/const";

const client = new Client();

const zeroPadding = (str: string, len: number): string =>
  ("0".repeat(len) + str).slice(-len);

const formatTime = (timeStamp: number): string => {
  const date = new Date(timeStamp * 1000);
  return `${zeroPadding(date.getHours().toString(), 2).slice()}:${zeroPadding(
    date.getMinutes().toString(),
    2
  )}`;
};

const createMessage = (syobo: SyoboiResponse): string => {
  return syobo.items
    .filter((item) => [1, 2, 3, 4, 5, 6, 7, 19].includes(item.ChID))
    .reduce<string>(
      (acc, item) => `${acc}\n${formatTime(item.StTime)} ${item.Title}`,
      ""
    );
};

const replyTodayAnime = (message: Message): void => {
  if (message.author.bot) {
    return undefined;
  }
  if (message.content !== "今日のアニメ") {
    return undefined;
  }
  const resp = fetch();
  resp.then((a) => message.channel.send(createMessage(a)));
};

client.on("message", (message) => replyTodayAnime(message));

client.login(process.env.CLIENT_ID);
