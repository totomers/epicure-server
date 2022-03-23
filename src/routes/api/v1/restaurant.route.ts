import express from "express";
import controller from "../../../controllers/restaurant.controller";

const router = express.Router();

router.get("/", controller.getAllRestaurants);
router.get("/popular", controller.getPopularRestaurants);
router.get("/signatureDishes", controller.getRestaurantsSignatureDishes);
router.get("/ofChef/:_id", controller.getRestaurantsOfChef);
router.get("/:_id", controller.getRestaurant);
router.post("/create", controller.createRestaurant);
router.put("/update/:_id", controller.updateRestaurant);
router.delete("/:_id", controller.deleteRestaurant);

export = router;
