import express from "express";
import controller from "../../../controllers/chef.controller";

const router = express.Router();

router.get("/", controller.getAllChefs);
router.get("/weekly", controller.getWeeklyChef);
router.post("/create", controller.createChef);
router.put("/update/:id", controller.updateChef);
router.delete("/:id", controller.deleteChef);

export = router;
