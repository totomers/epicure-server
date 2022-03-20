import mongoose from "mongoose";
import config from "../config/config";
import logging from "../config/logging";

const NAMESPACE = "mongoDB";
//==========================================================
//                 CONNECTION TO MONGODB
//==========================================================
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then((result) => {
    logging.info(NAMESPACE, "connected to mongoDB~!");
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error);
  });

const conn = mongoose.connection;

export default conn;
