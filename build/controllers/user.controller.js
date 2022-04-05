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
exports.isEmailTaken = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const user_handler_1 = require("../handlers/user.handler");
const _helpers_1 = require("../_helpers");
const NAMESPACE = "Controllers restaurant.ts";
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "getUser function called");
    const { email, password } = req.body;
    const results = yield (0, user_handler_1.authenticateUserDb)(email, password);
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else {
        res.cookie("refreshToken", results.success.refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }); // 7 days
        const user = {
            firstName: results.success.firstName,
            lastName: results.success.lastName,
            email: results.success.email,
            _id: results.success._id,
            token: results.success.accessToken,
        };
        (0, _helpers_1.ok)(res, { user });
    }
});
const getAuthenticatedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    logging_1.default.info(NAMESPACE, "getAuthenticatedUser function called");
    const accessToken = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
    console.log(accessToken);
    const results = yield (0, user_handler_1.getAuthenticatedUserDb)(accessToken);
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else {
        (0, _helpers_1.ok)(res, { user: results.success });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "createUser function called");
    const { firstName, lastName, email, password } = req.body;
    const results = yield (0, user_handler_1.createUserDb)({ firstName, lastName, email, password });
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else
        (0, _helpers_1.ok)(res, { user: results.success });
});
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "refreshAccessToken function called");
    const refreshToken = req.cookies["refreshToken"];
    const results = yield (0, user_handler_1.refresh)(refreshToken);
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else {
        (0, _helpers_1.ok)(res, { token: results.success.accessToken });
    }
});
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logging_1.default.info(NAMESPACE, "logout function called");
    const refreshToken = req.cookies["refreshToken"];
    const results = yield (0, user_handler_1.logoutDb)(refreshToken);
    res.cookie("refreshToken", "", { maxAge: 0 });
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else {
        (0, _helpers_1.ok)(res, { loggedOut: true });
    }
});
const isEmailTaken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hiiii");
    const { email } = req.body;
    // if (!email) errMissing(res);
    const results = yield (0, user_handler_1.isEmailTakenDb)(email);
    if (results.error)
        (0, _helpers_1.err)(res, results.error, results.code);
    else {
        (0, _helpers_1.ok)(res, { isEmailTaken: results.success.isEmailTaken });
    }
});
exports.isEmailTaken = isEmailTaken;
exports.default = {
    authenticateUser,
    createUser,
    refreshAccessToken,
    logout,
    getAuthenticatedUser,
    isEmailTaken: exports.isEmailTaken,
};
