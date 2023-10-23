const logger = (type, functionName, message, params?: any) => {
  const log = {
    type,
    functionName,
    params,
    message,
  };

  console.info('\n' + JSON.stringify(log));
};

export default logger;
