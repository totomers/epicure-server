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
exports.deleteDishDb = exports.updateDishDb = exports.createDishDb = exports.getDishDb = exports.getDishesOfRestaurantDb = exports.getAllDishesDb = void 0;
const dish_model_1 = __importDefault(require("../models/dish.model"));
const getAllDishesDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishes = yield dish_model_1.default.find().populate("restaurant").exec();
        return { success: dishes };
    }
    catch (error) {
        return { error };
    }
});
exports.getAllDishesDb = getAllDishesDb;
const getDishesOfRestaurantDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dishes = yield dish_model_1.default.find({ restaurant: _id });
        return { success: dishes };
    }
    catch (error) {
        return { error };
    }
});
exports.getDishesOfRestaurantDb = getDishesOfRestaurantDb;
const getDishDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dish = yield dish_model_1.default.findById(_id);
        return { success: dish };
    }
    catch (error) {
        return { error };
    }
});
exports.getDishDb = getDishDb;
const createDishDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDish = yield dish_model_1.default.create(props);
        const dish = yield dish_model_1.default.findById(newDish._id).populate("restaurant").exec();
        return { success: dish };
    }
    catch (error) {
        console.log(error);
        return { error };
    }
});
exports.createDishDb = createDishDb;
const updateDishDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, url, price, tags, ingredients, restaurant, _id } = props;
    try {
        const updatedDish = yield dish_model_1.default.findByIdAndUpdate(_id, { name, url, price, tags, ingredients, restaurant }, { new: true })
            .populate("restaurant")
            .exec();
        return { success: updatedDish };
    }
    catch (error) {
        return { error };
    }
});
exports.updateDishDb = updateDishDb;
const deleteDishDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield dish_model_1.default.findByIdAndDelete(_id);
        return { success: deleted._id ? true : false };
    }
    catch (error) {
        return { error };
    }
});
exports.deleteDishDb = deleteDishDb;
