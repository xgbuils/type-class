import expect from "expect";
import Lexer from "../src/lexer.mjs";

const toTokens = (lexer) => {
  const tokens = [];
  let token = lexer.read();
  while (token) {
    tokens.push(token);
    token = lexer.read();
  }
  return tokens;
};

const COMMA = "COMMA";
const TYPE = "TYPE";
const FUNCTION_OPERATOR = "FUNCTION_OPERATOR";
const METHOD_OPERATOR = "METHOD_OPERATOR";
const PARENTHESIS_OPEN = "PARENTHESIS_OPEN";
const PARENTHESIS_CLOSE = "PARENTHESIS_CLOSE";

describe("Lexer", function () {
  describe("success", () => {
    it("a -> b", function () {
      const lexer = Lexer("a -> b");

      expect(toTokens(lexer)).toEqual([
        {
          type: TYPE,
          value: "a",
        },
        {
          type: FUNCTION_OPERATOR,
        },
        {
          type: TYPE,
          value: "b",
        },
      ]);
    });

    it("a ~> b", function () {
      const lexer = Lexer("a ~> b");

      expect(toTokens(lexer)).toEqual([
        {
          type: TYPE,
          value: "a",
        },
        {
          type: METHOD_OPERATOR,
        },
        {
          type: TYPE,
          value: "b",
        },
      ]);
    });

    it("(a , b)", function () {
      const lexer = Lexer("(a , b)");

      expect(toTokens(lexer)).toEqual([
        {
          type: PARENTHESIS_OPEN,
        },
        {
          type: TYPE,
          value: "a",
        },
        {
          type: COMMA,
        },
        {
          type: TYPE,
          value: "b",
        },
        {
          type: PARENTHESIS_CLOSE,
        },
      ]);
    });
  });
});
