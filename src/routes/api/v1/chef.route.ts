import express from "express";
import controller from "../../../controllers/chef.controller";

const router = express.Router();

router.get("/", controller.getAllChefs);
router.get("/:id", controller.getChef);
router.post("/create", controller.createChef);
// router.put("/update", controller.updateRestaurant);
// router.delete("/delete", controller.deleteRestaurant);

export = router;
