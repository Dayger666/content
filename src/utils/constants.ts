import * as z from 'zod';

export enum errorMessages {
  NOT_FOUND_USER_BY_ID = 'User with this id does not exist',
  NOT_FOUND_USER_BY_EMAIL = 'User with this email does not exist',
  NOT_FOUND_IMAGE_BY_FILE_NAME = 'Images with this file name does not exist',
  USER_NOT_CREATED = 'User has not been created',
  UPDATE_ON_DUPLICATE_FIELDS = 'Not all required fields are specified in updateOnDuplicate',
  IMAGE_NOT_CREATED = 'Image has not been created',
  ACCESS_TOKEN_INVALID = 'Access token missing, or invalid',
  NO_ACCESS = 'User is not authorized to access this resource',
}

export enum messages {
  CHANGED_PASSWORD = 'Your password is succesfull changes',
  LINT_SENT = 'Your password is succesfull changes',
  DELETED_ACCOUNT = 'User account deleted'
}

export enum responseMessages {
  OK = 'OK',
  CREATED = 'Created',
  UNPROCESSABLE_ENTITY = 'Unprocessable',
  NO_CONTENT = 'No Content',
}

export enum errorTypes {
  APP_ERROR_TYPE = 'AppErrorType'
};

export enum userRoles {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}
export const dateSchema = z.preprocess((arg: string | Date) => {
  if (typeof arg == 'string' || arg instanceof Date) {
    return new Date(arg);
  }
}, z.date());

export enum AWSAuthFlowTypes {
  ADMIN_NO_SRP_AUTH = 'ADMIN_NO_SRP_AUTH',
  REFRESH_TOKEN_AUTH = 'REFRESH_TOKEN_AUTH',
}

export enum customMessageTriggerTypes {
  'FORGOT_PASSWORD' = 'CustomMessage_ForgotPassword'
}

export const corsConfig = {
  origin: '*',
  headers: ['Content-Type', 'Authorization', 'platform'],
};
