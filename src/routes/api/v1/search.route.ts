import express from "express";
import controller from "../../../controllers/search.controller";

const router = express.Router();

router.get("/count", controller.countAllDocuments);
router.get("/name/:name", controller.getAllContent);

export = router;
