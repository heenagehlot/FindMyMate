import { createApp } from "./app.js";
import { config } from "./config/env.js";

const app = createApp();
const server = app.listen(config.port, config.host, () => {
  console.info(`FindMyMate API listening at http://${config.host}:${config.port}`);
});

function shutdown(signal) {
  console.info(`Received ${signal}; closing the API server.`);
  server.close((error) => {
    if (error) {
      console.error("API server shutdown failed.");
      process.exitCode = 1;
    }
  });
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
