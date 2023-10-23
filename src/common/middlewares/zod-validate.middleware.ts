import middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ZodSchema } from 'zod';

import { UnprocessableEntity } from '@common/httpRequestHandlers/http.error';
import logger from '@utils/logger';
import { getIsJsonString } from '@utils/helpers';

import MiddlewareFunction = middy.MiddlewareFn;

const ZodValidateMiddleware = (schema?: ZodSchema<any, any>) => {
  const before: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (handler): Promise<any> => {
    logger('Info', handler.context.functionName, `request= ${JSON.stringify(handler.event)}`);

    if (getIsJsonString(handler.event.body)) {
      handler.event.body = JSON.parse(handler.event.body);
    }

    if (!schema) {
      return;
    }

    try {
      await schema.parseAsync(handler.event.body);
    } catch (error) {
      throw new UnprocessableEntity(error);
    }
  };

  return { before };
};

export default ZodValidateMiddleware;
