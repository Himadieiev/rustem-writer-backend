const notFound = (req, res, next) => {
  const error = new Error(`Не знайдено - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Ресурс не знайдено";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "prodaction" ? null : err.stack,
  });
};

export { notFound, errorHandler };
