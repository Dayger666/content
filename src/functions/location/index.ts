import { handlerPath } from '@utils/handler-resolver';
import { corsConfig, responseMessages } from '@utils/constants';

export default {
  createUser: {
    handler: `${handlerPath(__dirname)}/handler.createLocation`,
    events: [
      {
        http: {
          method: 'post',
          path: 'locations',
          swaggerTags: ['Locations'],
          bodyType: 'ILocationBodyType',
          cors: corsConfig,
          responseData: {
            201: {
              description: responseMessages.CREATED,
              bodyType: 'ILocation',
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
