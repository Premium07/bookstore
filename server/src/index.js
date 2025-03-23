import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./config/db.config.js";

const app = express();
const PORT = process.env.PORT || 8080;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
