import express from "express";
import controller from "../../../controllers/restaurant.controller";

const router = express.Router();

router.get("/", controller.getAllRestaurants);
router.get("/popular", controller.getPopularRestaurants);
router.get("/ofChef/:id", controller.getRestaurantsOfChef);
router.post("/create", controller.createRestaurant);
router.put("/update/:id", controller.updateRestaurant);
router.delete("/:id", controller.deleteRestaurant);

export = router;