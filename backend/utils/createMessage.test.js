import createMessage from "./createMessage";

describe("message", () => {
  it("should create message", () => {
    const from = "Steven";
    const text = "Hi There!!";

    const message = createMessage(from, text);

    expect(message).toEqual({ from, text });
  });
});
