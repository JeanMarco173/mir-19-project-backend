const asyncHandler = require("../middleware/asyncHandler.middleware.js");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/index.js");
const { validationResult } = require("express-validator");

const {
  register,
  findByEmail,
  registerAddress,
  findAddressesByCustomer,
} = require("../services/customer.service.js");

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

const addAddress = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { name, coordinates } = req.body;
  const { customerId } = req.params;
  const location = {
    type: "Point",
    coordinates: [coordinates.lat, coordinates.lng],
  };
  const newAddress = await registerAddress(
    {
      name,
      location,
      coordinates,
    },
    customerId
  );
  res.status(201).json({
    message: "Se registró con éxito la dirección.",
    status: "OK",
    data: {},
  });
});

const listAddressByUser = asyncHandler(async (req, res, next) => {
  const { customerId } = req.params;
  const customer = await findAddressesByCustomer(customerId);
  res.status(201).json({
    message: "Se listó con éxito las dirección.",
    status: "OK",
    data: { addresses: customer.addresses },
  });
});

module.exports = {
  signUpCustomer,
  provideAccessToken,
  addAddress,
  listAddressByUser,
};
