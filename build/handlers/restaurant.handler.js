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
exports.deleteRestaurantDb = exports.updateRestaurantDb = exports.createRestaurantDb = exports.getRestaurantsSignatureDishesDb = exports.getRestaurantDb = exports.getRestaurantsOfChefDb = exports.getPopularRestaurantsDb = exports.getAllRestaurantsDb = void 0;
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const dish_model_1 = __importDefault(require("../models/dish.model"));
const mongoDB_1 = __importDefault(require("../DB/mongoDB"));
const getAllRestaurantsDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_model_1.default.find()
            .populate("chef")
            .populate("signatureDish")
            .exec();
        return { success: restaurants };
    }
    catch (error) {
        return { error };
    }
});
exports.getAllRestaurantsDb = getAllRestaurantsDb;
const getPopularRestaurantsDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_model_1.default.find({ isPopular: true })
            .populate("chef")
            .exec();
        return { success: restaurants };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
});
exports.getPopularRestaurantsDb = getPopularRestaurantsDb;
const getRestaurantsOfChefDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_model_1.default.find({ chef: _id });
        return { success: restaurants };
    }
    catch (error) {
        return { error };
    }
});
exports.getRestaurantsOfChefDb = getRestaurantsOfChefDb;
const getRestaurantDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield restaurant_model_1.default.findById(_id);
        return { success: restaurant };
    }
    catch (error) {
        return { error };
    }
});
exports.getRestaurantDb = getRestaurantDb;
const getRestaurantsSignatureDishesDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurantsWithDishes = yield restaurant_model_1.default.find({
            signatureDish: { $exists: true },
        })
            .select({ signatureDish: 1, name: 1 })
            .populate("signatureDish")
            .exec();
        const dishes = restaurantsWithDishes.map((r) => ({
            signatureDish: r.signatureDish,
            restaurantName: r.name,
        }));
        console.log("dishes", dishes);
        return { success: dishes };
    }
    catch (error) {
        return { error };
    }
});
exports.getRestaurantsSignatureDishesDb = getRestaurantsSignatureDishesDb;
const createRestaurantDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("restaurants", props);
        const { name, url, chef, signatureDish, isPopular } = props;
        const newRestaurant = new restaurant_model_1.default({
            name,
            url,
            chef,
            signatureDish: signatureDish ? signatureDish : null,
            isPopular,
        });
        const restaurant = yield newRestaurant.save();
        return { success: restaurant };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
});
exports.createRestaurantDb = createRestaurantDb;
const updateRestaurantDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, url, chef, isPopular, signatureDish, _id } = props;
        console.log(props);
        const updatedRestaurant = yield restaurant_model_1.default.findByIdAndUpdate(_id, { name, url, chef, isPopular, signatureDish }, {
            new: true,
        })
            .populate("chef")
            .populate("signatureDish")
            .exec();
        return { success: updatedRestaurant };
    }
    catch (error) {
        return { error };
    }
});
exports.updateRestaurantDb = updateRestaurantDb;
const deleteRestaurantDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    let deleted;
    try {
        const session = yield mongoDB_1.default.startSession();
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            yield dish_model_1.default.deleteMany({ restaurant: _id }, { session });
            deleted = yield restaurant_model_1.default.findByIdAndDelete(_id, { session });
        }));
        session.endSession();
        return { success: (deleted === null || deleted === void 0 ? void 0 : deleted._id) ? true : false };
    }
    catch (error) {
        return { error };
    }
});
exports.deleteRestaurantDb = deleteRestaurantDb;
