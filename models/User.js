'use strict';
const isAfter = require('date-fns/isAfter');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: 'userId'
      });
      User.belongsToMany(models.Group, {
        through: 'users_to_groups',
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isBefore: new Date().toDateString()
      }
    },
    gender: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};