import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";
import Product from "../models/Product.js"

const Image = sequelize.define('Image', {
    image_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    file_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    s3_bucket_path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
            references: {
                model: Product,
                key: 'id'
            }
    }
    }, {
        initialAutoIncrement: 1,
        tableName: 'Images',
        timestamps: true,
        createdAt: 'date_created'
    });
    Image.belongsTo(Product, {
        foreignKey: "product_id"
      });    

    export default Image;