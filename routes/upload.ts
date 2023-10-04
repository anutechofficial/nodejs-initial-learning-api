// export default router;

import * as AWS from 'aws-sdk';
import multer from 'multer';
import express, { Request, Response } from 'express';
require('dotenv').config();

const router = express.Router();
const BUCKET_NAME:any= process.env.BUCKET_NAME;

const S3Bucket = new AWS.S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
});

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage });

// Define the POST route for file upload
router.post('/file', upload.single('file'), async (req: Request, res: Response) => {
    try {
        const file: Express.Multer.File | undefined = req.file;
        console.log(file);
        
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const params: AWS.S3.PutObjectRequest = {
            Bucket: BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: file.mimetype,
            // ContentDisposition: 'inline',
        };

        console.log("Parameter :",params);
        const result = await S3Bucket.upload(params).promise();
        console.log("Result of file upload : ", result);

        res.status(200).json({ message: 'File uploaded successfully', result });
    } catch (error) {
        // Handle any errors that occur during the upload
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
// export default S3Bucket;