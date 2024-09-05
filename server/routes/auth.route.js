import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", Controller.singup);

router.post("/signup", Controller.singup);

router.post("/login", Controller);

router.post("/logout", Controller);

export default router;
