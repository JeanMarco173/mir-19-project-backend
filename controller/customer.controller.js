const asyncHandler = require("../middleware/asyncHandler.middleware.js");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/index.js");
const { validationResult } = require("express-validator");

const { register, findByEmail } = require("../services/customer.service.js");

const signUpCustomer = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { name, surName, email } = req.body;
  const newCustomer = await register({ name, surName, email });
  res.status(201).json({
    message: "El usuario fue registrado con éxito.",
    status: "OK",
    data: {},
  });
});

const provideAccessToken = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { email } = req.body;
  const customer = await findByEmail(email);
  const payload = {
    sub: customer.email,
  };
  const token = jwt.sign(payload, secret);

  res.status(200).json({
    message: "Se creó el token de acceso con éxito.",
    status: "OK",
    data: {
      token,
      customer,
    },
  });
});

module.exports = { signUpCustomer, provideAccessToken };
