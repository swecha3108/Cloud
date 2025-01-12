import { hashPassword } from '../config/crypto.js';
// import pool from '../config/database.js';
import User from "../models/User.js";
import logger from '../config/logger.js'
import StatsD from 'statsd-client'

const client = new StatsD();
/**
 * This method used to update the user
 * @param user - user object with the details of user
 */
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, password, username, id, account_created, account_updated } = req.body;
    if(password)
        req.body.password = await hashPassword(password);
    if(username || id || account_created || account_updated){
        logger.error("user is trying to update the system variables like id, account_created, account_updated or username");
        res.status(400).send({
            message: "Bad request"
        });
    }
    else{
        const date = Date.now();
        const results = await User.update(req.body, {
            where: {
              id: userId
            }
          });
          client.timing('updateUser', Date.now() - date);
          if (results && results !== 0) {
            logger.info("User details of the user with id "+userId+" is updated successfully");
                res.status(204).send({message: "User updated successfully"});
            } else {
                logger.error("All required details to create a user are not part of the request")
                res.status(400).send({
                    message: "Bad request"
                });
            }
}
};


/**
 * This method used to get user details
 * @param user - user object with the details of user
 */
export const getUser = async (req, res) => {
    const userId = req.params.id;
    logger.info("fetching the user details with id"+userId+" from database");
    const date = Date.now();
    const row = await User.findByPk(userId);
    client.timing('getUser', Date.now() - date);
    const user = {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        username: row.username,
        account_created: row.account_created,
        account_updated: row.account_updated
      }
    logger.info("the user details with id"+userId+" have been fetched from database");
    res.status(200).json(user);
  };
