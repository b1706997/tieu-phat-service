import { Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');

@Injectable()
export default class UtilService {

    getS3Services() {
        const s3 = new AWS.S3({
            accessKeyId: process.env.S3_ACCESS_KEY_ID,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        })

        return s3;
    }

    async uploadStonesImage(imageBase64: string) {
        const buffer = Buffer.from(imageBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        const type = imageBase64.split(';')[0].split('/')[1];
        const name = `${Date.now()}.${type}`;

        const s3Services = this.getS3Services();
        const params = {
            Bucket: `${process.env.AWS_BUCKET_NAME!}`,
            Key: "FolderName/" + name,
            Body: buffer,
            ACL: 'public-read'
        };
        const imageUrl = process.env.S3_LINKFILE + params.Key;
        const upload = s3Services.upload(params).promise();
        upload.then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
        });

        return imageUrl;
    }
}