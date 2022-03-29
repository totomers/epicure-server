import express from "express";
import controller from "../controllers/restaurant.controller";

const router = express.Router();

router.get("/getAll", controller.getAllRestaurants);
router.post("/create", controller.createRestaurant);
router.put("/update", controller.updateRestaurant);
router.delete("/delete", controller.deleteRestaurant);

export = router;
