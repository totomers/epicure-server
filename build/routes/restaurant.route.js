"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const restaurant_controller_1 = __importDefault(require("../controllers/restaurant.controller"));
const router = express_1.default.Router();
router.get("/getAll", restaurant_controller_1.default.getAllRestaurants);
router.post("/create", restaurant_controller_1.default.createRestaurant);
router.put("/update", restaurant_controller_1.default.updateRestaurant);
router.delete("/delete", restaurant_controller_1.default.deleteRestaurant);
module.exports = router;
