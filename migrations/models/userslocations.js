'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersLocations extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.UsersLocations.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.UsersLocations.belongsTo(models.Location, {
        foreignKey: 'locationId',
      });
      // define association here
    }
  }
  UsersLocations.init({
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
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: sequelize.models.Location,
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
    modelName: 'UsersLocations',
  });
  return UsersLocations;
};
