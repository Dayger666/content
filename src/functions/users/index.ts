import { handlerPath } from '@utils/handler-resolver';
import { corsConfig, responseMessages } from '@utils/constants';

export default {
  createUser: {
    handler: `${handlerPath(__dirname)}/handler.createUser`,
    events: [
      {
        http: {
          method: 'post',
          path: 'users',
          swaggerTags: ['Users'],
          bodyType: 'IUserBodyType',
          cors: corsConfig,
          responseData: {
            201: {
              description: responseMessages.CREATED,
              bodyType: 'IUser',
            },
            422: {
              description: responseMessages.UNPROCESSABLE_ENTITY,
              bodyType: 'IError',
            },
          },
        },
      },
    ],
  },
};
