import { LocationService } from '@services';
import {
  CreateLocationSchema,
} from '@common/validation-schemas/location-validation-schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@utils/api-gateway';
import { middyfy } from '@utils/lambda';
import { ResponseSchema } from '@utils/types';
import { APIResponse } from '@common/httpRequestHandlers/response';
import { GeneralError } from '@common/httpRequestHandlers/http.error';
import { getDBInstance } from '@db/index';

// event.body;
export const createLocation: ValidatedEventAPIGatewayProxyEvent<ResponseSchema> = middyfy(async (event) => {
  // TODO AFTER AUTH LOGIC GET ADMIN ID FROM EVENT BODY

  const db = await getDBInstance();
  const locationService = new LocationService(db.sequelize);

  const transaction = await db.sequelize.transaction();

  try {
    const createdLocation = await locationService.create(event.body, transaction);

    await transaction.commit();

    return APIResponse.created(createdLocation);
  } catch (e) {
    await transaction.rollback();
    throw new GeneralError(e);
  }
}, CreateLocationSchema);

/*
export const findLocations: ValidatedEventAPIGatewayProxyEvent<ResponseSchema> = middyfy(async (event) => {
  const db = await getDBInstance();
  const locationService = new LocationService(db.sequelize);

  const transaction = await db.sequelize.transaction();

  try {
    const locations = await locationService.find(event.queryStringParameters, transaction);

    await transaction.commit();

    return APIResponse.success(locations);
  } catch (e) {
    await transaction.rollback();

    throw new GeneralError(e);
  }
}, null);
*/
