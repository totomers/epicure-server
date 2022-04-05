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
exports.deleteChefDb = exports.updateWeeklyChefDb = exports.updateChefDb = exports.getWeeklyChefDb = exports.createChefDb = exports.getChefDb = exports.getAllChefsDb = void 0;
const chef_model_1 = __importDefault(require("../models/chef.model"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const mongoDB_1 = __importDefault(require("../DB/mongoDB"));
const getAllChefsDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chefs = yield chef_model_1.default.find();
        return { success: chefs };
    }
    catch (error) {
        return { error };
    }
});
exports.getAllChefsDb = getAllChefsDb;
const getChefDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chef = yield chef_model_1.default.findById(_id);
        return { success: chef };
    }
    catch (error) {
        return { error };
    }
});
exports.getChefDb = getChefDb;
const createChefDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, url, descr } = props;
        const newChef = new chef_model_1.default({ name, url, descr });
        const chef = yield newChef.save();
        return { success: chef };
    }
    catch (error) {
        return { error };
    }
});
exports.createChefDb = createChefDb;
const getWeeklyChefDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const weeklyChef = yield chef_model_1.default.findOne({ isWeekly: true });
        return { success: weeklyChef };
    }
    catch (error) {
        return { error };
    }
});
exports.getWeeklyChefDb = getWeeklyChefDb;
const updateChefDb = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, descr, url, _id } = props;
    try {
        const updatedChef = yield chef_model_1.default.findByIdAndUpdate(_id, { name, descr, url }, { new: true });
        return { success: updatedChef };
    }
    catch (error) {
        return { error };
    }
});
exports.updateChefDb = updateChefDb;
const updateWeeklyChefDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield mongoDB_1.default.startSession();
        let updatedChef;
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            yield chef_model_1.default.findOneAndUpdate({ isWeekly: true }, { isWeekly: false }, { new: true });
            updatedChef = yield chef_model_1.default.findByIdAndUpdate(_id, { isWeekly: true }, { new: true });
        }));
        session.endSession();
        return { success: updatedChef };
    }
    catch (error) {
        return { error };
    }
});
exports.updateWeeklyChefDb = updateWeeklyChefDb;
const deleteChefDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    let deleted;
    try {
        const session = yield mongoDB_1.default.startSession();
        yield session.withTransaction(() => __awaiter(void 0, void 0, void 0, function* () {
            yield restaurant_model_1.default.deleteMany({ chef: _id }, { session });
            deleted = yield chef_model_1.default.findByIdAndDelete(_id, { session });
        }));
        session.endSession();
        return { success: (deleted === null || deleted === void 0 ? void 0 : deleted._id) ? true : false };
    }
    catch (error) {
        return { error };
    }
});
exports.deleteChefDb = deleteChefDb;
