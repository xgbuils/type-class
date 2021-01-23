import expect from "expect";
import TypeBuilder from "../src/type/builder.mjs";
import Lexer from "../src/lexer.mjs";
import Parser from "../src/parser.mjs";

describe("Parser", () => {
  describe("success", () => {
    it("a", () => {
      const selfType = {
        name: "a",
      };
      const typeBuilder = TypeBuilder(mainType);
      const lexer = Lexer("a");
      const parser = Parser(lexer, typeBuilder);

      expect(parser.parse()).toEqual({
        name: "a",
      });
    });
  });
});
