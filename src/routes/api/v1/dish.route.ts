import express from "express";
import controller from "../../../controllers/dish.controller";
const router = express.Router();

router.get("/", controller.getAllDishes);
router.post("/create", controller.createDish);
router.put("/update/:id", controller.updateDish);
router.delete("/:id", controller.deleteDish);

export = router;
