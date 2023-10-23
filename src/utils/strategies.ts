import { JwtExpiredError } from 'aws-jwt-verify/error';

import {
  GeneralError,
  NotFoundError,
  UnauthorizedError,
} from '@common/httpRequestHandlers/http.error';
import { DBInterface } from '@db/index';
import { IUser } from '@interfaces';
import { UsersService } from '@services';

import {
  errorMessages,
} from './constants';

type StrategyParamsType = {
  role?: IUser['role'][],
  type?: string,
};

export type LocalStrategyWrapperType<T = void> = T & {
  user: IUser
};

export type JWTStrategyWrapperType<T = void> = LocalStrategyWrapperType<T> & {
  accessToken: string
};

export const localStrategy = () => async (event, db: DBInterface) => {
  const usersService = new UsersService(db.sequelize);

  try {
    const { body: { email } } = event;

    const user = await usersService.findOne({
      email,
    });

    if (!user) {
      throw new NotFoundError(errorMessages.NOT_FOUND_USER_BY_EMAIL);
    }

    if (event.body) {
      event.body.user = user;
    } else {
      event.body = {
        user,
      };
    }
  } catch (e) {
    throw new GeneralError(e);
  }
};

/*
export const JWTStrategy = (params: StrategyParamsType = {}) => async (event, db: DBInterface) => {
  const authService = new AuthService(db.sequelize);

  try {
    const { role, type } = params;
    const token = type === 'websocket' ? event?.queryStringParameters?.token : event.headers.Authorization;

    if (!token) {
      throw new UnauthorizedError(errorMessages.ACCESS_TOKEN_INVALID);
    }

    const user = await authService.getAuthenticatedUser(token, role);

    if (event.body) {
      event.body.user = user;
      event.body.accessToken = token;
    } else {
      event.body = {
        user,
        token,
      };
    }
  } catch (e) {
    if (e instanceof JwtExpiredError) {
      throw new UnauthorizedError(e.message);
    }

    throw new GeneralError(e);
  }
};
*/
