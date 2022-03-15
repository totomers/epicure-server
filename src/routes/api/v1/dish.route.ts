import express from "express";
import controller from "../../../controllers/dish.controller";
const router = express.Router();

router.get("/", controller.getAllDishes);
router.post("/create", controller.createDish);

export = router;
