"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logging_1 = __importDefault(require("../config/logging"));
const dish_handler_1 = require("../handlers/dish.handler");
const _helpers_1 = require("../_helpers");
const NAMESPACE = "Controllers dish.ts";
const getAllDishes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getAllDishes function called");
    const results = yield (0, dish_handler_1.getAllDishesDb)();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { dishes: results.success });
});
const getDishesOfRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getAllDishes function called");
    const { _id } = req.params;
    const results = yield (0, dish_handler_1.getDishesOfRestaurantDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { dishes: results.success });
});
const getDish = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getDish function called");
    const { _id } = req.params;
    const results = yield (0, dish_handler_1.getDishDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { dish: results.success }, true);
});
const createDish = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createDish function called");
    const { name, url, ingredients, tags, price, restaurant } = req.body;
    const results = yield (0, dish_handler_1.createDishDb)({
        name,
        url,
        ingredients,
        tags,
        price,
        restaurant,
    });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { newDish: results.success }, true);
});
const updateDish = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "updateDish function called");
    const { _id } = req.params;
    const { name, url, price, tags, ingredients, restaurant } = req.body;
    const results = yield (0, dish_handler_1.updateDishDb)({
        name,
        url,
        price,
        tags,
        ingredients,
        restaurant,
        _id,
    });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { updatedDish: results.success }, true);
});
const deleteDish = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "deleteDish function called");
    const { _id } = req.params;
    const results = yield (0, dish_handler_1.deleteDishDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { deleted: results.success });
});
exports.default = {
    getAllDishes,
    getDishesOfRestaurant,
    getDish,
    createDish,
    updateDish,
    deleteDish,
};
