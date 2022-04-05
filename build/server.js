"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const logging_1 = __importDefault(require("./config/logging"));
const config_1 = __importDefault(require("./config/config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
require("./DB/mongoDB");
const NAMESPACE = "Server";
const app = (0, express_1.default)();
aws_sdk_1.default.config.getCredentials(function (err) {
    if (err)
        console.log(err.stack);
    // credentials not loaded
    else {
        console.log("Access key:", aws_sdk_1.default.config.credentials.accessKeyId);
    }
});
//==========================================================
//             TRACKING REQUESTS DURING DEVELOPMENT
//==========================================================
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`);
    });
    next();
});
//==========================================================
//                   INCOMING DATA EXTRACTION
//==========================================================
//parse incoming req data
app.use(body_parser_1.default.urlencoded({ extended: false }));
//JSON every response we send back
app.use(body_parser_1.default.json());
//For extracting tokens
app.use((0, cookie_parser_1.default)());
//==========================================================
//             SERVER SECURITY AND ALLOWED REQUESTS
//==========================================================
//this allows for requests to come from ANYWHERE
app.use((0, cors_1.default)(config_1.default.cors));
// comment out this line if you want to bypass JWT check during development
// When client attaches "bearer token" , expressJwt verifies it and if it is authenticated it will
// app.use(
//   expressJwt({
//     secret: config.jwtSecret,
//     algorithms: ["HS256"],
//     requestProperty: "user", //default token claims available under req.user
//   }).unless({
//     path: [
//       "/api/v1/restaurants/getAll",
//       "/api/v1/restaurants/popular",
//       "/api/v1/restaurants/signatureDishes",
//       /\/api\/v1\/restaurants\/ofChef/i,
//       /\/api\/v1\/restaurants\/getRestaurant/i,
//       "/api/v1/chefs/getAll",
//       /\/api\/v1\/chefs\/getChef/i,
//       "/api/v1/chefs/weekly",
//       "/api/v1/dishes/getAll",
//       /\/api\/v1\/dishes\/ofRestaurant/i,
//       /\/api\/v1\/dishes\/getDish/i,
//       "/api/v1/search/count",
//       /\/api\/v1\/search\/name/i,
//       "/api/v1/users/register",
//       "/api/v1/users/refresh",
//       "/api/v1/users/isEmailTaken",
//       "/api/v1/users/authenticate",
//       "/api/v1/users/logout",
//       "/api/v1/s3",
//     ],
//   })
// );
//CHECK IF YOU CAN GET CUSTOM ERRORS WITH EXPRESSJWT ±±±±±±±±±±
//==========================================================
//                     ROUTERS
//==========================================================
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/chefs", chefRoutes);
// app.use("/api/uploads", uploadRoutes);
app.use(express_1.default.static("public"));
app.use("/api", api_1.default);
//==========================================================
//                  ERROR HANDLING
//==========================================================
app.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({ message: error.message });
});
//==========================================================
//                 SERVER INITIALIZATION
//==========================================================
const httpServer = http_1.default.createServer(app);
httpServer.listen(config_1.default.server.port, () => {
    logging_1.default.info(NAMESPACE, `Server running on ${config_1.default.server.hostname}:${config_1.default.server.port}`);
});
