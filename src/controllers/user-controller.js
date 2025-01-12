import * as userService from '../services/user-service.js';
import { setResponse, setError } from '../utils/http-utils.js';
import logger from '../config/logger.js'
/**
 * It updates the user details and returns the updated object
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const updateProfile = async (req, response) => {
    try {
        logger.info("update user API is triggered");
        await userService.updateUser(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}

/**
 * This is used to get the user details based on the access token
 * @param req - Http Request with <IUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const getUser = async(req, response) => {
    try {
        logger.info("Get User API is triggered");
        await userService.getUser(req, response);
    } catch (err) {
        logger.error(err);
        setError(response, err);
    }
}