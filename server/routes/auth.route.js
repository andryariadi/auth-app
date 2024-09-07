import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", Controller.singup);

router.post("/login", Controller);

router.post("/logout", Controller.logout);

router.post("/verify-email", Controller.verifyEmail);

export default router;
