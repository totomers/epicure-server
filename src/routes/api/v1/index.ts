import express from "express";
import restaurantRoutes from "./restaurant.route";
import chefRoutes from "./chef.route";
import dishRoutes from "./dish.route";
import searchRoutes from "./search.route";
import uploadRoutes from "./upload.route";
import userRoutes from "./user.route";
import s3Routes from "./s3.route";
const router = express.Router();

router.use("/restaurants", restaurantRoutes);
router.use("/dishes", dishRoutes);
router.use("/chefs", chefRoutes);
router.use("/search", searchRoutes);
router.use("/uploads", uploadRoutes);
router.use("/users", userRoutes);
router.use("/s3", s3Routes);

export = router;
