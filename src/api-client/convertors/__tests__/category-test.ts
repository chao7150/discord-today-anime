import { parseUrls } from "../urls";

describe("parseUrls", () => {
  it("タブと改行で区切られたURLをパースできる", () => {
    expect(parseUrls("url1\towner1\nurl2\towner2")).toStrictEqual({
      owner1: "url1",
      owner2: "url2",
    });
  });
  it("空文字列をパースできる", () => {
    expect(parseUrls("")).toStrictEqual({})
  })
});
