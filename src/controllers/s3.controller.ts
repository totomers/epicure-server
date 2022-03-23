import fs from "fs";
// import entire SDK
import AWS from "aws-sdk";

// // import individual service
import S3 from "aws-sdk/clients/s3";
import config from "../config/config";
import { err, ok } from "../_helpers";
import { Request, Response } from "express";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);
const s3 = new S3({
  region: config.s3.region,

  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,

  signatureVersion: "v4",
});

const getUrlFromS3 = async (req: Request, res: Response) => {
  const results = await generateUploadUrl();
  if (results.error) err(res, results.error);
  else ok(res, { url: results.success }, true);
};

const generateUploadUrl = async () => {
  try {
    const rawBytes = await randomBytes(16);
    const imageName = rawBytes.toString("hex");
    console.log("imageName", imageName);
    const params = {
      Bucket: config.s3.bucketName,
      Key: imageName,
      Expires: 60,
    };
    console.log(params);

    const uploadURL = await s3.getSignedUrlPromise("putObject", params);
    return { success: uploadURL };
  } catch (error) {
    return { error };
  }
};

export default {
  getUrlFromS3,
};
