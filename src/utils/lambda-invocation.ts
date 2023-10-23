import { Lambda } from 'aws-sdk';

import logger from './logger';

const lambda = new Lambda();

const invokeLambda = async (request, functionName) => {
  const params = {
    FunctionName: `${process.env.ARN_APP}-${functionName}`,
    Payload: JSON.stringify(request, null, null),
    InvocationType: 'RequestResponse',
  };

  logger('Info', 'invokeLambda', `params= ${JSON.stringify(params)}`);

  const response = await lambda.invoke(params).promise();

  logger('Info', 'invokeLambda', `response= ${JSON.stringify(response)}`);

  return response;
};

export default invokeLambda;
