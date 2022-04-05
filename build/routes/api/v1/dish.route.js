"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const dish_controller_1 = __importDefault(require("../../../controllers/dish.controller"));
const router = express_1.default.Router();
router.get("/getAll", dish_controller_1.default.getAllDishes);
router.get("/ofRestaurant/:_id", dish_controller_1.default.getDishesOfRestaurant);
router.get("/getDish/:_id", dish_controller_1.default.getDish);
router.post("/create", dish_controller_1.default.createDish);
router.put("/update/:_id", dish_controller_1.default.updateDish);
router.delete("/:_id", dish_controller_1.default.deleteDish);
module.exports = router;
