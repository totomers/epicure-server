import express from "express";
import controller from "../../../controllers/restaurant.controller";

const router = express.Router();
router.use((req, res, next) => {
  console.log("hii this is restaurant here");
  next();
});

router.get("/", controller.getAllRestaurants);
router.get("/popular", controller.getPopularRestaurants);
router.post("/create", controller.createRestaurant);
router.put("/update", controller.updateRestaurant);
router.delete("/delete", controller.deleteRestaurant);

export = router;
