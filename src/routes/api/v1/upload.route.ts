import express from "express";
import controller from "../../../controllers/upload.controller";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("image"), controller.uploadImage);

export = router;
