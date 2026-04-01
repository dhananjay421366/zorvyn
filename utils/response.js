export const successResponse = (res, message, data = {}) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

export const errorResponse = (res, message, code = 500) => {
  return res.status(code).json({
    status: "error",
    message,
  });
};