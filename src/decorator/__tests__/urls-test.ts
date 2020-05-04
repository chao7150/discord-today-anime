import { createUrls } from "../urls";

describe("createUrls", () => {
  it("Urlsが空のときundefinedを返す", () => {
    expect(createUrls({})).toBeUndefined();
  });
  it("Urlsがkeyに「公式」を持つときそのvalueを返す", () => {
    expect(createUrls({ 公式: "official", hoge: "fuga" })).toBe("official");
  });
  it("Urlsがkeyに「公式」を持たないとき適当なvalueを返す", () => {
    expect(createUrls({ hoge: "fuga" })).toBe("fuga");
  });
});
