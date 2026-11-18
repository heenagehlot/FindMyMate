import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { config } from "./config/env.js";
import { errorHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/request-logger.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { healthRouter } from "./routes/health.js";

export function createApp() {
  const app = express();
  app.disable("x-powered-by");

  app.use(helmet({
    strictTransportSecurity: config.nodeEnv === "production" ? undefined : false,
  }));
  app.use(cors({
    origin(origin, callback) {
      callback(null, origin === undefined || config.corsOrigins.includes(origin));
    },
    methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH", "DELETE"],
  }));
  app.use(requestLogger);
  app.use(express.json({ limit: "64kb" }));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: true,
    legacyHeaders: false,
  }));

  app.use("/api/v1", healthRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
