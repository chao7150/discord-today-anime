import { formatTime } from "../time";

describe("formatTime", () => {
  it("時刻をフォーマットできる", () => {
    const nowSec = new Date("2020-05-04T18:10:00+09:00").getTime() / 1000;
    expect(formatTime(nowSec)).toBe("18:10");
  });
  it("ゼロパディングできる", () => {
    const nowSec = new Date("2020-05-04T00:00:00+09:00").getTime() / 1000;
    expect(formatTime(nowSec)).toBe("00:00");
  });
});
