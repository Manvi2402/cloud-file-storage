const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFileToS3 = async (buffer, originalname, mimetype) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}-${originalname}`,
    Body: buffer,
    ContentType: mimetype,
   // ACL: "public-read", // ✅ Public file access for preview/download
  };

  console.log("Using bucket:", process.env.AWS_BUCKET_NAME);
  return await s3.upload(params).promise();
};

const deleteFileFromS3 = (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.deleteObject(params).promise();
};
module.exports = { uploadFileToS3 };

