
const {s3} = require("../config")
const fs = require('fs')

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME

class AWSFileManager {
    static async uploadFile(filePath, key) {
        try {
            const fileContent = fs.readFileSync(filePath);

            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: key,
                Body: fileContent,
            };

            const data = await s3.upload(params).promise();
            print(`File upload: ${key}`, "SUCCESS");
            return (data,true);
        } catch (error) {
            print(`File upload: ${error}`, "ERROR");
            return(error,false);
        }
    }

    static async uploadBase64File(base64Data, key) {
        try {
            const fileContent = Buffer.from(base64Data, 'base64');

            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: key,
                Body: fileContent,
            };

            const data = await s3.upload(params).promise();
            print(`base 64 File upload: ${key}`, "SUCCESS");
            return(data,true)
        } catch (error) {
            print(`base 64 File upload: ${error}`, "ERROR");
            return(error,false)
        }
    }
    static async getAllFiles() {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
            };

            const data = await s3.listObjectsV2(params).promise();
            print(`all Files fetch from aws`, "SUCCESS");
            return (data.Contents,true);
        } catch (error) {
            print(`Error fetching all files: ${error}`, "ERROR");
            return(error,false)
        }
    }

    static async getFileById(fileId) {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: fileId,
            };

            const data = await s3.getObject(params).promise();
            print(`fetch file by id`, "SUCCESS");
            return (data.Body,true);
        } catch (error) {
            print(`fetch file by id: ${error}`, "ERROR");
            return(error,false)
        }
    }

    static async viewFile(fileId) {
        try {
            const fileContent = await this.getFileById(fileId);
            print(`File Content: ${fileContent.toString()}`,'SUCCESS');
            print(`view file by id`, "SUCCESS");
            return (fileContent,true);
        } catch (error) {
            print(`view file by id: ${error}`, "ERROR");
            return(error,false)
        }
    }

    static async deleteFile(fileId) {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: fileId,
            };

            const data = await s3.deleteObject(params).promise();
            print(`delete file By id : ${fileId}`, 'SUCCESS');
            return(data,true)
        } catch (error) {
            print(`delete file By id : ${fileId} : ${error}`, "ERROR");
            return(error,false)
        }
    }
}

module.exports = AWSFileManager;
