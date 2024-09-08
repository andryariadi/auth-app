import express from "express";
import Controller from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", Controller.singup);

router.post("/login", Controller.login);

router.post("/logout", Controller.logout);

router.post("/verify-email", Controller.verifyEmail);

router.post("/forgot-password", Controller.forgotPassword);

router.post("/reset-password/:token", Controller.resetPassword);

router.get("/check-auth", verifyToken, Controller.checkAuth);

export default router;
