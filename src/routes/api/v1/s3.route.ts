import express from "express";
import controller from "../../../controllers/s3.controller";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.get("/", controller.getUrlFromS3);

export = router;
