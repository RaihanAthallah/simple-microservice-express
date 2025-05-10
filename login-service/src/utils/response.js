function successResponse(message, data = null) {
  return {
    status: "success",
    message: message,
    data: data,
  };
}

function errorResponse(message, data = null) {
  return {
    status: "error",
    message: message,
    data: data,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
