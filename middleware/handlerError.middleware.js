const { validationResult } = require("express-validator");

const handlerError = (error, req, res, next) => {
  const validation = validationResult(req);
  if (validation.errors.length) {
    return res.status(403).json({
      message: validation.errors,
      status: "Failed",
      data: {},
    });
  }
  if (error.message === "Unauthorized") {
    return res.status(401).json({
      message: error.message,
      status: "Failed",
      data: {},
    });
  }
  const code = error.code > 200 ? error.code : 503;
  res.status(code).json({
    message:
      error.message || "Error de servidor. Porfavor, vuelva a intentarlo.",
    status: "Failed",
    data: {},
  });
};

module.exports = handlerError;
