import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import morgan from "morgan";


dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173", // Vite dev server
    process.env.CLIENT_URL   // Production (Vercel frontend URL from .env)
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req, res) => {
    res.send("Lead Management System API is running 🚀");
});

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("😛 Connected to MongoDB");
        app.listen(PORT, () => console.log(`🌧️ Server running on port ${PORT}`));
    })
    .catch((err) => console.error("❌ DB connection error:", err));
