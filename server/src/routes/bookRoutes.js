import { Router } from "express";
import {
  createBook,
  deleteBook,
  getBooks,
  userBooks,
} from "../controllers/bookController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
const router = Router();

router.post("/", isAuthenticated, createBook);
router.get("/", isAuthenticated, getBooks);
router.get("/user", isAuthenticated, userBooks);
router.delete("/:id", isAuthenticated, deleteBook);

export default router;
