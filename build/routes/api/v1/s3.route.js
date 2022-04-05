"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const s3_controller_1 = __importDefault(require("../../../controllers/s3.controller"));
const router = express_1.default.Router();
router.get("/", s3_controller_1.default.getUrlFromS3);
module.exports = router;
