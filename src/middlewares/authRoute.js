import User from "../models/User.js";
import auth from "basic-auth";
import { comparePassword } from "../config/crypto.js";
import logger from '../config/logger.js'

/**
 * Authorization Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const authRoute = async (req, res) => {
  logger.info("Validating user authentication and access to the API");
  let status = 200;
  const user = await auth(req);
  
  const dbuser = await User.findOne({where: {username: user.name}})
  if(dbuser){
    const passwordMatches = await comparePassword(dbuser.password, user.pass);
    const userId = req.params.id;
    if(! passwordMatches){
      logger.info("User authentication failed due to password mismatch");
      status = 401;
    }
    else if(userId && userId != dbuser.id){
      logger.info("User doesn't have access to this API");
      status = 403;
    }
  }
  else{
    logger.info("User doesn't exists");
    status = 401;
    return status;
  }
  if(status === 200)
    logger.info("User authenticated and validated the access to this API");
  return status;
};