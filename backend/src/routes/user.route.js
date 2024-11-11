import { Router } from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getAllusers } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllusers);

export default router;
