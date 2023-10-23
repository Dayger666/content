import middy from '@middy/core';
import type { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

import { GeneralError } from '@common/httpRequestHandlers/http.error';
import logger from '@utils/logger';
import { DBInterface, getDBInstance } from '@db/index';

import MiddlewareFunction = middy.MiddlewareFn;

const AuthorizerMiddleware = (strategy?: (event: any, db: DBInterface) => void) => {
  const before: MiddlewareFunction<APIGatewayProxyEvent, APIGatewayProxyResult> = async (handler): Promise<any> => {
    if (strategy) {
      logger('Info', `Auth ${handler.context.functionName}`, `request= ${JSON.stringify(handler.event)}`);

      try {
        const db = await getDBInstance();

        await strategy(handler.event, db);
      } catch (error) {
        throw new GeneralError(error);
      }
    }
  };

  return { before };
};

export default AuthorizerMiddleware;
