"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../../../controllers/user.controller"));
const router = express_1.default.Router();
router.post("/authenticate", user_controller_1.default.authenticateUser);
router.get("/getUser", user_controller_1.default.getAuthenticatedUser);
router.post("/register", user_controller_1.default.createUser);
router.post("/isEmailTaken", user_controller_1.default.isEmailTaken);
router.post("/refresh", user_controller_1.default.refreshAccessToken);
router.post("/logout", user_controller_1.default.logout);
module.exports = router;
