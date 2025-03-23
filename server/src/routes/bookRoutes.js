import { Router } from "express";
import { createBook } from "../controllers/bookController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/create", isAuthenticated, createBook);

export default router;
