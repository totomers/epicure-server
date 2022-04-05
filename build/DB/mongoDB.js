"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "mongoDB";
//==========================================================
//                 CONNECTION TO MONGODB
//==========================================================
mongoose_1.default
    .connect(config_1.default.mongo.url, config_1.default.mongo.options)
    .then((result) => {
    logging_1.default.info(NAMESPACE, "connected to mongoDB~!");
})
    .catch((error) => {
    logging_1.default.error(NAMESPACE, error.message, error);
});
const conn = mongoose_1.default.connection;
exports.default = conn;
