const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bugs extends Model {}

Bugs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    repo_id: { // foreign key to repos.id
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issue_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issue_state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issue_title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "No Title"
    },
    issue_body: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "No Description"
    },
    issue_url: { // html_url
        type: DataTypes.STRING,
        allowNull: false
    },
    bounty_weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bugs',
  }
);

module.exports = Bugs;
