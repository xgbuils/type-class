const TOKEN_TYPE = "TYPE";

const STATE_INIT = "INIT";

const Parser = (lexer, typeBuilder) => {
  let state = STATE_INIT;
  return {
    parse() {
      while (true) {
        const token = lexer.read();
        if (!token) {
          return typeBuilder.build();
        }
        if (state === STATE_INIT) {
          if (token.type === TOKEN_TYPE) {
            typeBuilder.addType(token.value);
          }
        }
      }
    },
  };
};

export default Parser;
