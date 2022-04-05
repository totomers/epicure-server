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
const chef_handler_1 = require("../handlers/chef.handler");
const _helpers_1 = require("../_helpers");
const NAMESPACE = "Controllers chef.ts";
const getAllChefs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "gertAllChefs function called");
    const results = yield (0, chef_handler_1.getAllChefsDb)();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { chefs: results.success });
});
const getChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getChef function called");
    const { _id } = req.params;
    const results = yield (0, chef_handler_1.getChefDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { chef: results.success });
});
const createChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createChef function called");
    const { name, url, descr } = req.body;
    const results = yield (0, chef_handler_1.createChefDb)({ name, url, descr });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { newChef: results.success }, true);
});
const getWeeklyChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getChef function called");
    const results = yield (0, chef_handler_1.getWeeklyChefDb)();
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { weeklyChef: results.success });
});
const updateChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "updateChef function called");
    const { _id } = req.params;
    const { name, descr, isWeekly, url } = req.body;
    const results = yield (0, chef_handler_1.updateChefDb)({ name, descr, isWeekly, url, _id });
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { updatedChef: results.success }, true);
});
const updateWeeklyChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "updateWeeklyChef function called");
    const { _id } = req.params;
    if (!_id)
        (0, _helpers_1.err)(res, new Error("missing _id"));
    const results = yield (0, chef_handler_1.updateWeeklyChefDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { updatedChef: results.success }, true);
});
const deleteChef = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getChef function called");
    const { _id } = req.params;
    const results = yield (0, chef_handler_1.deleteChefDb)(_id);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    else
        (0, _helpers_1.ok)(res, { deleted: results.success });
});
exports.default = {
    getAllChefs,
    getChef,
    createChef,
    getWeeklyChef,
    updateWeeklyChef,
    deleteChef,
    updateChef,
};
