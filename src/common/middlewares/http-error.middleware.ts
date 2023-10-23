import middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { APIResponse } from '@common/httpRequestHandlers/response';
import { HttpError } from '@common/httpRequestHandlers/http.error';
import logger from '@utils/logger';

import MiddlewareFunction = middy.MiddlewareFn;

const HttpErrorMiddleware = () => {
  const onError: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (request): Promise<any> => {
    // TODO: in case of a lambda in the step functions does not fail
    const { error } = request;
    let response = APIResponse.error();

    if (error instanceof HttpError) {
      response = APIResponse.error(error.statusCode, error.message);
    }

    logger('Error', request.context.functionName, `error= ${JSON.stringify(request.error)}`);
    logger('Error', request.context.functionName, `response= ${JSON.stringify(response)}`);

    request.response = response;
  };

  return { onError };
};

export default HttpErrorMiddleware;