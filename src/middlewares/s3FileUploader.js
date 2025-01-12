import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import fs from "fs";
import logger from '../config/logger.js'


const ID = process.env.AWS_ACCESS_ID ;
const SECRET = process.env.AWS_SECRET_ID;

const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const S3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});


const getUniqFileName = (originalname) => {
    const name = uuidv4();
    const ext = originalname.split('.').pop();
    logger.info(`generated fileName for the API is ${name}.${ext}`);
    return `${name}.${ext}`;
}

export const uploadFile = async(userId, productId, fileName, originalname) => {
    logger.info("Uploading file to s3");
    const fileContent = fs.readFileSync(fileName);

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: userId+"/"+productId+"/"+getUniqFileName(originalname),
        Body: fileContent
    };

    // Uploading files to the bucket
    const data = await S3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        logger.info('File uploaded successfully.');
        return data;
    }).promise();
    return data;
}

export const deleteFile = async(fileName) => {
    logger.info("Performing hard delete on file in s3");
    var deleteParam = {
        Bucket: BUCKET_NAME, 
        Key: fileName
       };

    await S3.deleteObject(deleteParam, function(err, data) {
        if (err){ 
            logger.error(err);
            throw err
        };
        logger.info(data)
        logger.info(fileName+' file Deleted successfully');
    })
}