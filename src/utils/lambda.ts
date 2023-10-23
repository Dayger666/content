import { config } from 'aws-sdk';
import middy from '@middy/core';
import type { AWS } from '@serverless/typescript';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type { Handler } from 'aws-lambda';
import { ZodSchema } from 'zod';

import {
  HttpErrorHandler,
  ApiGatewayResponseHandler,
} from '@common/middlewares';
import ZodValidateMiddleware from '@common/middlewares/zod-validate.middleware';

config.update({
  accessKeyId: process.env.ACCESS_KEY_ID_AWS,
  secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
  region: process.env.REGION_AWS,
});

export const middyfy = (handler: Handler, schema?: ZodSchema<any, any>) => middy(handler)
  .use(middyJsonBodyParser())
  .use(HttpErrorHandler())
  .use(ApiGatewayResponseHandler())
  .use(ZodValidateMiddleware(schema));

export type AWSFunction = AWS['functions'][0];
