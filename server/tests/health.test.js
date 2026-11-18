import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, before, test } from "node:test";
import { createApp } from "../src/app.js";

let server;
let baseUrl;

before(async () => {
  server = createServer(createApp());
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Test server did not bind to a TCP port.");
  }
  baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
  if (!server?.listening) return;
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("health endpoint reports API liveness with security headers", async () => {
  const response = await fetch(`${baseUrl}/api/v1/health`, {
    headers: { Origin: "http://localhost:4173" },
  });

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { service: "findmymate-api", status: "ok" });
  assert.equal(response.headers.get("access-control-allow-origin"), "http://localhost:4173");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("strict-transport-security"), null);
});

test("unknown routes return a safe JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/v1/missing`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    error: { code: "NOT_FOUND", message: "The requested resource was not found." },
  });
});

test("does not grant CORS access to an unlisted origin", async () => {
  const response = await fetch(`${baseUrl}/api/v1/health`, {
    headers: { Origin: "https://not-allowed.example" },
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("access-control-allow-origin"), null);
});

test("oversized JSON requests return a safe 413 response", async () => {
  const response = await fetch(`${baseUrl}/api/v1/health`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ value: "x".repeat(70 * 1024) }),
  });

  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), {
    error: { code: "INVALID_REQUEST", message: "The request could not be processed." },
  });
});
