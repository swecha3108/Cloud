import logger from '../config/logger.js'
import * as productService from '../services/product-service.js';
import { setResponse, setError } from '../utils/http-utils.js';


/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const createProduct = async (req, response) => {
    try {
        logger.info("Create Product api is triggered")
        await productService.createProduct(req, response);
    } catch (err) {
        setError(response, err);
    }
}

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const putProduct = async (req, response) => {
    try {
        logger.info("Put product api is triggered")
        await productService.putProduct(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * It updates the product details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const patchProduct = async (req, response) => {
    try {
        logger.info("Post product api is triggered")
        await productService.patchProduct(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * This is used to get the product details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getProduct = async(req, response) => {
    try {
        logger.info("get product api is triggered")
        await productService.getProduct(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * This is used to get the product details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const deleteProduct = async(req, response) => {
    try {
        logger.info("Delete product api is triggered")
        await productService.deleteProduct(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}