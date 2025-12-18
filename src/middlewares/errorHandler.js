const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  const status = err.status || 500;
  const message = err.message || "Internal server error";

  res.status(status).json({
    error: message,
    details: err.details || null,
  });
};

module.exports = errorHandler;
