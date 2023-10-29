'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersSchedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.UsersSchedules.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.UsersSchedules.belongsTo(models.Schedule, {
        foreignKey: 'scheduleId',
      });
      // define association here
    }
  }
  UsersSchedules.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: sequelize.models.User,
        key: 'id',
      }
    },
    scheduleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: sequelize.models.Schedule,
        key: 'id',
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'UsersSchedules',
  });
  return UsersSchedules;
};
