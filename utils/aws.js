
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
            console.log('File uploaded successfully:', key);
            return (data,true);
        } catch (error) {
            console.error('Error uploading file:', error);
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
            console.log('Base64 file uploaded successfully:', key);
            return(data,true)
        } catch (error) {
            console.error('Error uploading base64 file:', error);
            return(error,false)
        }
    }
    static async getAllFiles() {
        try {
            const params = {
                Bucket: AWS_BUCKET_NAME,
            };

            const data = await s3.listObjectsV2(params).promise();
            return (data.Contents,true);
        } catch (error) {
            console.error('Error fetching all files:', error);
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
            return (data.Body,true);
        } catch (error) {
            console.error('Error fetching file by Id:', error);
            return(error,false)
        }
    }

    static async viewFile(fileId) {
        try {
            const fileContent = await this.getFileById(fileId);
            console.log('File Content:', fileContent.toString());
            return (fileContent,true);
        } catch (error) {
            console.error('Error viewing file:', error);
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
            console.log('File deleted successfully:', fileId);
            return(data,true)
        } catch (error) {
            console.error('Error deleting file:', error);
            return(error,false)
        }
    }
}

module.exports = AWSFileManager;
