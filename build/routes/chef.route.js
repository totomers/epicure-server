"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const chef_controller_1 = __importDefault(require("../controllers/chef.controller"));
const router = express_1.default.Router();
router.get("/", chef_controller_1.default.getAllChefs);
router.post("/create", chef_controller_1.default.createChef);
module.exports = router;
