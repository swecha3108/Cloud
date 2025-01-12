import User from "../models/User.js";
import Product from "../models/Product.js"

/**
 * Generates an access token with the given parameters using base64.
 * @param username 
 * @param password
 * @returns access token.
 */
 export const generateAccessToken = (username, password) => {
    const plainCredential = `${username}:${password}`;
    const bearerToken = Buffer.from(plainCredential, "utf8").toString("base64");
     return bearerToken;
}

export const validateAccessToken = async (token, userId) => {
    const originalUserId = getUserId(token);
        if(originalUserId && (userId == originalUserId))
            return true;
        else
            return false;
}

export const validateProductsAccessToken = async (token, productId) => {
    const originalUserId = getUserId(token);
    const product = await Product.findAll({where: {userId: originalUserId}})
    if(product && product.includes(productId))
        return true;
    else
        return false;
}

const getUserId = async(token) => {
    const plainCredential = Buffer.from(token, "base64").toString("utf8");
    const username = plainCredential.split(":")[0];
    const user = await User.findOne({where: {username: username}})
    return user.id;
}

