import express, { Request, Response } from "express";
import dotenv from "dotenv";
import feedbackRoutes from "./routes/feedback.routes";
import userRoutes from "./routes/user.routes";
import testRoutes from "./routes/test.routes";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 3000;
export const saltRounds = 10;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.CLIENT_URL || "https://pulse-sentiment.vercel.app/",
].filter(Boolean);
app.use(cookieParser());
// Custom CORS middleware (Express 5 compatible with credentials support)
app.use((req, res, next) => {
  const origin = req.headers.origin as string;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
    return res.sendStatus(204);
  }

  next();
});

// Parse JSON
app.use(express.json());

// Health check route
app.get("/health/server", async (req: Request, res: Response) => {
  res.json({ message: "Server is running !" });
});

// Application routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/user", userRoutes);
app.use("/api/test", testRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
