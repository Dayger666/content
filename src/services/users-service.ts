import {
  ModelStatic,
  Sequelize,
  Transaction,
} from 'sequelize';

import { ICreateUserType, IUser } from '@interfaces';
import User from '@models/user';
import { errorMessages } from '@utils/constants';
import {
  GeneralError,
  InternalServerError,
} from '@common/httpRequestHandlers/http.error';

class UsersService {
  model: ModelStatic<User>;

  constructor(sequelize: Sequelize) {
    this.model = sequelize.models.User;

    return this;
  }

  async create(data: ICreateUserType, transaction?: Transaction): Promise<IUser> {
    const foundUser = await this.findOne({ email: data.email }, transaction);

    if (!foundUser) {
      const user = await this.model.create(data, { transaction });

      if (!user) {
        throw new InternalServerError(errorMessages.USER_NOT_CREATED);
      }

      return user;
    } else {
      throw new GeneralError('A user with the same email already exists');
    }
  }

  async findOne(data: Partial<IUser>, transaction?: Transaction): Promise<IUser> {
    return this.model.findOne({
      where: data,
      transaction,
    });
  }
}

export default UsersService;
