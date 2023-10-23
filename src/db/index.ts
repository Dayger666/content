import * as pg from 'pg';
import {
  DataTypes,
  Dialect,
  Sequelize,
} from 'sequelize';

import models from 'migrations/models';
import { InternalServerError } from '@common/httpRequestHandlers/http.error';

let db = null as DBInterface;

export interface DBInterface {
  sequelize: Sequelize,
  authenticate: () => void
}

export class DB implements DBInterface {
  sequelize: Sequelize;

  constructor() {
    const { host, username, password, database } = JSON.parse(process.env.DB_DATABASE);

    this.sequelize = new Sequelize(database || '', username || '', password, {
      host: host,
      dialect: 'postgres' as Dialect,
      dialectModule: pg,
      logging: false,
    });

    models.forEach((model) => {
      model(this.sequelize, DataTypes);
    });
  }

  async authenticate() {
    try {
      await this.sequelize.sync({ force: false })
        .then(() => console.info('DB Connection established successfully.'))
        .catch(err => console.error(`DB Sequelize Connection Failed: ${err}`));
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export const getDBInstance = async () => {
  try {
    if (!db) {
      db = new DB();
    }

    await db.authenticate();

    return db;
  } catch (e) {
    throw new InternalServerError(e);
  }
};
