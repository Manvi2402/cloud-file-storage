const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,      // aapki AWS key
  secretAccessKey: process.env.AWS_SECRET_KEY,  // aapka AWS secret
  region: process.env.AWS_REGION,                // aapka AWS region
});

/**
 * S3 bucket se file delete karne ka function
 * @param {string} key - S3 file ka key (filename in bucket)
 */
const deleteFileFromS3 = async (key) => {
  if (!key) throw new Error("S3 key nahi mila delete karne ke liye");

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  };

  return s3.deleteObject(params).promise();
};

module.exports = { deleteFileFromS3 };
