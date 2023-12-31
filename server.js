import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const frontendRoot = path.join(__dirname, process.env.FRONTEND_ROOT);

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(frontendRoot)));

  app.get("*", (req, res) =>
    res.sendFile(path.join(frontendRoot, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
