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
const restaurant_handler_1 = require("../handlers/restaurant.handler");
const _helpers_1 = require("../_helpers");
const NAMESPACE = "Controllers restaurant.ts";
const getAllRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getAllRestaurants function called");
    const results = yield (0, restaurant_handler_1.getAllRestaurantsDb)();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { restaurants: results.success });
});
const getPopularRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getPopularRestaurants function called");
    const results = yield (0, restaurant_handler_1.getPopularRestaurantsDb)();
    console.log("results", results);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { restaurants: results.success });
});
const getRestaurantsOfChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getRestaurantsOfChef function called");
    const { _id } = req.params;
    const results = yield (0, restaurant_handler_1.getRestaurantsOfChefDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { restaurants: results.success });
});
const getRestaurantsSignatureDishes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getSignatureDishesOfRestaurants function called");
    const results = yield (0, restaurant_handler_1.getRestaurantsSignatureDishesDb)();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { signatureDishes: results.success });
});
const getRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getRestaurant function called");
    const { _id } = req.params;
    const results = yield (0, restaurant_handler_1.getRestaurantDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { restaurant: results.success }, true);
});
const createRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createRestaurant function called");
    const { name, url, chef, isPopular, signatureDish } = req.body;
    const results = yield (0, restaurant_handler_1.createRestaurantDb)({
        name,
        url,
        chef,
        isPopular,
        signatureDish,
    });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { newRestaurant: results.success });
});
const updateRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createTopic function called");
    const { _id } = req.params;
    const { name, url, chef, isPopular } = req.body;
    const results = yield (0, restaurant_handler_1.updateRestaurantDb)({ name, url, chef, isPopular, _id });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { updatedRestaurant: results.success });
});
const deleteRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createTopic function called");
    const { _id } = req.params;
    const results = yield (0, restaurant_handler_1.deleteRestaurantDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { deleted: results.success });
});
exports.default = {
    getAllRestaurants,
    getPopularRestaurants,
    getRestaurantsOfChef,
    getRestaurant,
    getRestaurantsSignatureDishes,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};
