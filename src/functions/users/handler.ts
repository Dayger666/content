import { UsersService } from '@services';
import {
  CreateUserSchema,
} from '@common/validation-schemas/user-validation-schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@utils/api-gateway';
import { middyfy } from '@utils/lambda';
import { ResponseSchema } from '@utils/types';
import { APIResponse } from '@common/httpRequestHandlers/response';
import { GeneralError } from '@common/httpRequestHandlers/http.error';
import { getDBInstance } from '@db/index';

// event.body;
export const createUser: ValidatedEventAPIGatewayProxyEvent<ResponseSchema> = middyfy(async (event) => {
  const db = await getDBInstance();
  const userService = new UsersService(db.sequelize);

  const transaction = await db.sequelize.transaction();

  try {
    const createdUser = await userService.create(event.body, transaction);

    await transaction.commit();

    return APIResponse.created(createdUser);
  } catch (e) {
    await transaction.rollback();
    throw new GeneralError(e);
  }
}, CreateUserSchema);
