import express from "express";
import controller from "../../../controllers/user.controller";
const router = express.Router();
router.post("/authenticate", controller.authenticateUser);
router.get("/getUser", controller.getAuthenticatedUser);
router.post("/register", controller.createUser);
router.post("/isEmailTaken", controller.isEmailTaken);
router.post("/refresh", controller.refreshAccessToken);
router.post("/logout", controller.logout);

export = router;
