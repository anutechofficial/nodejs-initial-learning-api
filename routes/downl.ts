import express,{Request,Response} from "express";
// import fs from 'fs';
import aws from 'aws-sdk';
require('dotenv').config();
// import {S3Bucket} from './upload';

const router =express.Router();

const S3Bucket = new aws.S3({
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY
});


router.post("/download", async (req:Request,res:Response)=>{
    try{
        // const { username,blogtitle,blog } = req.body;



         const params:aws.S3.GetObjectRequest = {
            Bucket: process.env.BUCKET_NAME as string,
            Key:'dwqedw',
         };

        const fileStream = S3Bucket.getObject(params).createReadStream();
        fileStream.pipe(res);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    
    }

});

export default router;