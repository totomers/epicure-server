import express from "express";
import controller from "../../../controllers/search.controller";

const router = express.Router();

router.get("/:name", controller.getAllContent);

export = router;
