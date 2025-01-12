import { hashPassword } from "../config/crypto.js";
import { isValidEmail } from "../config/validators.js";
import User from "../models/User.js";
import logger from '../config/logger.js'
import StatsD from 'statsd-client';

const client = new StatsD();
/**
 * This method used to create a new user
 * @param user - user object with the details of user
 */
 export const createUser = async (req, res) => {
    const { first_name, last_name, password, username } = req.body;
    if(!first_name || !last_name || !password || !username || !isValidEmail(username)){
        logger.error("Required details are not provided while creating a user");
        res.status(400).send({message: "Bad request"})
    }
    else{
      const date = Date.now();
      const user = await User.findOne({where: {username: username}})
      client.timing('getUser', Date.now() - date);
      if(!user){
        logger.info("There is no such user, adding now");
        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
        const date = Date.now();
        const row = await User.create(req.body);
        client.timing('createUser', Date.now() - date);
        const user = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username,
                    account_created: row.account_created,
                    account_updated: row.account_updated
                }
                logger.info(`User with username ${username} has been created successfully`);
                res.status(201).send(user);
              } else {
                logger.error("User already exists");
                res.status(400).send({message: "Bad Request, User already exists!"})
              }
    }
};
