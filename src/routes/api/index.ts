import express from "express";
import v1 from "./v1";

const router = express.Router();

router.use((req, res, next) => {
  console.log("hiiiii");
  next();
});
router.use("/v1", v1);

export = router;
