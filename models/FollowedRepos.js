const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class FollowedRepos extends Model {}

FollowedRepos.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: { // foreign key to users.id
        type: DataTypes.INTEGER,
        allowNull: false
    },
    repo_id: { // foreign key to repos.id
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'followed_repos',
  }
);

module.exports = FollowedRepos;
