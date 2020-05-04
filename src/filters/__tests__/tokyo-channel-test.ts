import { Program } from "../../consts";
import { isTokyoWatchableChannelProgram } from "../tokyo-channel";

describe("isTokyoWatchableChannel", () => {
  it("指定したチャンネルの番組はtrue", () => {
    const watchableProgram = {
      ChID: 1,
    } as Program;
    expect(isTokyoWatchableChannelProgram(watchableProgram)).toBe(true);
  });
  it("指定したチャンネル以外の番組はfalse", () => {
    const unwatchableProgram = {
      ChID: 8,
    } as Program;
    expect(isTokyoWatchableChannelProgram(unwatchableProgram)).toBe(false);
  });
});
