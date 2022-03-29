import express from "express";
import controller from "../../../controllers/s3.controller";
const router = express.Router();

router.get("/", controller.getUrlFromS3);

export = router;
