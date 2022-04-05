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
const _helpers_1 = require("../_helpers");
const search_handler_1 = require("../handlers/search.handler");
const NAMESPACE = "Controllers search.ts";
const getAllContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getAllContent function called");
    const { name } = req.params;
    const results = yield (0, search_handler_1.getAllContentDb)(name);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    (0, _helpers_1.ok)(res, { results: results.success });
});
const countAllDocuments = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "countAllDocuments function called");
    const { name } = req.params;
    const results = yield (0, search_handler_1.countAllDocumentsDb)(name);
    if (results.error)
        (0, _helpers_1.err)(res, results.error);
    (0, _helpers_1.ok)(res, results.success);
});
exports.default = {
    getAllContent,
    countAllDocuments,
};
