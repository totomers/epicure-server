import express from "express";
import restaurantRoutes from "./restaurant.route";
import chefRoutes from "./chef.route";
import dishRoutes from "./dish.route";
import uploadRoutes from "./upload.route";
import mongoose from "mongoose";
const router = express.Router();
router.use((req, res, next) => {
  console.log("V1 hii to you too, darling");
  next();
});

router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
// app.use("/api/restaurants", restaurantRoutes);
router.use("/chefs", chefRoutes);
router.use("/uploads", uploadRoutes);

export = router;
