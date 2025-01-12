import bcrypt from 'bcryptjs';
import logger from 'winston';

/**
 * Salt for generating hash.
 */
const salt = bcrypt.genSaltSync(10);

/**
 * Generates a hashed value for given password.
 *
 * @param password Password to be hashed.
 * @returns Hashed password.
 */
export const hashPassword = (password) => {
    logger.info("Hashing the password");
    return bcrypt.hash(password, salt);
}

/**
 * Compares the given password against hashed password.
 *
 * @param hashedPassword Hashed password.
 * @param password Password to be validated.
 * @returns true, if the password match.
 */
export const comparePassword = (hashedPassword, password) => {
    let comparisonResult = bcrypt.compare(password, hashedPassword)
    logger.info("Comparing passwords:"+ comparisonResult);
    return comparisonResult;
}