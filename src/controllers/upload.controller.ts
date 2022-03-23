import fs from "fs";
// import entire SDK
import AWS from "aws-sdk";

// // import individual service
import S3 from "aws-sdk/clients/s3";
import config from "../config/config";
import { err, ok } from "../_helpers";
import { Request, Response } from "express";

const s3 = new S3(config.s3);
//We can use multer or node fs to read an image file and upload it to the Body of the upload
//putObject() take a call back function or we can turn it to a promise or we can use an asynchronous self invoking function

const uploadImage = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const file = req.file;

    // console.log("req", req);

    console.log("file", file);
    const description = req.body.description;
    const fileStream = fs.createReadStream(file.path);
    const fileDotSplitArr = file.originalname.split(".");
    const fileType = fileDotSplitArr[fileDotSplitArr.length - 1];
    console.log("fileType", fileType);

    console.log(file.path);
    const putParams = {
      Body: fileStream,
      Bucket: "epicure-uploads",
      Key: `${file.filename}.${fileType}`,
    };
    // console.log(putParams);

    const result = await s3.putObject(putParams).promise();
    const url = s3.getSignedUrl("getObject", {
      Bucket: config.s3.bucketName,
      Key: config.s3.accessKeyId,
      // Expires: signedUrlExpireSeconds
    });

    console.log(url);
    ok(res, { url: result });
  } catch (error) {
    err(res, error);
  }
};

export default {
  uploadImage,
};
