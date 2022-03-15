import http from "http";
import express from "express";
import bodyParser from "body-parser";
import logging from "./config/logging";
import config from "./config/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressJwt from "express-jwt";
import apiRoute from "./routes/api";
import AWS from "aws-sdk";
import "./DB/mongoDB";
const NAMESPACE = "Server";
const app = express();

AWS.config.getCredentials(function (err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});

//==========================================================
//             TRACKING REQUESTS DURING DEVELOPMENT
//==========================================================

app.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );
  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });
  next();
});

//==========================================================
//                   INCOMING DATA EXTRACTION
//==========================================================

//parse incoming req data
app.use(bodyParser.urlencoded({ extended: false }));
//JSON every response we send back
app.use(bodyParser.json());
//For extracting tokens
app.use(cookieParser());

//==========================================================
//             SERVER SECURITY AND ALLOWED REQUESTS
//==========================================================

//this allows for requests to come from ANYWHERE

app.use(cors(config.cors));

// comment out this line if you want to bypass JWT check during development
// When client attaches "bearer token" , expressJwt verifies it and if it is authenticated it will
// app.use(
//   expressJwt({
//     secret: config.jwtSecret,
//     algorithms: ["HS256"],
//     requestProperty: "user",  //default token claims available under req.user
//   }).unless({
//     path: [
//       "/api/users/register",
//       "/api/users/login",
//       "/api/users/logout",
//       "/api/users",
//     ],
//   })
// );

//==========================================================
//                     ROUTERS
//==========================================================
// app.use("/api/restaurants", restaurantRoutes);
// app.use("/api/chefs", chefRoutes);
// app.use("/api/uploads", uploadRoutes);
app.use("/api", apiRoute);
app.use(express.static("public"));

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

const httpServer = http.createServer(app);
httpServer.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server running on ${config.server.hostname}:${config.server.port}`
  );
});
