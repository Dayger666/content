import { UniqueConstraintError } from 'sequelize';

import { errorTypes } from '@utils/constants';

/**
 * @description http error class that throws error with statusCode
 */
export class HttpError extends Error {
  statusCode: number;

  type = errorTypes.APP_ERROR_TYPE;

  constructor(message = 'Unable to complete your request', statusCode: number) {
    super(`${message}`);
    this.statusCode = statusCode;
  }
}

/**
 * @description bad request error description class. This defines bad request when one or more parameters are incorrect
 */
export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request. One or more parameters are incorrect') {
    super(`${message}`, 400);
  }
}

/**
 * @description forbidden error description class. This defines a forbidden request when don't have permission to access some resource.
 */
export class ForbiddenError extends HttpError {
  constructor(message = 'You don’t have permission to access this resource') {
    super(`${message}`, 403);
  }
}

/**
 * @description conflict request error description class. This defines conflict request when source already exists
 */
export class HttpAlreadyExistsError extends HttpError {
  constructor(
    message = 'The resource you are trying to create already exists',
  ) {
    super(`${message}`, 409);
  }
}

/**
 * @description conflict request error description class. This defines conflict request when source already exists
 */
export class InternalServerError extends HttpError {
  constructor(message: object | string = 'Something went wrong. Please try again later') {
    let errorMessage = message;

    if (message instanceof UniqueConstraintError) {
      errorMessage = message?.errors?.[0]?.message;
    }

    super(`${errorMessage}`, 500);
  }
}

/**
 * @description use this when you want to inform client about unprocessable error
 */
export class UnprocessableEntity extends HttpError {
  constructor(message = 'Unprocessable Entity') {
    super(`${message}`, 422);
  }
}

/* @description not found error description class. This defines not found when record not found
 */
export class NotFoundError extends HttpError {
  constructor(message = 'Record not found') {
    super(`${message}`, 404);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(`${message}`, 401);
  }
}

export class GeneralError {
  constructor(error) {
    if (error.type === errorTypes.APP_ERROR_TYPE) {
      throw error;
    }

    throw new InternalServerError(error);
  }
}
