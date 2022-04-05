"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isEmailTakenDb = exports.logoutDb = exports.getAuthenticatedUserDb = exports.refresh = exports.createUserDb = exports.authenticateUserDb = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const token_model_1 = __importDefault(require("../models/token.model"));
const authenticateUserDb = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email });
        if (!user._id)
            return {
                error: new Error("Please check if email or passowrd is correct."),
                code: 400,
            };
        const isCorrectPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!isCorrectPassword)
            return {
                error: new Error("Please check if email or passowrd is correct."),
            };
        const refreshToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret, {
            expiresIn: "1w",
        });
        const date = new Date();
        date.setDate(date.getDate() + 7);
        yield token_model_1.default.create({
            userId: user._id,
            token: refreshToken,
            expiredAt: date,
        });
        console.log("token expires at:", date);
        const accessToken = jsonwebtoken_1.default.sign({ _id: user._id }, config_1.default.jwtSecret, {
            expiresIn: "10s",
        });
        return {
            success: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                _id: user._id,
                accessToken,
                refreshToken,
            },
        };
    }
    catch (error) {
        return { error };
    }
});
exports.authenticateUserDb = authenticateUserDb;
const createUserDb = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = credentials;
        const user = yield user_model_1.default.create({
            firstName,
            lastName,
            email,
            password: yield bcrypt_1.default.hash(password, 10),
        });
        // const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        return {
            success: {
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id,
                email: user.email,
            },
        };
    }
    catch (error) {
        return { error };
    }
});
exports.createUserDb = createUserDb;
const refresh = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, jsonwebtoken_1.verify)(refreshToken, config_1.default.jwtSecret);
        if (!payload)
            return {
                error: new Error("Unauthenticated."),
                code: 401,
            };
        const refreshTokenDb = yield token_model_1.default.findOne({
            userId: payload._id,
            expiredAt: { $gte: new Date() },
        });
        if (!(refreshTokenDb === null || refreshTokenDb === void 0 ? void 0 : refreshTokenDb._id))
            return {
                error: new Error("Unauthenticated."),
                code: 401,
            };
        const accessToken = jsonwebtoken_1.default.sign({ _id: payload._id }, config_1.default.jwtSecret, {
            expiresIn: "30s",
        });
        return {
            success: {
                accessToken,
            },
        };
    }
    catch (error) {
        return {
            error,
            code: 401,
        };
    }
});
exports.refresh = refresh;
const getAuthenticatedUserDb = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, jsonwebtoken_1.verify)(accessToken, config_1.default.jwtSecret);
        if (!payload)
            return {
                error: new Error("Unauthenticated."),
                code: 401,
            };
        const user = yield user_model_1.default.findById(payload._id);
        delete user.password;
        return {
            success: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            },
        };
    }
    catch (error) {
        return {
            error,
            code: 401,
        };
    }
});
exports.getAuthenticatedUserDb = getAuthenticatedUserDb;
const logoutDb = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedToken = yield token_model_1.default.findOneAndDelete({
            token: refreshToken,
        });
        return {
            success: {
                deleted: true,
            },
        };
    }
    catch (error) {
        return {
            error,
        };
    }
});
exports.logoutDb = logoutDb;
const isEmailTakenDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(email);
        const user = yield user_model_1.default.findOne({ email });
        return {
            success: {
                isEmailTaken: (user === null || user === void 0 ? void 0 : user._id) ? true : false,
            },
        };
    }
    catch (error) {
        return { error };
    }
});
exports.isEmailTakenDb = isEmailTakenDb;
