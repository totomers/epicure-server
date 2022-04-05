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
// // import individual service
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const config_1 = __importDefault(require("../config/config"));
const _helpers_1 = require("../_helpers");
const crypto_1 = __importDefault(require("crypto"));
const util_1 = require("util");
const randomBytes = (0, util_1.promisify)(crypto_1.default.randomBytes);
const s3 = new s3_1.default({
    region: config_1.default.s3.region,
    accessKeyId: config_1.default.s3.accessKeyId,
    secretAccessKey: config_1.default.s3.secretAccessKey,
    signatureVersion: "v4",
});
const getUrlFromS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield generateUploadUrl();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { url: results.success }, true);
});
const generateUploadUrl = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rawBytes = yield randomBytes(16);
        const imageName = rawBytes.toString("hex");
        console.log("imageName", imageName);
        const params = {
            Bucket: config_1.default.s3.bucketName,
            Key: imageName,
            Expires: 60,
        };
        console.log(params);
        const uploadURL = yield s3.getSignedUrlPromise("putObject", params);
        return { success: uploadURL };
    }
    catch (error) {
        return { error };
    }
});
exports.default = {
    getUrlFromS3,
};
