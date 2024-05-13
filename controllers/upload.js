const AWS = require('aws-sdk');
const Sentry = require("@sentry/node");

function uploadToS3(data, fileName) {
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'
    };
    return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.Location);
            }
        });
    });
}

exports.uploadImage = async (req, res) => {
    try {
        const file = req.file;
        const data = await uploadToS3(file.buffer, file.originalname);
        res.status(200).json({ imageUrl: data });
    } catch (err) {
        Sentry.captureException(err);
        console.error('Error uploading image to S3:', err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
}