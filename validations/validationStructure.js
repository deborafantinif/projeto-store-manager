const validationStructure = (schema) => (unknown) => {
  const { error } = schema.validate(unknown);
  if (error) {
    const [code, message] = error.message.split('|');
    return { code, message };
  }
};

module.exports = { validationStructure };