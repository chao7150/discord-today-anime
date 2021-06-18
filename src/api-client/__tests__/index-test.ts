import { format } from "..";

describe("format", () => {
  it("padding", () => {
    expect(format(new Date(1624035809000))).toBe("202106190203");
  });
});
