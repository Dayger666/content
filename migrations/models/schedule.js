'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Schedule.belongsTo(models.Location, {
        foreignKey: 'locationId',
      });
      models.Schedule.belongsToMany(models.User, {
        through: models.UsersSchedules,
        foreignKey: 'scheduleId'
      });
      // define association here
    }
  }
  Schedule.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: sequelize.models.Location,
        key: 'id',
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    rrule: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Schedule',
  });
  return Schedule;
};
