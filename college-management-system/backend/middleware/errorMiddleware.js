const errorHandler = (err, req, res, next) => {
  console.error(err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID supplied.";
  }

  if (err.code === 11000) {
    statusCode = 400;
    message = `${Object.keys(err.keyValue)} already exists.`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorHandler;