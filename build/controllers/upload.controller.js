"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
// // import individual service
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const config_1 = __importDefault(require("../config/config"));
const _helpers_1 = require("../_helpers");
const s3 = new s3_1.default(config_1.default.s3);
//We can use multer or node fs to read an image file and upload it to the Body of the upload
//putObject() take a call back function or we can turn it to a promise or we can use an asynchronous self invoking function
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const file = req.file;
        // console.log("req", req);
        console.log("file", file);
        const description = req.body.description;
        const fileStream = fs_1.default.createReadStream(file.path);
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
        const result = yield s3.putObject(putParams).promise();
        const url = s3.getSignedUrl("getObject", {
            Bucket: config_1.default.s3.bucketName,
            Key: config_1.default.s3.accessKeyId,
            // Expires: signedUrlExpireSeconds
        });
        console.log(url);
        (0, _helpers_1.ok)(res, { url: result });
    }
    catch (error) {
        (0, _helpers_1.err)(res, error);
    }
});
exports.default = {
    uploadImage,
};
