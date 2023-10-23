import middy from '@middy/core';
import { APIGatewayProxyEvent } from 'aws-lambda';

import logger from '@utils/logger';

import MiddlewareFunction = middy.MiddlewareFn;

const ApiGatewayResponseHandler = () => {
  const after: MiddlewareFunction<APIGatewayProxyEvent, any> = async (request): Promise<any> => {
    logger('Info', request.context.functionName, `response= ${JSON.stringify(request.response)}`);

    if (!request.event?.httpMethod || request.response === undefined || request.response === null) {
      return;
    }

    const existingKeys = Object.keys(request.response);
    const isHttpResponse = existingKeys.includes('statusCode')
      && existingKeys.includes('headers')
      && existingKeys.includes('body');

    if (isHttpResponse) {
      return;
    }
  };

  return { after };
};

export default ApiGatewayResponseHandler;