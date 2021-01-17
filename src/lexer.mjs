export const constantTokens = [
  {
    name: "~>",
    type: "METHOD_OPERATOR",
  },
  {
    name: "->",
    type: "FUNCTION_OPERATOR",
  },
  {
    name: "(",
    type: "PARENTHESIS_OPEN",
  },
  {
    name: ")",
    type: "PARENTHESIS_CLOSE",
  },
  {
    name: ",",
    type: "COMMA",
  },
];

const typeRegExp = /[a-z]+/g;

const Lexer = (str) => {
  let position = 0;
  const consumeSpaces = () => {
    while (str[position] === " ") {
      ++position;
    }
  };
  return {
    read() {
      consumeSpaces();

      for (let index = 0; index < constantTokens.length; ++index) {
        const constantToken = constantTokens[index];
        if (str.startsWith(constantToken.name, position)) {
          position += constantToken.name.length;
          return {
            type: constantToken.type,
          };
        }
      }

      typeRegExp.lastIndex = position;
      const [result] = typeRegExp.exec(str) || [];
      if (result) {
        position += result.length;
        return {
          type: "TYPE",
          value: result,
        };
      }
    },
  };
};

export default Lexer;
