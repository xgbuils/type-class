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

const regExpTokens = [{
  value: /[A-Z][a-zA-Z]*/gy,
  type: 'TYPE',
}, {
  value: /[a-z][a-zA-Z]*/gy,
  type: 'TYPE_VARIABLE',
}]

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

      for (let index = 0; index < regExpTokens.length; ++index) {
        const {type, value: regExp} = regExpTokens[index];
        regExp.lastIndex = position;
        const [result] = regExp.exec(str) || [];
        if (result) {
          position += result.length;
          return {
            type,
            value: result,
          };
        }
      }
    },
  };
};

export default Lexer;
