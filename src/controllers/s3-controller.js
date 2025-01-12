import * as imageService from '../services/images-service.js';
import { setResponse, setError } from '../utils/http-utils.js';
import logger from '../config/logger.js'

/**
 * It upload an image to the s3 and updated the metadata in Image table
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client with metadata.
 */
 export const uploadImage = async (req, response) => {
    try {
        logger.info("Upload Image API is triggered");
        await imageService.uploadFile(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * This is used to get an Image details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getImage = async(req, response) => {
    try {
        logger.info("Get image details API is triggered")
        await imageService.getFile(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * This is used to get all the images details under a product based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const getAllImages = async(req, response) => {
    try {
        logger.info("Get all images api is triggered")
        await imageService.getAllFiles(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}


/**
 * This is used to delete the image details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const deleteImage = async(req, response) => {
    try {
        logger.info("delete image API is triggered")
        await imageService.deleteFile(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}