const  { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    AWS_REGION,
    S3_BUCKET_NAME,

} = process.env;


// Initialize the S3 interface
const s3 = new S3Client ({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
});

const getSignedImageUrl = async (imageKey) => {
    const command = new GetObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: imageKey,
    });
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return signedUrl;
};

module.exports = { getSignedImageUrl };