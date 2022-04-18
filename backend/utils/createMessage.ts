const createMessage = (from: string | string[], text: string) => {
  return {
    from,
    text
  };
};

export default createMessage;
