const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bounties extends Model {}

Bounties.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        bug_id: { // foreign key to bugs.id
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: { // foreign key to users.id
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bounty_amount: {
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
        modelName: 'bounties'
    }
);

module.exports = Bounties;