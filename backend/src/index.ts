import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./lib/db";
import authRoutes from "./routes/auth.route";

const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
    connectDB();
})
