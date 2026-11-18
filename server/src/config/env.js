import { z } from "zod";

const developmentOrigins = "http://localhost:4173,http://127.0.0.1:4173";
const environmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  HOST: z.string().trim().min(1).default("127.0.0.1"),
  CORS_ORIGINS: z.string().optional(),
});

function isHttpOrigin(value) {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) && url.origin === value;
  } catch {
    return false;
  }
}

export function loadConfig(source = process.env) {
  const parsed = environmentSchema.safeParse(source);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "environment"}: ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid server configuration: ${details}`);
  }

  const rawOrigins = parsed.data.CORS_ORIGINS
    ?? (parsed.data.NODE_ENV === "production" ? "" : developmentOrigins);
  const corsOrigins = rawOrigins.split(",").map((origin) => origin.trim()).filter(Boolean);

  if (corsOrigins.length === 0 || corsOrigins.some((origin) => !isHttpOrigin(origin))) {
    throw new Error("Invalid server configuration: CORS_ORIGINS must be a comma-separated list of explicit HTTP or HTTPS origins.");
  }

  return {
    nodeEnv: parsed.data.NODE_ENV,
    port: parsed.data.PORT,
    host: parsed.data.HOST,
    corsOrigins: [...new Set(corsOrigins)],
  };
}

export const config = loadConfig();
