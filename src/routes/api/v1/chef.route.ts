import express from "express";
import controller from "../../../controllers/chef.controller";

const router = express.Router();

router.get("/", controller.getAllChefs);
router.get("/weekly", controller.getWeeklyChef);
router.get("/:_id", controller.getChef);
router.post("/create", controller.createChef);
router.put("/update/:_id", controller.updateChef);
router.put("/updateWeekly/:_id", controller.updateWeeklyChef);
router.delete("/:_id", controller.deleteChef);

export = router;
