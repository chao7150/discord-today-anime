import { Client, Message, TextChannel } from "discord.js";
import { fetch } from "./api-client";
import { messageDecorator } from "./decorator";
import { convertor } from "./convertors";
import { isNightProgram, isTokyoWatchableChannelProgram } from "./filters";
import cron from "node-cron";

const client = new Client();

const replyTodayAnime = (message: Message): void => {
  if (message.author.bot) {
    return undefined;
  }
  if (message.content === "今日のアニメ") {
    const promise = fetch();
    promise.then((rawResp) => {
      const programs = convertor(rawResp).items.filter(
        isTokyoWatchableChannelProgram
      );
      message.channel.send(messageDecorator(programs));
    });
  }
  if (message.content === "今日の深夜アニメ") {
    const promise = fetch();
    promise.then((rawResp) => {
      const programs = convertor(rawResp)
        .items.filter(isTokyoWatchableChannelProgram)
        .filter(isNightProgram);
      message.channel.send(messageDecorator(programs));
    });
  }
};

client.on("message", (message) => replyTodayAnime(message));
client.once("ready", async () => {
  // TODO: debug用なので消す
  const programs = convertor(
    await fetch({
      start: new Date(Date.now() - 60 * 60 * 1000),
      end: new Date(),
    })
  )
    .items.filter(isTokyoWatchableChannelProgram)
    .filter(isNightProgram);
  programs.forEach((program) => {
    (
      client.channels.cache.get(
        process.env.DISCORD_ANIME_COIN_CHANNEL_ID!
      ) as TextChannel
    )
      .send(
        `${program.Title} 第${program.Count}話 『${program.SubTitle}』 の評価は？`
      )
      .then(async (message) => {
        await message.react("0️⃣");
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
        await message.react("6️⃣");
        await message.react("7️⃣");
        await message.react("8️⃣");
        await message.react("9️⃣");
        await message.react("🔟");
      });
  });
  // TODO: ↑消す
  cron.schedule("0,30 * * * *", async () => {
    const programs = convertor(
      await fetch({
        start: new Date(Date.now() - 35 * 60 * 1000),
        end: new Date(),
      })
    )
      .items.filter(isTokyoWatchableChannelProgram)
      .filter(isNightProgram);
    programs.forEach((program) => {
      (
        client.channels.cache.get(
          process.env.DISCORD_ANIME_COIN_CHANNEL_ID!
        ) as TextChannel
      )
        .send(
          `${program.Title} 第${program.Count}話 『${program.SubTitle}』 の評価は？`
        )
        .then(async (message) => {
          await message.react("0️⃣");
          await message.react("1️⃣");
          await message.react("2️⃣");
          await message.react("3️⃣");
          await message.react("4️⃣");
          await message.react("5️⃣");
          await message.react("6️⃣");
          await message.react("7️⃣");
          await message.react("8️⃣");
          await message.react("9️⃣");
          await message.react("🔟");
        });
    });
  });
});

client.login(process.env.CLIENT_ID);
