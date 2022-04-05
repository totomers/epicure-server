"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const search_controller_1 = __importDefault(require("../../../controllers/search.controller"));
const router = express_1.default.Router();
router.get("/count", search_controller_1.default.countAllDocuments);
router.get("/name/:name", search_controller_1.default.getAllContent);
module.exports = router;
