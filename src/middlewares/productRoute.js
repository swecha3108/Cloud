import User from "../models/User.js"
import Product from "../models/Product.js";
import auth from "basic-auth";
import { comparePassword } from "../config/crypto.js";
import logger from '../config/logger.js'
/**
 * User product Express Middleware to validate the request.
 *
 * @param req Request.
 * @param res Response.
 * @param next Next middleware to be executed.
 */
export const productRoute = async (req, res) => {
    logger.info("validating the access to the product API's")
    let status = 200;
    const user = await auth(req);
    
    const dbuser = await User.findOne({where: {username: user.name}})
    if(dbuser){
      const passwordMatches = await comparePassword(dbuser.password, user.pass);
      const productId = req.params.id;
      const product = await Product.findAll({where: {owner_user_id: dbuser.id, id: productId}})
      if(! passwordMatches){
        logger.info("User authentication failed due to password mismatch")
        status = 401;
      }else if(product.length === 0){
        logger.info("No such product exists")
        status = 403;
      }
    }
    else{
      logger.info("User doesn't exists")
      status = 401;
      return status;
    }
    logger.info("User authenticated and validated")
    return status;
};
