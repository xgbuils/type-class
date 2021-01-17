const TypeBuilder = (mainType) => {
  let type = {};
  return {
    addType(typeName) {
      if (mainType.name === typeName) {
        type.name = typeName;
      }
    },
    build() {
      return type;
    },
  };
};

export default TypeBuilder;
