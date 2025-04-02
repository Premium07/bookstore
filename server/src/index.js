import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import { connectDB } from "./config/db.config.js";
import job from "./config/cron.js";

const app = express();
const PORT = process.env.PORT || 8080;
connectDB();
job.start();

// middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" })); // ⬅️ Increased size limit
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// routes

app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
