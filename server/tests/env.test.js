import assert from "node:assert/strict";
import test from "node:test";
import { loadConfig } from "../src/config/env.js";

test("uses loopback development defaults and the prototype origins", () => {
  assert.deepEqual(loadConfig({}), {
    nodeEnv: "development",
    port: 3000,
    host: "127.0.0.1",
    corsOrigins: ["http://localhost:4173", "http://127.0.0.1:4173"],
  });
});

test("requires explicit CORS origins in production", () => {
  assert.throws(
    () => loadConfig({ NODE_ENV: "production" }),
    /CORS_ORIGINS must be a comma-separated list/,
  );
});

test("rejects wildcard and invalid CORS origins", () => {
  assert.throws(
    () => loadConfig({ CORS_ORIGINS: "*" }),
    /CORS_ORIGINS must be a comma-separated list/,
  );
  assert.throws(
    () => loadConfig({ PORT: "not-a-port" }),
    /PORT/,
  );
});
