import * as authService from "../services/auth-service.js";
import { setResponse, setError } from "../utils/http-utils.js";
import logger from '../config/logger.js'
import StatsD from 'statsd-client';
const client = new StatsD();
/**
 * It logsIn a user and returns the accesstoken in the response
 * @param req - Http Request with <ISignInUser> as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
export const login = async (req, response) => {
    try {
      client.increment("loginAPI", 1);
      logger.info("Login api is triggered")
      const userWithToken = await authService.loginUser(req.body);
      setResponse(response, userWithToken);
    } catch (err) {
        logger.error(err);
      if (err.message === "User Not found.") setError(response, err, 404);
      else if (err.message === "Invalid Password") setError(response, err, 401);
      else setError(response, err, 500);
    }
  };

/**
 * This is used to create the user
 * @param req - Http Request with user details as body
 * @param response - CustomResponse - This is the response object that will be sent
 * back to the client.
 */
 export const createUser = async(req, response) => {
    try {
      client.increment("PostUser", 1);
        logger.info("Create User API is triggered");
        const user = await authService.createUser(req, response);
    } catch (err) {
        logger.error(err)
        setError(response, err);
    }
}