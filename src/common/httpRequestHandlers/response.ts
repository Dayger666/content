import type { APIGatewayProxyResult } from 'aws-lambda';

import { IResponseHeaders } from '@interfaces';

import type { CustomResponse } from './types/response.type';

export class APIResponse {
  static success(data?: any, headers?: IResponseHeaders): APIGatewayProxyResult {
    return this.build(200, data, headers);
  }

  static created(data?: any): APIGatewayProxyResult {
    return this.build(201, data);
  }

  static deleted(message = 'No Content'): APIGatewayProxyResult {
    return this.build(204, { message });
  }

  static error(statusCode = 500, message = 'Something went wrong. Please try again later'): APIGatewayProxyResult {
    return this.build(statusCode, {
      statusCode,
      message,
    });
  }

  static build(statusCode: number, apiResponse: CustomResponse, headers?: IResponseHeaders): APIGatewayProxyResult {
    return {
      statusCode: statusCode,
      body: JSON.stringify(apiResponse),
      headers: {
        ...headers,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'count',
      },
    };
  }
}
