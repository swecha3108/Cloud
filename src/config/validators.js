import validator from 'validator';
import passwordValidator from 'password-validator';
import logger from 'winston'

/**
 * Validates whether the given value is not null or undefined.
 *
 * @param value value to be validated.
 * @returns true, if the value is not null or undefined.
 */
export const isValid = (value) => {
    return value !== null && value !== undefined;
}

/**
 * Validates whether the given string is a valid email.
 *
 * @param email Email to be validated.
 * @returns true, if the email is valid.
 */
export const isValidEmail = (email) => {
    logger.info("validating the email "+email)
    if (validator.isEmail(email)) {
        logger.info(email+" is valid");
        return true;
    }
    logger.info(email+" is invalid");
    return false;
}

/**
 * Validates if the given string is a valid password.
 *
 * @param password password to be validated.
 * @returns true, if the password is valid.
 */
export const isValidPassword = (password) => {
    return passwordValidatorSchema.validate(password);
}

const passwordValidatorSchema = new passwordValidator();
passwordValidatorSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase(1)                             // Must have uppercase letters
    .has().lowercase(1)                             // Must have lowercase letters
    .has().digits(1)                                // Must have at least 2 digits
    .has().symbols()
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

