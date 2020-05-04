import { isNightProgram } from "../night-only";
import { Program } from "../../consts";

describe("isNightProgram", () => {
  it("21時代から26時代に開始する番組はtrue", () => {
    const nightProgram = {
      StTime: new Date("2020-05-04T22:00:00+09:00").getTime() / 1000,
    } as Program;
    expect(isNightProgram(nightProgram)).toBe(true);
  });
  it("21時代から26時代以外に開始する番組はfalse", () => {
    const dayProgram = {
      StTime: new Date("2020-05-04T12:00:00+09:00").getTime() / 1000,
    } as Program;
    expect(isNightProgram(dayProgram)).toBe(false);
  });
});
