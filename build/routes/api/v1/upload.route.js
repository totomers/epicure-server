"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const upload_controller_1 = __importDefault(require("../../../controllers/upload.controller"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ dest: "uploads/" });
const router = express_1.default.Router();
router.post("/", upload.single("image"), upload_controller_1.default.uploadImage);
module.exports = router;
