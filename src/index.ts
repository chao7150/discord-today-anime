import { Client, Message } from "discord.js";
import { fetch } from "./api-client";
import { messageDecorator } from "./decorator";
import { convertor } from "./convertors";

const client = new Client();

const replyTodayAnime = (message: Message): void => {
  if (message.author.bot) {
    return undefined;
  }
  if (message.content !== "今日のアニメ") {
    return undefined;
  }
  const promise = fetch();
  promise.then((rawResp) => {
    const res = convertor(rawResp);
    message.channel.send(messageDecorator(res));
  });
};

client.on("message", (message) => replyTodayAnime(message));

client.login(process.env.CLIENT_ID);
