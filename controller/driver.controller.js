const asyncHandler = require("../middleware/asyncHandler.middleware.js");
const { validationResult } = require("express-validator");

const {
  register,
  findById,
  updatePosition,
} = require("../services/driver.service.js");

const signUpDriver = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { name, surName, email } = req.body;
  const newDriver = await register({ name, surName, email });
  res.status(201).json({
    message: "El conductor fue registrado con éxito.",
    status: "OK",
    data: {},
  });
});

const findDriverById = asyncHandler(async (req, res, next) => {
  const { driverId } = req.params;
  const driver = await findById(driverId);
  res.status(200).json({
    message: "El conductor fue listado con éxito.",
    status: "OK",
    data: driver,
  });
});

const setPosition = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
  }
  const { position } = req.body;
  const { driverId } = req.params;
  const driver = await updatePosition(driverId, {
    type: "Point",
    coordinates: position,
  });
  res.status(201).json({
    message: "Se actualizó con éxito la ubicación del driver.",
    status: "OK",
    data: {},
  });
});

module.exports = { signUpDriver, findDriverById, setPosition };
