import express from "express";
import controller from "../../../controllers/dish.controller";
const router = express.Router();

router.get("/getAll", controller.getAllDishes);
router.get("/ofRestaurant/:_id", controller.getDishesOfRestaurant);
router.get("/getDish/:_id", controller.getDish);
router.post("/create", controller.createDish);
router.put("/update/:_id", controller.updateDish);
router.delete("/:_id", controller.deleteDish);

export = router;
