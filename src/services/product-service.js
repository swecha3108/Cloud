import Product from "../models/Product.js";
import User from "../models/User.js";
import auth from "basic-auth";
import logger from "../config/logger.js"
import StatsD from 'statsd-client'

const client = new StatsD();

/**
 * This method used to create a new product
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const createProduct = async (req, res) => {
    const {
        sku,
        quantity
    } = req.body;
    try {
        if (quantity && (quantity < 0 || quantity > 100)){
            logger.error("Quantity is less than 0 or greater than 100");
            res.status(400).send({
                message: "Bad request. Quantity cannot be less than 0 or greater than 100"
            })
        }
        else {
            const date = Date.now();
            const product = await Product.findOne({
                where: {
                    sku: sku
                }
            })
            client.timing('getProduct', Date.now() - date);
            if (!product) {
                logger.info("There is no such product, adding now");
                const user = await auth(req);
                const dbuser = await User.findOne({
                    where: {
                        username: user.name
                    }
                });
                req.body.owner_user_id = dbuser.id;
                const date = Date.now();
                const row = await Product.create(req.body);
                client.timing('createProduct', Date.now() - date);
                logger.info("Product has been created with id: "+row.id);
                res.status(201).send(row);
            } else {
                logger.error("Product with same sku already exists!");
                res.status(400).send({
                    message: "Bad Request, Product with same sku already exists!"
                })
            }
        }
    } catch (err) {
        logger.error(err);
        res.status(400).send({
            message: "Bad request"
        })
    }
};

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const putProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        id,
        name, description, sku, manufacturer, quantity,
        date_added,
        date_last_updated,
        owner_user_id
    } = req.body;
    if (date_added || id || owner_user_id || date_last_updated) {
        logger.error("user is trying to update the system variables like id, date_added, owner_user_id and date_last_updated");
        res.status(400).send({
            message: "Bad request"
        });
    } else if(!name || !description || !sku || !manufacturer || !(req.body.hasOwnProperty('quantity'))){
        logger.error("mandatory details are not part of the request");
        res.status(400).send({
            message: "Bad request"
        });
    }
    else {
        try {
            if (quantity && (quantity < 0 || quantity > 100)){
                logger.error("Quantity is less than 0 or greater than 100");
                res.status(400).send({
                    message: "Bad request. Quantity cannot be less than 0 or greater than 100"
                })
            }
            const date = Date.now();
            const product = await Product.findByPk(productId);
            client.timing('getProduct', Date.now() - date);
            if (product) {
                const date = Date.now();
                const update = await product.update(req.body);
                client.timing('updateProduct', Date.now() - date);
                logger.info("Product with productId: "+productId+" updated successfully");
                res.status(204).send({
                            message: "Product updated successfully"
                        });
            }
            else
                logger.info("Product with productId: "+productId+" doesn't exists");
        } catch (err) {
            logger.error(err);
            res.status(400).send({
                message: "Bad request"
            });
        }
    }
};

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <Product> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const patchProduct = async (req, res) => {
    const productId = req.params.id;
    const {
        id,
        date_added,
        date_last_updated,
        quantity,
        owner_user_id
    } = req.body;
    if (date_added || id || owner_user_id || date_last_updated) {
        logger.error("user is trying to update the system variables like id, date_added, owner_user_id and date_last_updated");
        res.status(400).send({
            message: "Bad request"
        });
    } else {
        try {
            if (quantity && (quantity < 0 || quantity > 100)){
                logger.error("Quantity is less than 0 or greater than 100");
                res.status(400).send({
                    message: "Bad request. Quantity cannot be less than 0 or greater than 100"
                })
            }
            const date = Date.now();
            const product = await Product.findByPk(productId);
            client.timing('getProduct', Date.now() - date);
            if (product) {
                const date = Date.now();
                const update = await product.update(req.body);
                client.timing('updateProduct', Date.now() - date);
                logger.info("Product with productId: "+productId+" updated successfully");
                res.status(204).send({
                            message: "Product updated successfully"
                        });
            }
            else
                logger.info("Product with productId: "+productId+" doesn't exists");
        } catch (err) {
            logger.error(err);
            res.status(400).send(err);
        }
    }
};

/**
 * This is used to get the product details based on the access token
 * @param req - Http Request with id in params
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getProduct = async (req, res) => {
    const productId = req.params.id;
    logger.info("getting the product details from database");
    const date = Date.now();
    const row = await Product.findByPk(productId);
    client.timing('getProduct', Date.now() - date);
    logger.info("product details with productId"+productId+"have been retrieved from database");
    res.status(200).json(row);
};

/** 
 * This is used to get the product details based on the access token
 * @param req - Http Request with id in params
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    if (!productId){
        logger.error("productId is null");
        res.status(400).json("Bad Request");
    }
    const date = Date.now();
    const row = await Product.destroy({
        where: {
            id: productId
        }
    });
    client.timing('deleteProduct', Date.now() - date);
    if (row === 1){
        logger.info("product with productId "+productId+" has been deleted successfully");
        res.status(204).json(row);
    }
    else{
        logger.info("Product with productId: "+productId+" doesn't exists");
        res.status(404).send("");
    }
};