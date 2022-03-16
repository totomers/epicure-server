import express from "express";
import restaurantRoutes from "./restaurant.route";
import chefRoutes from "./chef.route";
import dishRoutes from "./dish.route";
import searchRoutes from "./search.route";
import uploadRoutes from "./upload.route";
const router = express.Router();

router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
router.use("/chefs", chefRoutes);
router.use("/search", searchRoutes);
router.use("/uploads", uploadRoutes);

export = router;
