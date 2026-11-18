export function errorHandler(error, _request, response, next) {
  if (response.headersSent) {
    next(error);
    return;
  }

  const requestedStatus = error.statusCode ?? error.status;
  const status = Number.isInteger(requestedStatus) && requestedStatus >= 400 && requestedStatus < 500
    ? requestedStatus
    : 500;

  if (status >= 500) {
    console.error(JSON.stringify({ event: "request_error", errorType: error.name || "Error" }));
  }

  response.status(status).json({
    error: {
      code: status >= 500 ? "INTERNAL_ERROR" : "INVALID_REQUEST",
      message: status >= 500 ? "An unexpected server error occurred." : "The request could not be processed.",
    },
  });
}
