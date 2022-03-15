import fs from "fs";
// import entire SDK
import AWS from "aws-sdk";

// // import individual service
import S3 from "aws-sdk/clients/s3";
import config from "../config/config";
import { err, ok } from "../_helpers";

const s3 = new S3(config.s3);
//We can use multer or node fs to read an image file and upload it to the Body of the upload
//putObject() take a call back function or we can turn it to a promise or we can use an asynchronous self invoking function

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    console.log(file);
    const description = req.body.description;
    const fileStream = fs.createReadStream(file.path);
    console.log(file.path);
    const putParams = {
      Body: fileStream,
      Bucket: "epicure-uploads",
      Key: file.filename,
    };
    // console.log(putParams);

    const result = await s3.putObject(putParams).promise();
    ok(res, { url: result });
  } catch (error) {
    err(res, error);
  }
};

export default {
  uploadImage,
};
