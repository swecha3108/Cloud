import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    first_name: {
    type: Sequelize.STRING,
    allowNull: false
    },
    last_name: {
    type: Sequelize.STRING,
    allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
    }, {
        tableName: 'Users',
        timestamps: true,
        createdAt: 'account_created',
        updatedAt: 'account_updated'
    });

    export default User;