import { Router } from "express";
import { createBook } from "../controllers/bookController.js";
const router = Router();

router.post("/create", createBook);

export default router;
