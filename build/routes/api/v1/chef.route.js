"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const chef_controller_1 = __importDefault(require("../../../controllers/chef.controller"));
const router = express_1.default.Router();
router.get("/getAll", chef_controller_1.default.getAllChefs);
router.get("/weekly", chef_controller_1.default.getWeeklyChef);
router.get("/getChef/:_id", chef_controller_1.default.getChef);
router.post("/create", chef_controller_1.default.createChef);
router.put("/update/:_id", chef_controller_1.default.updateChef);
router.put("/updateWeekly/:_id", chef_controller_1.default.updateWeeklyChef);
router.delete("/:_id", chef_controller_1.default.deleteChef);
module.exports = router;
