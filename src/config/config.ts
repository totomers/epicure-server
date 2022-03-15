import dotenv from "dotenv";
const path = require("path");
dotenv.config({ path: __dirname + "/./../.env" });
const JWT_SECRET = process.env.JWT_SECRET || "secret";

const CORS_CONFIG = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

const S3_CONFIG = {
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  wtimeoutMS: 30000,
  keepAlive: true,
  maxPoolSize: 50,
  autoIndex: false,
  retryWrites: false,
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || "epicure";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "epicure12345";
const MONGO_HOST =
  process.env.MONGO_HOST ||
  "cluster0.swbua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`,
};

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 4000;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  cors: CORS_CONFIG,
  jwtSecret: JWT_SECRET,
  mongo: MONGO,
  server: SERVER,
  s3: S3_CONFIG,
};

export default config;
