import { Client, Guild, Message } from "discord.js";
import { fetch } from "./api-client";
import { messageDecorator } from "./decorator";
import { convertor } from "./convertors";
import { isNightProgram, isTokyoWatchableChannelProgram } from "./filters";
import { Program } from "./consts";

const client = new Client({ partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER"] });
let guild: Guild | undefined = undefined;

const replyTodayAnime = async (message: Message): Promise<void> => {
  if (message.author.bot) {
    return undefined;
  }
  if (message.channel.type === "dm") {
    if (guild === undefined) {
      message.channel.send("認証に失敗しました")
      return;
    }
    if (message.content === process.env.VERIFY_KEY) {
      try {
        const id = message.author.id
        const member = await guild.members.fetch(id)
        await member.roles.add(process.env.DISCORD_VERIFIED_ROLE_ID || "");
        console.log(member.user.username + " is verified");
        message.channel.send("認証に成功しました");
      } catch (e) {
        console.log(e);
        message.channel.send("認証に失敗しました");
      }
    } else {
      message.channel.send("認証に失敗しました")
    }
  }
  if (message.content === "今日のアニメ") {
    const rawResp = await fetch();
    const programs = convertor(rawResp).items.filter(
      isTokyoWatchableChannelProgram
    );
    const programChunks: Program[][] = [];
    programs.forEach((program, index) => {
      const chunkNumber = Math.floor(index / 25);
      if (programChunks[chunkNumber] === undefined) {
        programChunks[chunkNumber] = [];
      }
      programChunks[chunkNumber].push(program);
    })
    programChunks.forEach(async (programChunk) => {
      await message.channel.send(messageDecorator(programChunk));
    })
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

client.on("ready", () => {
  guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID || "")
})
client.on("message", (message) => replyTodayAnime(message));

client.login(process.env.CLIENT_ID);
