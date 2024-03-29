const AWS = require('aws-sdk');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4'
});

// get pre-signed S3 URL
function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60*1 // the Expires is capped for 1 minute
    });

    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`); // you can see those on CloudWatch

    return s3PreSignedUrl;
}

/// get a random int
function randomIndex(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/// parse letter slot
/// uppercase it and remove ending dot (.)
function parseLetter(value) {
    return (value || '').toUpperCase().replace('.', '');
}

/// surround string with paragragh tag <p>
function p(text) {
    return `<p>${text}</p>\n`
}

// export functions
module.exports.getS3PreSignedUrl = getS3PreSignedUrl;
module.exports.randomIndex = randomIndex;
module.exports.parseLetter = parseLetter;
module.exports.p = p;