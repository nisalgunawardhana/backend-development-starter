export const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    data,
  });
};

export const errorResponse = (res, error, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message: error.message,
  });
};