import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8080;

// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
