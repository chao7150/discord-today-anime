import { Client, Message } from "discord.js";
import { fetch } from "./api-client";
import { messageDecorator } from "./decorator";
import { convertor } from "./convertors";
import { nightOnlyFilter } from "./filters";

const client = new Client();

const replyTodayAnime = (message: Message): void => {
  if (message.author.bot) {
    return undefined;
  }
  if (message.content === "今日のアニメ") {
    const promise = fetch();
    promise.then((rawResp) => {
      const programs = convertor(rawResp).items;
      message.channel.send(messageDecorator(programs));
    });
  }
  if (message.content === "今日の深夜アニメ") {
    const promise = fetch();
    promise.then((rawResp) => {
      const programs = convertor(rawResp).items.filter(nightOnlyFilter);
      message.channel.send(messageDecorator(programs));
    });
  }
};

client.on("message", (message) => replyTodayAnime(message));

client.login(process.env.CLIENT_ID);
