import express from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import asyncHandler from "../middleware/asyncHandler.middleware";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", login);
router.post("/logout", logout);

export default router;


