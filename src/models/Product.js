import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import User from "../models/User.js"

const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    name: {
    type: Sequelize.STRING,
    allowNull: false
    },
    description: {
    type: Sequelize.STRING,
    allowNull: false
    },
    sku: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    manufacturer: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 100
        }
    },
    owner_user_id: {
        type: Sequelize.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
    }
    }, {
        tableName: 'Products',
        timestamps: true,
        createdAt: 'date_added',
        updatedAt: 'date_last_updated'
    });
    Product.belongsTo(User, {
        foreignKey: "owner_user_id"
      });    

    export default Product;