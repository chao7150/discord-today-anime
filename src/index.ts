import { Client, Message, MessageEmbed, TextChannel } from "discord.js";
import { fetch } from "./api-client";
import { messageDecorator } from "./decorator";
import { convertor } from "./convertors";
import { isNightProgram, isTokyoWatchableChannelProgram } from "./filters";
import cron from "node-cron";
import { doc, initialize } from "./google-spread-sheet";

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
          new MessageEmbed({
            title: `${program.Title} #${program.Count} 『${program.SubTitle}』 の評価は？`,
            fields: [
              { name: "title", value: program.Title, inline: true },
              { name: "count", value: program.Count, inline: true },
            ],
          })
        )
        .then(async (message: Message) => {
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

const emojiToNumber = (emoji: string): number | undefined => {
  switch (emoji) {
    case "0️⃣":
      return 0;
    case "1️⃣":
      return 1;
    case "2️⃣":
      return 2;
    case "3️⃣":
      return 3;
    case "4️⃣":
      return 4;
    case "5️⃣":
      return 5;
    case "6️⃣":
      return 6;
    case "7️⃣":
      return 7;
    case "8️⃣":
      return 8;
    case "9️⃣":
      return 9;
    case "🔟":
      return 10;
    default:
      return undefined;
  }
};

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.me) return;
  if (reaction.message.channel.id !== process.env.DISCORD_ANIME_COIN_CHANNEL_ID)
    return;
  if (reaction.message.author.id !== client.user!.id) return;
  const rate = emojiToNumber(reaction.emoji.name);
  if (rate === undefined) return;
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle["records"];
  const title = reaction.message.embeds[0].fields[0].value;
  const count = reaction.message.embeds[0].fields[1].value;
  sheet.addRow({
    datetime: new Date().toISOString(),
    title,
    count,
    rate,
    name: user.username ?? "",
    userId: user.id,
  });
});

initialize().then(() => {
  client.login(process.env.CLIENT_ID);
});
