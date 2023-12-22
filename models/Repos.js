const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Repos extends Model {}

Repos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    repo_owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repo_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    repo_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'repos',
  }
);

module.exports = Repos;
