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
exports.countAllDocumentsDb = exports.getAllContentDb = void 0;
const chef_model_1 = __importDefault(require("../models/chef.model"));
const dish_model_1 = __importDefault(require("../models/dish.model"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const getAllContentDb = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_model_1.default.find({
            name: { $regex: name, $options: "i" },
        }).select({ name: 1, _id: 1, url: 1 });
        const dishes = yield dish_model_1.default.find({
            name: { $regex: name, $options: "i" },
        }).select({ name: 1, _id: 1, url: 1 });
        const chefs = yield chef_model_1.default.find({
            name: { $regex: name, $options: "i" },
        }).select({ name: 1, _id: 1, url: 1 });
        const filteredResults = [{ restaurants }, { dishes }, { chefs }].reduce((prev, cur, index) => {
            console.log("cur", cur);
            const objectArr = Object.entries(cur);
            const [key, value] = objectArr[0];
            // console.log("onject array:", objectArr);
            // console.log(" value", value);
            // console.log(" key", key);
            //@ts-ignore
            if (value.length > 0)
                prev[`${key}`] = value;
            // console.log("prev.key", prev);
            return prev;
        }, {});
        console.log(filteredResults);
        return {
            success: filteredResults,
        };
    }
    catch (error) {
        return { error };
    }
});
exports.getAllContentDb = getAllContentDb;
const countAllDocumentsDb = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield restaurant_model_1.default.countDocuments();
        const dishes = yield dish_model_1.default.countDocuments();
        const chefs = yield chef_model_1.default.countDocuments();
        return {
            success: { restaurants, dishes, chefs },
        };
    }
    catch (error) {
        return { error };
    }
});
exports.countAllDocumentsDb = countAllDocumentsDb;
