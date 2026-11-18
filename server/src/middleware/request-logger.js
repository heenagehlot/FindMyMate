export function requestLogger(request, response, next) {
  const startedAt = process.hrtime.bigint();

  response.once("finish", () => {
    const route = request.route ? `${request.baseUrl}${request.route.path}` : "unmatched";
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;

    console.info(JSON.stringify({
      event: "http_request",
      method: request.method,
      route,
      status: response.statusCode,
      durationMs: Math.round(durationMs * 100) / 100,
    }));
  });

  next();
}
